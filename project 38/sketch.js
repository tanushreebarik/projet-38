/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;
var kangaroo, kangaroo_running, kangaroo_collided
var invisibleGround;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;
var shrub
var cloud

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
  cloud = loadImage("assets/cloud.png");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo = createSprite(100, height - 100);
  kangaroo.addAnimation("running",kangaroo_running);
  kangaroo.addAnimation("collided",kangaroo_collided);
  kangaroo.scale = 0.2;
  kangaroo.setCollider("circle", 0, 0, 300);
  kangaroo.debug = true;

  invisibleGround = createSprite(width/2, height - 10, width, 20);
  invisibleGround.visible = false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  if(gameState === PLAY){
    jungle.velocityX = -3;
    if(jungle.x <  100){
      jungle.x = width/2

    }
    if(keyDown("space")){
      kangaroo.velocityY = -12;


    }
    kangaroo.velocityY = kangaroo.velocityY + 0.8
  }
  kangaroo.x = camera.position.x - 270;


  spawnShrubs();
  kangaroo.collide(invisibleGround);
  drawSprites();


}
function spawnShrubs(){
if(frameCount % 150 === 0){
shrub = createSprite(camera.position.x + 500, 330, 40, 10);
 shrub.velocityX = -3;
 shrub.scale = 0.05;
 var rand = Math.round(random(1,3));
 switch(rand){
   case 1: shrub.addAnimation("1", shrub1);
           break;
   case 2: shrub.addAnimation("2", shrub2);
           break;
   case 3: shrub.addAnimation("3", shrub3);
           break;
 }
 shrub.lifetime = width/3;
}
function spawnClouds(){
  if(frameCount % 150 === 0){
  cloud = createSprite(camera.position.x + 500, 330, 40, 10);
   cloud.velocityX = -3;
   cloud.scale = 0.05;
   var rand = Math.round(random(1,3));
   switch(rand){
     case 1: cloud.addImage("1", cloud);
             break;
     case 2: cloud.addImage("2", cloud);
             break;
     case 3: cloud.addImage("3", cloud);
             break;
   }
   cloud.lifetime = width/3;
  }
}
