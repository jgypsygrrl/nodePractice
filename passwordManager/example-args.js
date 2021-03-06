var argv = require('yargs')
  .command('hello', 'Greets the user', function(yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Enter your first name here',
        type: 'string'
      },
      lastname: {
        demand: true,
        alias: 'l',
        description: 'Enter your last name here'
      }
    }).help('help');
  })
  .help('help')
  .argv;
var command = argv._[0];

console.log(argv);

if (command === 'hello' && typeof argv.name !== 'undefined' && typeof argv.lastname !== 'undefined') {
  console.log('Hello ' + argv.name + ' ' + argv.lastname + '!');
} else if (command === 'hello' && typeof argv.name !== 'undefined') {
  console.log('Hello ' + argv.name + '!');
} else if (command === 'hello') {
  console.log('Hello world!');
}