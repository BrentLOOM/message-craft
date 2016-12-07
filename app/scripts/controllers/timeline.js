'use strict';

/**
 * @ngdoc function
 * @name messageCraftApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the messageCraftApp
 */
angular.module('messageCraftApp')
  .controller('TimelineCtrl', function ($rootScope, $scope, $sce, postService, responseService, $timeout) {
	$scope.event = false;
	$scope.choices = [];
	$scope.responseFormHtml = "";
	
	$scope.posts = postService.getPosts();
	// $scope.currentResponse = responseService.getCurrentResponse();
	
	$timeout(function(){
		$rootScope.$broadcast('eventEvent');
	}, 2000);
	
    
	
	
	$scope.$on('eventEvent', function() {
		messagecraft.getMsg(1, function(response){
			$scope.currentResponse = response;
			if(confirm("Something has happened in the world! Will you respond?")){
				$scope.event = true;
			}
			$scope.parseResponse($scope.currentResponse);	
		});
	});
	
	
	
	
	$scope.parseResponse = function(response) {
		var tempString = response.text;
		var htmlString = "";
		var choicesHtmlStart = "";
		
		var start = 0;
		var count = 0;
		
		while(tempString.indexOf("%s") !== -1){
			
			
			choicesHtmlStart = '<select compile ng-model=\"choices[' + count.toString() + ']\" class=\"form-control\">';
			
			for(var i = 0; i < response.choices.length; i++){
				choicesHtmlStart = choicesHtmlStart.concat("<option value=\"" + (i+1) + "\">" + response.choices[i] + "</option>");
			}
		
			choicesHtmlStart = choicesHtmlStart.concat('</select>');
			
			htmlString = htmlString.concat(tempString.substring(start, tempString.indexOf("%s") - 1));
			
			start = tempString.indexOf("%s");
			tempString = tempString.replace(/%s/, " " + choicesHtmlStart + " ");

			$scope.choices[count] = "0";
			count++;
			
		}
		
		htmlString = htmlString.concat(tempString.substring(start, tempString.length));
		console.log(htmlString);

		
		
		
		
		
		$scope.responseFormHtml = $sce.trustAsHtml(htmlString);
		
		
	};
	
	
	
	$scope.submit = function() {
		console.log($scope.choices);
		$scope.event = false;
		
		var temp = $scope.currentResponse.text;
		
		for(var i = 0; i < $scope.currentResponse.choices.length; i++){
			console.log($scope.currentResponse.choices[i]);
			temp = temp.replace(/%s/, " " + $scope.currentResponse.choices[parseInt($scope.choices[i])] + " ");
		}
		
		var tempPost = {
			senderName: $rootScope.name,
			senderPicPath: 'http://lorempixel.com/207/207/',
			content: temp,
			timestamp: '01/01/1999 00:00:00'
		};
		
		$scope.posts.splice(0,0, tempPost);
		
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
