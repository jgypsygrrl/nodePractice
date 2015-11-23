var request = require('request');
var url = 'http://ipinfo.io';

module.exports = function() {
  return new Promise(function(resolve, reject) {
    request({
      url: url,
      json: true
        //callback function has the 3 variables below)
    }, function(error, response, body) {
      if (error) {
        reject('Unable to guess location');
      } else {
        resolve(body);
      }
    });
  })
};