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
		$http.get('scripts/loadNPCs.php').then(function(response) {
			return response.data;
		});
	};
	
	this.words = function() {
		$http.get('scripts/loadWords.php').then(function(response) {
			return response.data;
		});
	};
	
	this.msg = function(id) {

		var promise = $http.get('scripts/loadMsg.php?id=' + id).then(function(response) {
			return response.data;
			
		});
		
		console.log(promise);
		return promise;

	};

	
	
  });
