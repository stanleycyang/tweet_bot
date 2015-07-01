// Source in the configuration
var T = require('./config.js');

T.post('statuses/update', {status: 'hello Jamel'}, function(err, data, response){
    console.log(data);
});
