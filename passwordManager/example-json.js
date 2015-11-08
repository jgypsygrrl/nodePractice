// var person = {
//   name: 'Andrew',
//   age: 24
// };
// // //turns the object into a string
// var personJSON = JSON.stringify(person);
// console.log(personJSON);
// console.log(typeof personJSON);

// // //turn it back into an object
// var personObject = JSON.parse(personJSON);

// console.log(personObject.name);
// console.log(typeof personObject);

console.log('CHALLENGE AREA');

var animal = '{"name": "Spockster"}';

//convert animal into an object
var animalObject = JSON.parse(animal);

//add age property to the object
animalObject.age = 3;
console.log(animalObject);
console.log(typeof animalObject);

//convert it back to JSON & print 
animal = JSON.stringify(animalObject);

console.log(animal);
console.log(typeof animal);