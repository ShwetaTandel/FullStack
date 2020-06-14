
//Note : Since it's a little complicated to convert a decimal to fractions.
//I have used the basic logic. This may not work in all edge cases.

//Calculated GSD of the 2 numbers
var gcd = function(a, b) {
  if (b < 0.0000001) return a;
  return gcd(b, Math.floor(a % b));
};

//Returns a fraction for a decimal number
var getFraction = function(decimal){
  var len = decimal.toString().length - 2;
  var denominator = Math.pow(10, len);
  var numerator = decimal * denominator;
  var divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  return (Math.floor(numerator) + '/' + Math.floor(denominator));
}
