'use strict';

/**
 * @ngdoc function
 * @name messageCraftApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the messageCraftApp
 */
angular.module('messageCraftApp')
  .controller('TimelineCtrl', function ($rootScope, $scope, $sce) {
	
    this.posts = [
		{
			senderName: 'Bloop Blop',
			senderPicPath: 'images/thumbnail.jpg',
			content: 'This is my first post!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Bob Dylan',
			senderPicPath: 'images/thumbnail.jpg',
			content: 'MessageCraft is cool!',
			timestamp: '01/01/1999 00:00:00'
		}
	];
	
	$scope.response = {
		text: 'I am here to say that %s is to blame for the terrible tragedy in %s.',
		choices: [
			'Mexicans',
			'America'
		]
	};
	
	
	$scope.responseFormHtml = "";
	
	$scope.parseResponse = function(response) {
		var htmlString = response.text;
		
		var choicesHtmlStart = '<select class=\"form-control\"><option value=\"\"</option>';
		for(var i = 0; i < response.choices.length; i++){
			var choiceIndex = i+1;
			choicesHtmlStart = choicesHtmlStart.concat("<option value=\"" + choiceIndex.toString() + "\">" + response.choices[i] + "</option>");
		}
		
		choicesHtmlStart = choicesHtmlStart.concat('</select>');
		
		$scope.responseFormHtml = $sce.trustAsHtml(htmlString.replace(/%s/g, choicesHtmlStart));
		
	};
	
	$scope.parseResponse($scope.response);	
	
	$scope.submit = function() {
		
	};
  });
