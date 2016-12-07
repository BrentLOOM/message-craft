window.messagecraft = {
	ps: require('./processScore.js'),
	load: require('./loader.js'),
	
	init: function(){
		var self = this;
		this.player = {
			name: '',
			points: 0,
			messages: []
		};
		this.audience = 1000000;

		this.load.npc(function(response){
			self.npcs = JSON.parse(response);
			
			// hide loading screen and display game here
		});

		this.load.words(function(response){
			self.words = JSON.parse(response);
		});

		this.acitveMsg = null;


		/* this is for dev purposes only, the first event should appear on some
		 sort of user input */

		// this.activateEvent(1);
		// var choices = [1,2];
		// setTimeout(function(){
		// 	self.processMessage(choices);
		// },5000);

		/* End Dev */
	},

	getMsg: function(index, callback){
		var self = this;
		this.load.msg(index,function(response){
			self.acitveMsg = JSON.parse(response);
			var choices = [];
			for (var i = 0; i < self.acitveMsg.choices[0].length; i++) {
				choices.push(self.acitveMsg.choices[0][i].text);
			}

			callback({
				"event": self.acitveMsg.event,
				"text": self.acitveMsg.text,
				"choices": choices
			});
		});
	},

	processMessage: function(choices){
		/*

		To be called when the form has been completed
		the parameters should be an array of numbers 
		the player has chosen as shown
		in the sample.json file

		*/

		var posts = this.ps.process({
			message: this.acitveMsg,
			player: this.player,
			choices: choices,
			sources: this.npcs,
			audience: this.audience
		});

		return posts;
	},

	activateEvent: function(index){
		var self = this;
		self.load.msg(index, function(response){
			var msg = JSON.parse(response);
			self.acitveMsg = msg;
			self.displayMessage(msg);
		});
	}

};
messagecraft.init();