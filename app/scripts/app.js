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
	'ui.bootstrap',
	'angular-bind-html-compile'
  ])
	
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
	.state('app', {
		url:'/',
		views: {
			'header': {
				templateUrl : 'views/header.html'
			},
			'content': {
				templateUrl : 'views/timeline.html',
				controller  : 'TimelineCtrl',
				controllerAs: 'timeline'
			},
			'footer': {
				templateUrl : 'views/footer.html',
				controller  : 'FooterCtrl',
				controllerAs: 'footer'
				
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
			}
		}
	})
	
	
	
	;
	$urlRouterProvider.otherwise('timeline');
	
	// Use the HTML 5 History API
	//$locationProvider.html5Mode(true);

  })

.constant('_', window._)

.run(['$rootScope', '$state', function($rootScope, $state) {
	$rootScope.thing = $state.current;
	$rootScope._ = window._;

}])
;
