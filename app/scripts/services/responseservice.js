'use strict';

/**
 * @ngdoc service
 * @name messageCraftApp.responseService
 * @description
 * # responseService
 * Service in the messageCraftApp.
 */
angular.module('messageCraftApp')
  .service('responseService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	this.pullResponses = function() {
		$http.get().then(function() {
			
		});
	};
	
	this.currentResponse = {
		"event": "Something has happened!",
		"text": "I am here to say that %s is to blame for the terrible tragedy in %s.",
		"choices": [
			"Mexicans",
			"America"
		]
	};
	
	this.getCurrentResponse = function() {
		return this.currentResponse;	
	};
	
	
  });
