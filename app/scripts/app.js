'use strict';

/**
 * @ngdoc overview
 * @name messageCraftApp
 * @description
 * # messageCraftApp
 *
 * Main module of the application.
 */
angular
  .module('messageCraftApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ui.router',
	'ui.router.state.events',
	'ui.bootstrap',
	'angular-bind-html-compile'
  ])
	
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
	.state('app', {
		url:'',
		views: {
			'header': {
				templateUrl : 'views/header.html'
			},
			'content': {
				templateUrl : 'views/main.html',
				controller  : 'MainCtrl',
				controllerAs: 'main'
			}
		}
	})
	
	.state('app.timeline', {
		url: 'timeline',
		views: {
			'content@': {
				templateUrl: 'views/timeline.html',
				controller: 'TimelineCtrl',
				controllerAs: 'timeline'
			},
			'footer@': {
				templateUrl : 'views/footer.html',
				controller  : 'FooterCtrl',
				controllerAs: 'footer'
				
			}
		}
	})
	
	.state('app.notifications', {
		url: 'notifications',
		views: {
			'content@': {
				templateUrl: 'views/notifications.html',
				controller: 'NotificationsCtrl',
				controllerAs: 'notifications'
			},
			'footer@': {
				templateUrl : 'views/footer.html',
				controller  : 'FooterCtrl',
				controllerAs: 'footer'
				
			}
		}
	})
	
	.state('app.messages', {
		url: 'messages',
		views: {
			'content@': {
				templateUrl: 'views/messages.html',
				controller: 'MessagesCtrl',
				controllerAs: 'messages'
			},
			'footer@': {
				templateUrl : 'views/footer.html',
				controller  : 'FooterCtrl',
				controllerAs: 'footer'
				
			}
		}
	})
	
	.state('app.profile', {
		url: 'profile',
		views: {
			'content@': {
				templateUrl: 'views/profile.html',
				controller: 'ProfileCtrl',
				controllerAs: 'profile'
			},
			'footer@': {
				templateUrl : 'views/footer.html',
				controller  : 'FooterCtrl',
				controllerAs: 'footer'
				
			}
		}
	})
	
	
	
	;
	$urlRouterProvider.otherwise('timeline');
	
	// Use the HTML 5 History API
	//$locationProvider.html5Mode(true);

  })

.constant('_', window._)

.run(['$rootScope', '$state', '$document', function($rootScope, $state, $document, $scope) {
	$rootScope.name = "";
	$rootScope._ = window._;
	$rootScope.score = 0;
	$rootScope.currentState = {};
	$rootScope.currentState.name = "app";
	
	if($rootScope.name == ""){
		$state.go('app');
	}
	
	
	$rootScope.$on("$stateChangeSuccess", function(event, toState) {
    	$rootScope.currentState = toState;
		//console.log($rootScope.currentState);
  	});
	
	
	

}])
;
