'use strict';

/**
 * @ngdoc service
 * @name messageCraftApp.postService
 * @description
 * # postService
 * Service in the messageCraftApp.
 */
angular.module('messageCraftApp')
  .service('postService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
	
	this.posts = [
		{
			senderName: 'Paul Itical',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'Welcome to MessageCraft!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Ronald K. Drumpf',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'Where you will try to get as much free media as you possibly can!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Elyk Ykcinuhob',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'Things will happen!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Paul Itical',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'And how you respond is sure to get the attention of others.',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Bloop Blop',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'Don\'t screw it up!',
			timestamp: '01/01/1999 00:00:00'
		}
	];
	
	this.getPosts = function(){
		return this.posts;	
	};

	
	
	
  });
