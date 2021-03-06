console.log('starting password manager');

var crypto = require('crypto-js');
var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
  .command('create', 'Creates a new account', function(yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Account name(eg: Twitter, Facebook)',
        type: 'string'
      },
      username: {
        demand: true,
        alias: 'u',
        description: 'Enter your account username or email',
        type: 'string'
      },
      password: {
        demand: true,
        alias: 'p',
        description: 'Enter your password here',
        type: 'string'
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        description: 'Master password',
        type: 'string'
      }
    }).help('help');
  })
  .command('get', 'Get an existing account', function(yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Enter the name you want to find here',
        type: 'string'
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        description: 'Master password',
        type: 'string'
      }
    }).help('help');
  })
  .help('help')
  .argv;

var command = argv._[0];

function getAccounts(masterPassword) {
  //getItemSync to fetch accounts
  //create open array for accounts
  var encryptedAccount = storage.getItemSync('accounts');
  var accounts = [];

  //if encryptedAccount is not undefined, decrypt
  if (typeof encryptedAccount !== 'undefined') {
    var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
    accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
  }
  //return accounts array
  return accounts;
}

function saveAccounts(accounts, masterPassword) {
  //encrypt accounts
  var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);

  //setItemSync to save encrypted accounts
  storage.setItemSync('accounts', encryptedAccounts.toString());

  //return accounts array
  return accounts;

}


function createAccount(account, masterPassword) {
  var accounts = getAccounts(masterPassword);

  accounts.push(account);
  saveAccounts(accounts, masterPassword);

  return account;

}

function getAccount(accountName, masterPassword) {
  var accounts = getAccounts(masterPassword);
  var matchedAccount;

  accounts.forEach(function(account) {
    if (account.name === accountName) {
      matchedAccount = account;
    }
  });

  return matchedAccount;
}

//

if (command === 'create') {
  try {
    var createdAccount = createAccount({
      name: argv.name,
      username: argv.username,
      password: argv.password
    }, argv.masterPassword);
    console.log('Account created!');
    console.log(createdAccount);
  } catch (e) {
    console.log('Unable to create an account.')
  }
} else if (command === 'get') {
  try {
    var fetchedAccount = getAccount(argv.name, argv.masterPassword);

    if (typeof fetchedAccount === 'undefined') {
      console.log('Account not found');
    } else {
      console.log('Account found!');
      console.log(fetchedAccount);
    }
  } catch (e) {
    console.log('Unable to fetch account.');
  }
}