// Source in the configuration
var T = require('./config.js');

T.post('statuses/update', {status: 'hello world'}, function(err, data, response){
    console.log(data);
});
