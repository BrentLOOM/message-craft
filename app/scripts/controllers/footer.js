'use strict';

/**
 * @ngdoc function
 * @name messageCraftApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the messageCraftApp
 */
angular.module('messageCraftApp')
  .controller('FooterCtrl', function ($state, $rootScope, $scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	$scope.isActive = function(arg) {
		return arg === $rootScope.currentState.name;
	};
	  
  });
