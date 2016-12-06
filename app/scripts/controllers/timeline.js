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
	
	$scope.responses = [
		{
			text: 'I am here to say that %s is to blame for the terrible tragedy in %s.',
			choices: [
				'Mexicans',
				'America'
			]
		},
		{
			text: 'Go %s yourself, %s!',
			choices: [
				'fuck',
				'America'
			]
		}
	];
	
	$scope.blank = [];
	
	$scope.responseFormHtml = "";
	
	$scope.parseResponse = function(response) {
		var tempString = response.text;
		var htmlString = "";
		var choicesHtmlStart = "";
		
		var start = 0;
		var count = 0;
		
		while(tempString.indexOf("%s") !== -1){
			
			
			choicesHtmlStart = '<select compile ng-model=\"blank[' + count.toString() + ']\" class=\"form-control\">';
			
			for(var i = 0; i < response.choices.length; i++){
				var choiceIndex = i+1;
				choicesHtmlStart = choicesHtmlStart.concat("<option value=\"" + choiceIndex.toString() + "\">" + response.choices[i] + "</option>");
			}
		
			choicesHtmlStart = choicesHtmlStart.concat('</select>');
			
			htmlString = htmlString.concat(tempString.substring(start, tempString.indexOf("%s") - 1));
			
			start = tempString.indexOf("%s");
			tempString = tempString.replace(/%s/, " " + choicesHtmlStart + " ");

			$scope.blank[count] = "";
			count++;
			
		}
		
		htmlString = htmlString.concat(tempString.substring(start, tempString.length));
		console.log(htmlString);

		
		
		
		
		
		$scope.responseFormHtml = $sce.trustAsHtml(htmlString);
		
		
	};
	
	$scope.parseResponse($scope.responses[0]);	
	
	$scope.submit = function() {
		console.log($scope.blank);
	};
	
	$scope.conLog = function(t){
		console.log(t);
	};
	
  })

.directive('compile',function($compile, $timeout){
    return{
        restrict:'A',
		//transclude: true,
        link: function(scope,elem){
            $timeout(function(){                
                $compile(elem.contents())(scope);    
            });
        }        
    };
});
