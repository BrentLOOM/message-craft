'use strict';

/**
 * @ngdoc function
 * @name messageCraftApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the messageCraftApp
 */
angular.module('messageCraftApp')
  .controller('TimelineCtrl', function ($rootScope, $scope, $sce, postService, responseService, $timeout, messageCraftService) {
	$scope.event = false;
	$scope.currentResponse = null;
	$scope.activeMsg = null;
	$scope.playerChoices = [];
	$scope.responseFormHtml = "";
	
	$scope.posts = postService.getPosts();
	// $scope.currentResponse = responseService.getCurrentResponse();
	messageCraftService.getMsg(1);
	
	$timeout(function(){
		$rootScope.$broadcast('eventEvent');
	}, 2000);
	
    
	
	
	$scope.$on('eventEvent', function() {
		
		//messageCraftService.getMsg(1);
		$scope.activeMsg = messageCraftService.activeMsg;
			
		if(confirm($scope.activeMsg.event)){
			$scope.event = true;
		}
		//alert(response.event);
		$scope.responseFormHtml = $scope.parseResponse($scope.activeMsg);
		//$('div[bind-html-compile=responseFormHtml]').html(htmlString);
		
		
	});
	
	
	
	
	$scope.parseResponse = function(message) {
		var tempString = message.text;
		var htmlString = "";
		var choicesHtmlStart = "";
		
		var start = 0;
		var count = 0;
		
		while(tempString.indexOf("%s") !== -1){
			
			
			choicesHtmlStart = '<select compile ng-model=\"playerChoices[' + count.toString() + ']\" class=\"form-control\">';
			
			for(var i = 0; i < message.options.length; i++){
				choicesHtmlStart = choicesHtmlStart.concat("<option value=\"" + (i) + "\">" + message.options[i] + "</option>");
			}
		
			choicesHtmlStart = choicesHtmlStart.concat('</select>');
			
			htmlString = htmlString.concat(tempString.substring(start, tempString.indexOf("%s") - 1));
			
			start = tempString.indexOf("%s");
			tempString = tempString.replace(/%s/, " " + choicesHtmlStart + " ");

			$scope.playerChoices[count] = "0";
			count++;
			
		}
		
		htmlString = htmlString.concat(tempString.substring(start, tempString.length));
		htmlString = '<p>' + htmlString + '</p>';
		// console.log(htmlString);

		return htmlString;
	};
	
	
	
	$scope.submit = function() {
		$scope.event = false;

		
		var temp = $scope.activeMsg.text;
		var choices = [];
		
		for(var i = 0; i < $scope.playerChoices.length; i++){
			//start hack
				choices.push(parseInt($('select[ng-model="playerChoices['+i+']"]').val()) + 1);
			// end hack
			// console.log($scope.currentResponse.choices[i]);
			temp = temp.replace(/%s/, " " + $scope.activeMsg.options[choices[i]-1] + " ");
		}
		var posts = {};
		
		console.log("Choices in Submit: ", choices);
		
		posts = messageCraftService.processMessage(choices);
		
		
		console.log("Posts from ProcessMessage: ", posts);

		$rootScope.score = messageCraftService.player.points;

		var tempPost = {
			senderName: $rootScope.name,
			senderPicPath: 'http://lorempixel.com/207/207/',
			content: temp,
			timestamp: '01/01/1999 00:00:00'
		};

		console.log("Posts before initial splice: ", $scope.posts);

		$scope.posts.splice(0,0, tempPost);



		var addPost = function(index){
			return function(){
				$scope.posts.splice(0,0, posts[index]);
			};
		};

		console.log("Posts: ", posts);
		for (var s = 0; i < posts.length; s++) {
			$timeout(addPost(i), ( (s+1)*5000 ) );
		}

		console.log("$scope.posts after addPost loop: ", $scope.posts);

		
		

		
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
