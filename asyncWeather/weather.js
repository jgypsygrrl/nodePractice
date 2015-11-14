var request = require('request');
var url = 'http://api.openweathermap.org/data/2.5/weather?q=NewYork&units=imperial&appid=2de143494c0b295cca9337e1e96b00e0';

module.exports = function(callback) {
  callback('Here is the current weather:');

  request({
    url: url,
    json: true
  }, function(error, response, body) {
    if (error) {
      callback('Unable to fetch weather.');
    } else {
      // console.log(JSON.stringify(body, null, 4));
      //It's 49.78 degrees in New York city
      callback('It\s ' + body.main.temp + ' degrees in ' + body.name + '!');

    }
  });
}