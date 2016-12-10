'use strict';

/**
 * @ngdoc service
 * @name messageCraftApp.messageCraftService
 * @description
 * # messageCraftService
 * Service in the messageCraftApp.
 */
angular.module('messageCraftApp')
  .service('messageCraftService', function ($rootScope, $window, dataService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	this.player = {
		name: '',
		points: 0,
		messages: []
	};

	this.audience = 1000000;

	this.npc = dataService.npc();

	this.words = dataService.words();



	this.activeMsg = null;


	/* this is for dev purposes only, the first event should appear on some
	 sort of user input */

	// this.activateEvent(1);
	// var choices = [1,2];
	// setTimeout(function(){
	// 	self.processMessage(choices);
	// },5000);

	/* End Dev */
	
	this.getMsg = function(index){
		//var choices = [];
		var temp = {};
		
		return dataService.msg(index).then(function(response) {
			console.log(response);
			temp.choices = [];
			temp.event = response.event;
			temp.text = response.text;
			
			console.log(temp);
		
			
			for (var i = 0; i < response.choices[0].length; i++) {
				temp.choices.push(response.choices[0][i].text);
			}
			 
			console.log({
				"event": temp.event,
				"text": temp.text,
				"choices": temp.choices
			});
			
			return temp;
		});
		
	};
	
	this.processMessage = function(choices){
		/*

		To be called when the form has been completed
		the parameters should be an array of numbers 
		the player has chosen as shown
		in the sample.json file

		*/
		
		//Refactor
		var posts = this.ps.process({
			message: this.activeMsg,
			player: this.player,
			choices: choices,
			sources: this.npcs,
			audience: this.audience
		});

		return posts;
	};
	
	this.activateEvent = function(index){
		
		
		var msg = dataService.msg(index);
		this.activeMsg = msg;
		this.displayMessage(msg);
	};
	
	
  });
