// 1. VARIABLES AND PRINTING
createSpace(1, 'VARIABLES AND PRINTING');

var favoriteFood = 'cherry pie';        // Type: string
var numOfSlices = 8;                    // Type: number
var amountConsumed = 0.5;               // Type: number
console.log(favoriteFood);
console.log(numOfSlices);
console.log(amountConsumed);

// Booleans are lowercase
let changeMe = true                     // Type: boolean
// Without assigning a value, it has a value of `undefined`
let undefinedPrice;

// Trying to reassign a const value will result in a 

// -------------------------------------------------------------------------
// 2. MATHEMATICAL OPERATORS
createSpace(2, 'MATHEMATICAL OPERATORS');

let levelUp = 10;
let powerLevel = 9001;
let multiplyMe = 32;
let quarterMe = 1152;

// Using mathematical assignment
levelUp += 5;
powerLevel -= 100;
multiplyMe *= 11;
quarterMe /= 4;

let gainedDollar = 3;
let lostDollar = 50;

// Using the increment and decrement operators
gainedDollar++;
lostDollar--;

// Using the inbuilt floor() and ceil() methods
let decimalValue = 9.95;
console.log(typeof decimalValue);
let decimalValueUp = Math.ceil(decimalValue);
let decimalValueDown = Math.floor(decimalValue);
console.log(`Rounded up: ${decimalValueUp} | Rounded down: ${decimalValueDown}`);

// -------------------------------------------------------------------------
// 3. STRING OPERATIONS
createSpace(3, 'STRING OPERATIONS');

// Using string concatenation
let favoriteAnimal = 'panda';
console.log('My favorite animal: ' + favoriteAnimal);

// Using template literals to interpolate
// NOTE: The template literal is what is wrapped in `...`
let myName = 'Michelle';
let myCity = 'Lagos';
console.log(`My name is ${myName}. My favorite city is ${myCity}.`);

console.log('String versions: ' + 'Chinwe'.toLowerCase() + ' ' + 'Chinwe'.toUpperCase() + ' ' + 'chinwe'.length + ' ');

// -------------------------------------------------------------------------
// 4. RANDOM OPERATORS
createSpace(4, 'RANDOM OPERATORS');

console.log(typeof favoriteFood);
console.log(typeof numOfSlices);

// -------------------------------------------------------------------------
// 5. CONDITIONAL STATEMENTS
createSpace(5, 'CONDITIONAL STATEMENTS');

// Using if-else 
let siblingName = 'Didi';
if (siblingName === 'Didi') {
    console.log('She is the last Ibegbu sibling.');
} else if (siblingName == 'Daby') {
    console.log('They are the middle Ibegbu sibling.');
} else if (siblingName == 'Chinwe') {
    console.log('She is the first Ibegbu subling.')
} else {
    console.log('They are not an Ibegbu sibling.')
}

// Using comparison operators
let fourGreater = 4 > 5
let fourLess = 4 < 5
let fourGreaterOrEqual = 4 >= 5
let fourLessOrEqual = 4 <= 5
let fourEqual = 4 === 5
let fourNotEqual = 4 !== 5

// Using logical operators
let andResult = true && false
let orResult = true || false
let notResult = !true

// NOTE: Truthy means it evaluates to true when checked as a condition
// NOTE: Falsy means it evaluates to true when checked as a condition
if (0 || "" || '' || undefined || NaN) {
    console.log('All these values are Falsy');
}
console.log('Everything else is (supposedly) Truthy');
// NOTE: Short circuit evaluation is something that becomes possible
//       when you combine Truthy/False with logical opertors and assignment
let tool = '';
let writingUtensil = tool || 'pen'
console.log(`The ${writingUtensil} is mightier than the sword.`);

// Using ternary operations >>> condition ? ifTrue : ifFalse
let isCorrect = true;
isCorrect ? console.log('Correct!') : console.log('Incorrect!');

// switch statement
let athleteFinalPosition = 'first place';
switch (athleteFinalPosition) {
  case 'first place':
    console.log('You get the gold medal!');
    break;
  case 'second place':
    console.log('You get the silver medal!');
    break;
  case 'third place':
    console.log('You get the bronze medal!');
    break;
  default:
    console.log('No medal awarded');
    break;
}

// -------------------------------------------------------------------------
// 6. FUNCTIONS
createSpace(6, 'FUNCTIONS');

function sayThanks(name='Biola Balogun') {
  console.log('Thank you for noting all this ' + name + '! We appreciate your effort.');
}

sayThanks();
sayThanks('Gloria Udoh');

// Functions can be called before they are declared
function createSpace(sectionNumber, sectionName) {
  (sectionNumber === 1) ? console.log('-------------------------------------------------------------------------') : console.log('\n\n-------------------------------------------------------------------------');
  console.log(`Section #${sectionNumber}: ${sectionName}`);
  console.log('-------------------------------------------------------------------------');
}

const plantNeedsSun = function (day) {
  // NOTE: You cannot use `return` in a ternary statement
  let result;
  (day === 'Monday' || day === 'Thursday' || day === 'Sunday') ? result = true : result = false;
  return result;
};

