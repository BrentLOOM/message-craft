'use strict';

/**
 * @ngdoc function
 * @name messageCraftApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the messageCraftApp
 */
angular.module('messageCraftApp')
  .controller('MainCtrl', function ($rootScope, $scope, $state) {
    $rootScope.name = "";
	$scope.name = "";
	
	//angular.element(document.querySelector('#myModalNorm')).modal('show');

  	$scope.submit = function() {
		$rootScope.name = $scope.name;
		console.log($rootScope.name);
		$rootScope.$broadcast('nameIsSet');
		//angular.element(document.querySelector('#myModalNorm')).modal('dismiss');
		$state.go('app.timeline');
	};
	

	
	
  });
