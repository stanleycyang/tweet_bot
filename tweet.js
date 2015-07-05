function dateString(){
    var date = new Date(Date.now()- 5*60*60*1000);
    return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getDate();
}

// Bring in the robot
var Bot = require("./robot/robot");


// Initialize new TweetBot!
var TweetBot = new Bot();

// Prune followers
/*TweetBot.prune(function(error, response){*/
    //if(error){
        //return handleError(error);
    //}
/*});*/

var params = {
    q: 'technology',
    since: dateString(),
    result_type: 'mixed'
};



// Every 40 seconds, execute this code
// setInterval(function(){

    //Tweet from the Bot
    TweetBot.search(params);


// }, 43200000);

