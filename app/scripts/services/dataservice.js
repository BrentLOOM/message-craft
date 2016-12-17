'use strict';

/**
 * @ngdoc service
 * @name messageCraftApp.dataService
 * @description
 * # dataService
 * Service in the messageCraftApp.
 */
angular.module('messageCraftApp')
  .service('dataService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	this.npc = function() {
		return $http.get('scripts/loadNPCs.php')
			.then(function(response) {
				return response.data;
			});
	};
	
	this.words = function() {
		return $http.get('scripts/loadWords.php')
			.then(function(response) {
				return response.data;
			});
	};
	
	this.msg = function(id) {
		return $http.get('scripts/loadMsg.php?id=' + id)
			.then(function(response) {
				return {
					options: response.data.choices,
					event: response.data.event,
					text: response.data.text
				};
			
			});
	};

	
	
  });
