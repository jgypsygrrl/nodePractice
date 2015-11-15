var request = require('request');
var url = 'http://ipinfo.io';

//use module exports to create function
//  make request to url for json 
//  if error, callback()
//  else callback(body)

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