// Arrow function - serves same function as anonymous function without the 
const plantNeedsWater = (day) => {
  // NOTE: You cannot use `return` in a ternary statement
  let result;
  (day === 'Wednesday') ? result = true : result = false;
  return result;
};

// Single line arrow function >>> Does NOT need a return statement
const square = (num) => num * num;

console.log(plantNeedsSun('Monday'));
console.log(plantNeedsWater('Thursday'));
console.log(square(4));

// -------------------------------------------------------------------------
// 7. ARRAYS
createSpace(7, 'ARRAYS');

let groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', ['cheese', 'crackers'], 'coconut oil', 'plantains'];
groceryList[1] = 'avocados';
console.log(groceryList[1]);
let lastItem = groceryList.pop();
console.log(lastItem);
groceryList.push('lentils');
console.log(groceryList);
groceryList.shift();
console.log(groceryList);
groceryList.unshift('popcorn');
console.log(groceryList);
console.log(groceryList.slice(1,4));              // Does NOT mutate the array
console.log(groceryList);
const pastaIndex = groceryList.indexOf('pasta');
console.log(pastaIndex);
console.log(`There are ${groceryList.length} items in the grocery list.`);
groceryList.splice(3, 3, 'apples');
console.log(groceryList);

// -------------------------------------------------------------------------
// 8. LOOPS
createSpace(8, 'LOOPS');

for (let i=5; i<=10; i++) {
  console.log(i);
}

for (let counter = 3; counter >= 0; counter--){
  console.log(counter);
}

const vacationSpots = ['South Africa', 'Lesotho', 'Botswana'];
for (let i=0; i<vacationSpots.length; i++) {
  console.log(`I would love to visit ${vacationSpots[i]}`);
}
// You can edit a const array but you cannot reassign it
vacationSpots.push('Kenya');
console.log(vacationSpots);
// NOTE: The line below will result in a TypeError because of the attempt to re-assign a const variable
// vacationSpots = ['Ghana', 'Nigeria', 'Cameroon'];

const cards = ['diamond', 'spade', 'heart', 'club'];
// Write your code below
let currentCard;
while (currentCard !== 'spade') {
  currentCard = cards[Math.floor(Math.random() * 4)];
  console.log(currentCard);
}

// Using do...while loop
let cupsOfSugarNeeded = 8;
let cupsAdded = 0;
do {
  cupsAdded++;
  console.log(cupsAdded);
} while (cupsAdded < cupsOfSugarNeeded);

// -------------------------------------------------------------------------
// 9. ITERATORS
createSpace(9, 'ITERATORS');

// Higher-order functions: Functions that accept other functions as arguments and/or return functions as output
const checkThatTwoPlusTwoEqualsFourAMillionTimes = () => {
  for(let i = 1; i <= 1000000; i++) {
    if ( (2 + 2) != 4) {
      console.log('Something has gone very wrong :( ');
    }
  }
};

// Write your code below
const isTwoPlusTwo = checkThatTwoPlusTwoEqualsFourAMillionTimes;

isTwoPlusTwo();
console.log(isTwoPlusTwo.name);

// Functions that get passed as parameters are called 'callback functions'
const addTwo = num => {
  return num + 2;
}

const checkConsistentOutput = (func, val) => {
  let checkA = val + 2;
  let checkB = func(val);
  if (checkA === checkB) {
    return func(val);
  } else {
    return 'inconsistent results';
  }
}

console.log(checkConsistentOutput(addTwo, 5));       // addTwo() is a callback function

// Using iterators: forEach(), map(), join(), filter(), findIndex(), reduce(), some(), every()
// Iterator documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods
const fruits = ['mango', 'papaya', 'pineapple', 'apple'];

fruits.forEach((fruit) => {
  console.log(`I want to eat a ${fruit}`);
});

const fruitLengths = fruits.map((fruit) => {
  return fruit.length;
});
console.log(fruitLengths.join(' '));

const longFruits = fruits.filter((fruit) => {
  return fruit.length > 5;
});
console.log(longFruits);

const foundFruit = fruits.findIndex((fruit) => {
  return fruit === 'mango';
});
console.log(foundFruit);

const fruitLengthSum = fruits.reduce((accumulator, currentValue) => {
  console.log('The value of accumulator: ' + accumulator);
  console.log('The value of currentValue: ' + currentValue);
  return accumulator + currentValue.length;
}, 0);                                            // 0 is passed as a second value to accumulator which is the starting value for accumulator
console.log(fruitLengthSum);

const fruitsHaveLemon = fruits.some((fruit) => {
  return fruit === 'lemon';
});
console.log(fruitsHaveLemon);

const fruitsAreShort = fruits.every((fruit) => {
  return fruit.length <= 5;
});
console.log(fruitsAreShort);

// -------------------------------------------------------------------------
// 10. OBJECTS
createSpace(10, 'OBJECTS');

