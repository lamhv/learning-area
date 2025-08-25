const myObject = {
    city: "Madrid",
    greet() {
      console.log(`Greetings from ${this.city}`);
    },
  };
  
myObject.greet(); // Greetings from Madrid
console.log(myObject.prototype);
console.log(Object.getPrototypeOf(myObject)); // Object { }


// the prototype chain
const myDate = new Date();
let object = myDate;

do {
  object = Object.getPrototypeOf(object);
  console.log(object);
} while (object);

// shadowing properties
const myDate1 = new Date(1995, 11, 17);

console.log(myDate1.getYear()); // 95

myDate1.getYear = function () {
  console.log("something else!");
};

myDate1.getYear(); // 'something else!'

// setting a prototype
//// Object.create
const personPrototype = {
  greet() {
    console.log("hello!");
  },
};

const carl = Object.create(personPrototype);
carl.greet(); // hello! 
console.log(Object.getPrototypeOf(carl)) // personPrototype

//// Using a constructor
// all functions have a prototype name "prototype"
const personPrototype1 = {
  greet() {
    console.log(`hello, my name is ${this.name}!`);
  },
};

function Person(name) {
  this.name = name;  // this is an own property.
}

Object.assign(Person.prototype, personPrototype1);
// or
// Person.prototype.greet = personPrototype1.greet;

const reuben = new Person("Reuben");
reuben.greet(); // hello, my name is Reuben!

// own properties
const irma = new Person("Irma");

console.log(Object.hasOwn(irma, "name")); // true
console.log(Object.hasOwn(irma, "greet")); // false
