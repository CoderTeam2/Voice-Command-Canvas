var x = 0;
var y = 0;
var screen_width = 0;
var screen_height = 0;
var draw_apple = "";
var speak_data = "";
var apple = null;
var input_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
  apple = loadImage("apple.png");
}
function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {
  content = event.results[0][0].transcript;
  input_number = Number(content);
  if (Number.isInteger(input_number)) {
    draw_apple = "set";
    document.getElementById("status").innerHTML = "Started Drawing Apple";
  }else{
    document.getElementById("status").innerHTML = "The webapp has not recognised the speech as a number";
  }
  console.log(event);

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

}

function draw() {
  if (draw_apple == "set") {
    background("pink");
    for(var i = 0; i < input_number; i++){
      x = Math.floor(Math.random()*700);
      y = Math.floor(Math.random()*400);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = input_number + " Apples drawn";
    draw_apple = "";
  }
}

function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}

function setup(){
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height-150);
  canvas.position(150,150);
}