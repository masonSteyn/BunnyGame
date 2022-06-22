const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button, blower;
var bunny;
var blink, eat, sad;
var mute_btn;

var fr, rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air_sound = loadSound('air.wav');

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth + 80, displayHeight);
  } else { 
     canW = windowWidth;
     canH = windowHeight; 
     createCanvas(windowWidth, windowHeight); }


  frameRate(80);



  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(150, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  button1 = createImg('cut_btn.png');
  button1.position(320, 30);
  button1.size(50, 50);
  button1.mouseClicked(drop1);

  button2 = createImg('cut_btn.png');
  button2.position(380, 280);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  mute_btn = createImg('mute.png');
  mute_btn.position(400, 30);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  air = createImg('balloon.png');
  air.position(60, 250);
  air.size(120, 100);
  air.mouseClicked(airBlow);

  rope = new Rope(7, { x: 150, y: 30 });
  rope1 = new Rope(9, { x: 350, y: 30 });
  rope2 = new Rope(4, { x: 420, y: 300 });
  ground = new Ground(200, canH, 600, 20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(230, canH-80, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con1 = new Link(rope1, fruit);
  fruit_con2 = new Link(rope2, fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img, 0, 0, displayWidth+80, displayHeight);
  rope1.show()
  rope2.show()
  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation('eating');
    eating_sound.play()
  }


  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
    fruit = null;
    sad_sound.play()

  }

}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut_sound.play()
}
function drop1() {
  rope1.break();
  fruit_con1.detach();
  fruit_con1 = null;
  cut_sound.play()
}
function drop2() {
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  cut_sound.play()
}


function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}
function airBlow() {
  Matter.Body.applyForce(fruit, fruit.position, { x: 0.01, y: 0 })
  air_sound.setVolume(0.1)
  air_sound.play()
}
function mute() {
  if (!bk_song.isPlaying()) {
    bk_song.play();
    bk_song.setVolume(0.5);
  }
  else {
    bk_song.stop();
  }
}
