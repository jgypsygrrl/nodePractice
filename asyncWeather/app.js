var weather = require('./weather.js');
var location = require('./location.js');

// setup yargs to have a --location or -l arguments so user can specify location
var argv = require('yargs')
  .option('location', {
    alias: 'l',
    demand: false,
    describe: 'Location to fetch weather for',
    type: 'string'
  })
  .help('help')
  .argv;

if (typeof argv.l === 'string' && argv.l.length > 0) {
  console.log('Location was provided');
  weather(argv.l, function(currentWeather) {
    console.log(currentWeather);
  });
} else {
  console.log('Location was not provided');
  //guess location via IP
  location(function(location) {
    if (location) {
      weather(location.city, function(currentWeather) {
        console.log(currentWeather)
      });
    } else {
      console.log('Unable to guess location')
    }
  })
}