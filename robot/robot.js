// Source in configuration
var T = require('./config');

// Function constructor for Bot
var Bot = function(){
    this.twit = T;
};

// Post a tweet
Bot.prototype.tweet = function(tweet, callback){

    // Run the checks
    if(typeof tweet !== 'string'){
        // Throw error
        return callback(new Error('Tweet must be a string'));
    }else if(tweet.length > 140){
        // Throw error
        return callback(new Error('Tweet is too long'));
    }

    // Post the tweet
    this.twit.post('statuses/update', {status: tweet}, callback);
};


// Follower information
Bot.prototype.followers = function(){

    this.twit.get('followers/ids', function(error, response) {
        if(error){
            return handleError(error);
        }

        // Respond with followers
        console.log(response);
        return response;
        //console.log('\n# followers:' + response.ids.length.toString());
    });
};

// Prune friend list
Bot.prototype.prune = function(callback){
    var self = this;

    this.twit.get('followers/ids', function(error, response){
        if(error){
            return callback(error);
        }

        // Grab the array of followers' ids
        var followers = response.ids;


        // Grabs friends
        self.twit.get('friends/ids', function(error, response){
            if(error){
                return callback(error);
            }

            // Grab array of friends
            var friends = response.ids;

            // Loop through friends to see if they are followers

            friends.forEach(function(element, index, array){
                if(followers.indexOf(element)=== -1){
                    self.twit.post('friendships/destroy', {id: element}, callback);
                    console.log('pruned user ' + element);
                }
            });


        });
    });
};

// Search

Bot.prototype.search = function(params){
    var self = this;
    self.twit.get('search/tweets', params, function(error, response){
       if(error){
           return handleError(error);
       } 
       var tweets = response.statuses,
           numberOfTweets = tweets.length,
           popular = '',
           max = 0;

/*       console.log(tweets[0].retweet_count);*/
       /*console.log(tweets[0].favorite_count);*/

       // Count down to no tweets
       while(numberOfTweets--){
            var tweet = tweets[numberOfTweets],
                popularity = tweet.favorite_count;

            if(popularity > max){
                max = popularity;
                popular = tweet.text;
            }

       }

       // Tweet out the popular tweet
       // TweetBot.tweet(popular, function(error, response){
       //      if(error){
       //          return handleError(error);
       //      }
       //      console.log(response);
       // });
    	console.log(popular);
    });
};

module.exports = Bot;