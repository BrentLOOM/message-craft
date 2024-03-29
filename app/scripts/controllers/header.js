'use strict';

/**
 * @ngdoc function
 * @name messageCraftApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the messageCraftApp
 */
angular.module('messageCraftApp')
  .controller('HeaderCtrl', function ($rootScope, $scope, messageCraftService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	  
	$scope.nameIsSet = false;
	$scope.$on('nameIsSet', function(){
		$scope.nameIsSet = true;
		$scope.name = $rootScope.name;
		messageCraftService.player.name = $scope.name;
		console.log("Name is set to: ", $scope.name);
	});
  });
