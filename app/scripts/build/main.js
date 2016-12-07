var messagecraft = {
	ps: require('./processScore.js'),
	load: require('./loader.js'),
	
	init: function(){
		var self = this;
		this.player = {
			name: '@brizandrew',
			points: 0,
			messages: []
		};
		this.audience = 1000000;

		this.load.npc(function(response){
			self.npcs = JSON.parse(response);
			
			// hide loading screen and display game here
		});

		this.acitveMsg = null;


		/* this is for dev purposes only, the first event should appear on some
		 sort of user input */
		this.activateEvent(1);
		var choices = [1,2];
		setTimeout(function(){
			self.processMessage(choices);
		},5000);
		/* End Dev */
	},

	displayMessage: function(msg){
		/* 

		For Brent to fill in...
		algorithmically generate the form here using the msg
		parameter as the data object

		*/

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

		// display the posts on the page somehow or return this to another function
		console.log(posts);

		// display points found in this object under the property "points"
		console.log(this.player);
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