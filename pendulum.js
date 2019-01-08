var r1 = 100; // length of arm 1
var r2 = 100; // length of arm 2
var m1 = 10;  // mass of bob 1
var m2 = 10;  // mass of bob 2
var a1 = 1;   // angle 1
var a2 = 1;   // angle 2
var a1_v = 0; // a1 velocity
var a2_v = 0; // a2 velocity

var g = 1;
var trace = [];

function setup() {
  createCanvas(600, 600);
}

function draw() {



  // formula for the acceleration of the first bob
  var num1 = -g * (2 * m1 + m2) * sin(a1);  // first fourth of numerator
  var num2 = -m2 * g * sin(a1 - 2 * a2); // second fourth
  var num3 = -2 * sin(a1 - a2) * m2; // third fourth
  var num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2); // 4/4 of numerator;

  var den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2)); // denominator

  var a1_a = (num1 + num2 + num3 * num4) / den; // a1 acceleration


  // formula for the acceleration of the second bob
  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1)
  num4 =  a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

  var a2_a = (num1 * (num2 + num3 + num4)) / den; // a2 acceleration





  background(255);
  stroke(0);
  fill(0);
  strokeWeight(2);

  translate(300, 300);
  var x1 = r1 * sin(a1);
  var y1 = r1 * cos(a1);

  line(0, 0, x1, y1);
  ellipse(x1, y1, m1);

  var x2 = x1 + r2 * sin(a2);
  var y2 = y1 + r2 * cos(a2);

  for (var i = 0; i < trace.length; i++) {
    var vector = trace[i];
    point(vector[0], vector[1]);
  }

  trace.push([x2, y2]);
  if (trace.length > 500) {
    trace.shift();
  }

  line(x1, y1, x2, y2);
  ellipse(x2, y2, m2);


  a1 += a1_v;
  a2 += a2_v;
  a1_v += a1_a;
  a2_v += a2_a;
}
