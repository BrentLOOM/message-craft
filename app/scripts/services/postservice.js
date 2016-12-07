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
			senderName: 'Bloop Blop',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'This is my first post!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Bob Dylan',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'MessageCraft is cool!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Bloop Blop',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'This is my first post!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Bob Dylan',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'MessageCraft is cool!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Bloop Blop',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'This is my first post!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Bob Dylan',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'MessageCraft is cool!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Bloop Blop',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'This is my first post!',
			timestamp: '01/01/1999 00:00:00'
		},
		{
			senderName: 'Bob Dylan',
			senderPicPath: 'http://lorempixel.com/200/200/',
			content: 'MessageCraft is cool!',
			timestamp: '01/01/1999 00:00:00'
		}
	];
	
	this.getPosts = function(){
		return this.posts;	
	};

	
	
	
  });
