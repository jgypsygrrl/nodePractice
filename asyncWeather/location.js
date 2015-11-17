var request = require('request');
var url = 'http://ipinfo.io';

module.exports = function(callback) {
  request({
    url: url,
    json: true
      //callback function has the 3 variables below)
  }, function(error, response, body) {
    if (error) {
      callback();
    } else {
      callback(body);
    }
  });
};