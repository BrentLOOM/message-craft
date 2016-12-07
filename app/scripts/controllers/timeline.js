'use strict';

/**
 * @ngdoc function
 * @name messageCraftApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the messageCraftApp
 */
angular.module('messageCraftApp')
  .controller('TimelineCtrl', function ($rootScope, $scope, $sce, postService, responseService) {
	$scope.event = true;
	$scope.blank = [];
	$scope.responseFormHtml = "";
	
	$scope.posts = postService.getPosts();
	$scope.currentResponse = responseService.getCurrentResponse();
	
    
	
	
	$scope.$on('eventEvent', function() {
		$scope.event = true;
	});
	
	
	$scope.parseResponse = function(response) {
		var tempString = response.text;
		var htmlString = "";
		var choicesHtmlStart = "";
		
		var start = 0;
		var count = 0;
		
		while(tempString.indexOf("%s") !== -1){
			
			
			choicesHtmlStart = '<select compile ng-model=\"blank[' + count.toString() + ']\" class=\"form-control\">';
			
			for(var i = 0; i < response.choices.length; i++){
				var choiceIndex = i;
				choicesHtmlStart = choicesHtmlStart.concat("<option value=\"" + choiceIndex.toString() + "\">" + response.choices[i] + "</option>");
			}
		
			choicesHtmlStart = choicesHtmlStart.concat('</select>');
			
			htmlString = htmlString.concat(tempString.substring(start, tempString.indexOf("%s") - 1));
			
			start = tempString.indexOf("%s");
			tempString = tempString.replace(/%s/, " " + choicesHtmlStart + " ");

			$scope.blank[count] = "0";
			count++;
			
		}
		
		htmlString = htmlString.concat(tempString.substring(start, tempString.length));
		//console.log(htmlString);

		
		
		
		
		
		$scope.responseFormHtml = $sce.trustAsHtml(htmlString);
		
		
	};
	
	$scope.parseResponse($scope.currentResponse);	
	
	$scope.submit = function() {
		console.log($scope.blank);
		$scope.event = false;
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
