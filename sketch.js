var PLAY = 1;
var END = 0;
var gameState = PLAY;
var climbGroup;
var doorGroup;
var INVGroup;
function preload(){
  ghostANI = loadImage("ghost-standing.png");
  bgImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  over = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,450)
  bg = createSprite(300,225);
  bg.addImage(bgImage);
  bg.velocityY = +4;
  ghost = createSprite(300,200,20,20);
  ghost.addImage(ghostANI);
  ghost.scale = 0.3;
  climbGroup = new Group();
  doorGroup = new Group();
  INVGroup = new Group();
}
function draw(){
  background(180);
  if(gameState === PLAY){
  if(bg.y>=450){
  bg.y = 300;
  }
  if(keyDown("space")){
  ghost.velocityY = -9;
  }
  ghost.velocityY = ghost.velocityY + 0.5;
  if(keyDown(RIGHT_ARROW)){
  ghost.x = ghost.x+5;
  }
  
  if(keyDown(LEFT_ARROW)){
  ghost.x = ghost.x-5;
  }
  over.play();
  SpawnDoors();
  if(ghost.isTouching(climbGroup)){
   ghost.velocityY = 0;
  }
  if(ghost.isTouching(INVGroup)||ghost.y>600){
    gameState = END;
    ghost.destroy();
    doorGroup.destroyEach();
    climbGroup.destroyEach();
    bg.destroy();
  }
  
  }
  if(gameState === END){
   textSize(30);
   fill("red");
   text("GAMEOVER",200,200);
  }
  drawSprites();
}  

function SpawnDoors(){
  if(frameCount %  50 === 0){
door = createSprite(100,0,20,20);
door.velocityY =   +4;
door.addImage(doorImage);
door.scale = 0.5
door.x = Math.round(random(120,550));
door.lifetime = 200;
doorGroup.add(door);
climber = createSprite(100,20,20,20);
climber.addImage(climberImage);
climber.x = door.x;
climber.scale = 0.8;  
climber.velocityY = +4;
climber.lifetime = 200;
climbGroup.add(climber);
invisibleSprite = createSprite(100,20,climber.width,2);
invisibleSprite.visible = false;
invisibleSprite.x = door.x;
invisibleSprite.velocityY = +4;
invisibleSprite.shapeColor ="red";
INVGroup.add(invisibleSprite);
ghost.depth = climber.depth;
ghost.depth = ghost.depth+1;
ghost.depth = door.depth;
ghost.depth = ghost.depth+1;
}
}
 