let spaceship = {
  homePlanet: 'Earth',                        // NOTE: Object attributes are separated by commas
  color: 'silver',
  'Fuel Type': 'Turbo Fuel',
  numCrew: 5,
  flightPath: ['Venus', 'Mars', 'Saturn'],
  passengers: null
};

// Write your code below
let crewCount = spaceship.numCrew;
console.log(crewCount);
spaceship.numCrew ++;                         // Object attributes are mutable
console.log(spaceship['numCrew']);            // Object attributes can be accessed using . or []
spaceship['targetPlanet'] = 'Mars';           // Adding a new attribute
spaceship.weight = 300.04;
console.log(spaceship.weight);
delete spaceship.weight;                      // Deleting an attribute
spaceship.passengers = [{name: 'Daraobong', seatClass: 'Business'}, {name: 'Gloria', seatClass: 'Economy'}];
let firstPassenger = spaceship.passengers[0];
console.log(firstPassenger['name']);

let retreatMessage = 'We no longer wish to conquer your planet. It is full of dogs, which we do not care for.';
let alienShip = {
  // Method #1 of defining an object method
  retreat: function() {
    console.log(retreatMessage)
  },                                        // Functions in objects are also separated by commas
  // Method #2 of defining an object method
  takeOff () {
    console.log('Spim... Borp... Glix... Blastoff!')
  }
}
alienShip.retreat();
alienShip.takeOff();

// Object and function interaction
// NOTE: Objects are passed to functions by reference
function tryObjReassignment(obj) {
  obj = {
    identified : false, 
    'transport type' : 'flying'
  }
};

function tryObjAttributeReassignment(obj) {
  // NOTE: You cannot assign an attribute that does not exist
  // The line of code below will NOT work
  // obj[identified] = true;
  obj.weight = 1000.05;
};

tryObjReassignment(spaceship);            // This will NOT work
console.log(spaceship);
tryObjAttributeReassignment(spaceship);   // This will work
console.log(spaceship);

// NOTE: Key-value pairs in objects are NOT ordered
for (let passenger in spaceship.passengers) {
  console.log(`- ${spaceship.passengers[passenger].name} >> Seat Class ${spaceship.passengers[passenger].seatClass}`);
}

// -------------------------------------------------------------------------
// 11. OBJECTS
createSpace(11, 'ADVANCED OBJECTS');

const robot = {
  _model: '1E78V2',
  _energyLevel: 100,
  _numOfSensors: 15,
  decrementEnergyLevel: function() {
    this._energyLevel--;
  },
  incrementEnergyLevel: function() {   
    this._energyLevel++;
  },
  /*
  The code below is a wrong way to define a function in an object:
  >> incrementEnergyLevel: () => {
       this._energyLevel++;
     },
  NOTE: You do NOT use the `this` keyword with arrow functions; `this` will refer to a global variable rather
  than the object calling it. However, the keyword is needed so it is advised not to use arrow functions in objects
   */
  get numOfSensors(){
    if(typeof this._numOfSensors === 'number'){
      return this._numOfSensors;
    } else {
      return 'Sensors are currently down.'
    }
  },
  set numOfSensors(num){
    if ((typeof num === 'number') && (num >= 0)) {
      this._numOfSensors = num;
    } else {
      console.log('Pass in a number that is greater than or equal to 0');
    }
  },
  otherFunctions: {
    otherFunction1 () {
      console.log('Printing another Function #1');
    },
    otherFunction2 () {
      console.log('Printing another Function #2');
    }
  }
  
};

// This line of code should NOT be written as the _ character indicates that the particular attribute should not be altered outside the object
robot._energyLevel += 50;
console.log(robot._energyLevel);
// Alternative: Using functions WITHIN object to interact with the "non-alterable" attribute
robot.decrementEnergyLevel();
console.log(robot._energyLevel);
robot.incrementEnergyLevel();
console.log(robot._energyLevel);

// Using getters and setters
robot.numOfSensors = 100;
console.log(robot.numOfSensors);

// Using destructured assignment to use one of the other functions
const { otherFunctions } = robot;
otherFunctions.otherFunction1();

// Using a factory function - Operates sort of like a class constructor\
const robotFactory = (model, mobile) => {
  return {
    model: model,                           // Can also be written as just `model` which uses property value shorthand
    mobile: mobile,                         // Can also be written as just `mobile` which uses property value shorthand
    beep() {
      console.log('Beep Boop');
    }
  }
}

const tinCan = robotFactory('P-500', true);
tinCan.beep();

// Using in-built Object methods
// Object in-built function documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
const machine = {
	model: 'SAL-1000',
  mobile: true,
  sentient: false,
  armor: 'Steel-plated',
  energyLevel: 75
};
console.log(machine);
const machineKeys = Object.keys(machine);
console.log(machineKeys);
const machineEntries = Object.entries(machine);
console.log(machineEntries);

// Using the assign() method without changing the value of the machine object
const newMachine = Object.assign({
  laserBlaster: true,
  voiceRecognition: true
}, machine);
console.log(newMachine);
