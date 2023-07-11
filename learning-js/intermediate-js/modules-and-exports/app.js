const radius = 5;
const sideLength = 10;

const { areaFunctions } = require('./shape-area.js');

// ALTERNATIVE: import circleArea and squareArea with object destructuring
// >> const { circleArea, squareArea } = require("./shape-area.js")

const areaOfCircle = areaFunctions.circleArea(radius);
// Using ALTERNATIVE: >> const areaOfCircle = circleArea(radius);
const areaOfSquare = areaFunctions.squareArea(sideLength);
// Using ALTERNATIVE: >> const areaOfSquare = squareArea(sideLength);

console.log(`The area of a circle with a radius of ${radius} is ${areaOfCircle}`);
console.log(`The area of a square with a side length of ${sideLength} is ${areaOfSquare}`);
