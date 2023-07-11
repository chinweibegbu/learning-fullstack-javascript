const PI = Math.PI;

function circleArea (r) {
  let area = PI*(r**2);
  // Round to 2 decimal places
  return Math.round((area + Number.EPSILON) * 100) / 100;
}

module.exports.circleArea = circleArea;
// You can also use anonymous functions with module exports
module.exports.squareArea = function(l) {
  return l*l;
}
