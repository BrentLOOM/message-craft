'use strict';

/**
 * @ngdoc service
 * @name messageCraftApp.messageCraftService
 * @description
 * # messageCraftService
 * Service in the messageCraftApp.
 */
angular.module('messageCraftApp')
  .service('messageCraftService', function ($rootScope, $window, dataService, processService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	this.player = {
		name: '',
		points: 0,
		messages: []
	};

	this.activeMsg = null;
	
	this.audience = 1000000;
	this.npcs = null;
	this.words = null;
	
	this.getNPCs = function(){
		dataService.npc().then(function(npcData){
			this.npcs = npcData;
		});
	};
	
	this.getWords = function(){
		dataService.words().then(function(wordData){
			this.words = wordData;
		});
	};
	
	
	
	
	



	


	/* this is for dev purposes only, the first event should appear on some
	 sort of user input */

	// this.activateEvent(1);
	// var choices = [1,2];
	// setTimeout(function(){
	// 	self.processMessage(choices);
	// },5000);

	/* End Dev */
	
	
	this.getMsgData = function(index){
		
		dataService.msg(index).then(function(msgData) {
			this.activeMsg = msgData;
			this.activeMsg.options = [];
			
						
			for (var i = 0; i < msgData.options[0].length; i++) {
				// I need to remove .text
				this.activeMsg.options.push(msgData.options[0][i].text);
			}
			console.log("Active Message: ", this.activeMsg);
		});
		
	};
	
	this.getMsg = function(index){
		this.getMsgData(index);
		return this.activeMsg;
	};
	
	this.processMessage = function(choices){
		/*

		To be called when the form has been completed
		the parameters should be an array of numbers 
		the player has chosen as shown
		in the sample.json file

		*/
		
		//Refactor
		var temp = {
			message: this.activeMsg,
			player: this.player,
			audience: this.audience,
			choices: choices
		};
		
		console.log("MESSAGE", temp.message);
		
		temp.sources = this.npcs;

		return processService.process(temp);		



	};
	
	this.activateEvent = function(index){
		console.log(index);
		/*dataService.msg(index).then(function(response){
			console.log("Active Msg response: ", msg);
			this.activeMsg = msg;
			this.displayMessage(msg);
		});*/
		
	};
	
	this.getNPCs();
	this.getWords();
	
	
  });
