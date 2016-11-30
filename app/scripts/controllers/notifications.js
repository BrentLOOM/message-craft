'use strict';

/**
 * @ngdoc function
 * @name messageCraftApp.controller:NotificationsCtrl
 * @description
 * # NotificationsCtrl
 * Controller of the messageCraftApp
 */
angular.module('messageCraftApp')
  .controller('NotificationsCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	this.notificationPosts = [
		{
			senderName: "Bob Dylan",
			senderHandle: "bobdylan88",
			senderPicPath: "images/thumbnail.jpg",
			type: "like",
			time: "00:00:00",
			date: "01/01/1999"
		}
	];
	
	this.checkType = function(type) {
		switch(type) {
			case "like":
				return "liked your post.";
			case "follow":
				return "has followed you!";
			case "unfollow":
				return "has unfollowed you.";
			case "tag":
				return "has tagged you in a post!"
			default:
				return "NO NOTIFICATION TYPE";
		}	
	};
  });
