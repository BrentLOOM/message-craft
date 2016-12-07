module.exports = {
	chance: require('chance').Chance(),
	shuffle: require('knuth-shuffle').knuthShuffle,

	COMPETITORS_COUNT: 5,
	POINTS_PER_VIEW: 0.005, // according to research found here http://www.forbes.com/sites/alexknapp/2013/06/14/how-much-is-a-tweet-really-worth/#4e6957704cd6
	MIN_POSTS_PER_SOURCE: 1,

	process: function(config){
		// calculate audience size and viewer retention rate for the cylce
		this.calculateAudience(config.sources, config.audience);
		this.viewerRetention = this.chance.floating({
			min: 0.6,
			max: 1
		});

		// create player and competitior objects
		var playerObj = {
			"name": config.player.name,
			"choices": config.choices
		};
		var competitors = this.generateCompetitors(config.message, this.COMPETITORS_COUNT);
		competitors.push(playerObj);

		// process the competitiors (adding characteristic and affinity scores)
		this.processCompetitors(config.message, competitors, config.sources);
		
		// generate the posts based on affinity (also adds points to player)
		var posts = this.getPosts(config.message, config.sources, competitors, config.player);

		// return the post
		return posts;
	},

	getPosts: function(message, sources, competitors, player){
		var posts = [];
		var playerPosts = 0;

		// for each source
		for (var s = 0; s < sources.length; s++) {
			var postees = [];

			// generate a random number of posts within a range
			var numOfPosts = this.chance.integer({
				min: this.MIN_POSTS_PER_SOURCE,
				max: message.posts[s].length
			});

			// sort the competitors by this source's affinites to their message
			var sortedCompetitors = competitors.slice(0).sort(this.sortBySourceAffin(s));
			
			// calculate the total affinity to find the weighted average constant
			var totalAffin = 0;
			for (var c = sortedCompetitors.length - 1; c >= 0; c--) {
				totalAffin += sortedCompetitors[c].affinities[s];
			}
			var weightedX = numOfPosts / totalAffin;

			// for each competitior
			for (var sc = sortedCompetitors.length - 1; sc >= 0; sc--) {
				// find how many posts they get based on the weighted average constant
				var numOfCompPosts = Math.round(sortedCompetitors[sc].affinities[s] * weightedX);

				// push the competitor to the list of posts that need to be made about them
				// 		for each post they've earned
				for (var n = numOfCompPosts - 1; n >= 0; n--) {
					// if there's still posts available
					if(postees.length < numOfPosts){
						postees.push(sortedCompetitors[sc]);
					}
				}

				// if no competitor broke out enough to impress the source
				while(postees.length < numOfPosts){
					// start filling in postees from the highest to the smallest
					var nextHighest = sortedCompetitors.length - (postees.length + 1);
					postees.push(sortedCompetitors[nextHighest]);
				}
			}

			// for each competitior who gets a post
			for (var p = postees.length - 1; p >= 0; p--) {
				// if the competitor is the player
				if(postees[p] === competitors[competitors.length-1]){
					this.addPoints(player, sources[s]);
				}
				
				var postText = message.posts[s][p];
				postText = this.processPost(postText, postees[p]);


			
				var post = {
					"senderName": sources[s].name,
					"senderPicPath": sources[s].avatar,
					"content": postText,
					"timestamp": '01/01/1999 00:00:00'
				};
				posts.push(post);
			}
		}
		return this.shuffle(posts);
	},

	generateCompetitors: function(message, count){
		var competitors = [];
		for (var i = count - 1; i >= 0; i--) {
			var competitor = this.newCompetitor(message);
			competitors.push(competitor);
		}

		return competitors;
	},

	processCompetitors: function(message, competitors, sources){
		for (var c = competitors.length - 1; c >= 0; c--) {
			competitors[c].ratings = this.getMsgRating(message, competitors[c].choices);
			competitors[c].affinities = [];
			for (var s = 0; s < sources.length ; s++) {
				var sourceAffin = this.getSourceAffin(competitors[c].ratings, sources[s]);
				competitors[c].affinities.push(sourceAffin);
			}
		}
	},

	getMsgRating: function(message, choices){
		var ratings = this.emptyRatings();
		for (var i = message.choices.length - 1; i >= 0; i--) {
			var playerChoice = choices[i] - 1;
			this.addRatings(ratings, message.choices[i][playerChoice].ratings);
		}
		return ratings;
	},

	getSourceAffin: function(ratings, source){
		var totalAffin = 0;
		for(var view in source.views){
			var srcView = source.views[view];
			totalAffin += ratings[view] * srcView.affin * srcView.view;
		}
		return totalAffin;
	},

	processPost: function(post, competitor){
		// replace names (%n)
		var nameRgx = /(^|[^\\])%n/g;
		if(nameRgx.test(post))
			post = post.replace(nameRgx,'$1'+competitor.name);

		// replace highest characteristic (%c)
		var highCharRgx = /(^|[^\\])%c/g;
		if(highCharRgx.test(post)){
			var highChar = this.getHighestProperty(competitor.ratings);
			post = post.replace(highCharRgx,'$1'+highChar);
		}

		return post;
	},

	addRatings: function(base, addition){
		var characteristic;
		for(characteristic in base){
			base[characteristic] += addition[characteristic];
		}
	},

	addPoints: function(player, source){
		player.points += Math.floor(source.totalViews * this.viewerRetention * this.POINTS_PER_VIEW);
	},

	emptyRatings: function(){
		return {
			conservative: 0,
			liberal: 0,
			educational: 0,
			emotional: 0,
			accuracy: 0,
			nonsense: 0,
			nonnormative: 0,
			conflicting: 0
		};
	},

	newCompetitor: function(message){
		var ran = this.chance;
		var config = {
			nationality: 'en'
		};
		var name = '@' + ran.first(config) + ran.last(config);

		// generate random choices
		var choices = [];
		for (var i = message.choices.length - 1; i >= 0; i--) {
			var choice = ran.integer({
				min: 1,
				max: message.choices[i].length
			});
			choices.push(choice);
		}

		return {
			"name": name,
			"choices": choices
		};
	},

	calculateAudience: function(sources, audience){
		var weightSum = 0;
		for (var i = sources.length - 1; i >= 0; i--) {
			weightSum += sources[i].audience;
		}
		
		var weightVar = audience / weightSum;

		for (var j = sources.length - 1; j >= 0; j--) {
			sources[j].totalViews = Math.round(sources[j].audience * weightVar);
		}
	},

	sortBySourceAffin: function(affinIndex){
		return function(a,b){
			if(a.affinities[affinIndex] > b.affinities[affinIndex])
				return 1;
			if(a.affinities[affinIndex] < b.affinities[affinIndex])
				return -1;
			return 0;
		};
	},

	getHighestProperty: function(obj){
		var output = null;
		for(var prop in obj){
			if(obj[prop] > output)
				output = prop;
		}
		return output;
	}
};