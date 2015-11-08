var crypto = require('crypto-js');

var secretMessage = {
  name: 'Cookies',
  secretName: 'myCookies'
};
var secretKey = '123mycookies';

// Encrypt Message & convert to string
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);

console.log('Encrypted Message: ' + encryptedMessage);


//Decrypt Message
var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);

//turns it back to english & an object
var decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));

//prints the original object
console.log(decryptedMessage);

//prints part of the object
console.log(decryptedMessage.secretName)