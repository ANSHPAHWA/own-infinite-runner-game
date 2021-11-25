

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_cycling, boy_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score;

var gameover,gameoverImage;


function preload(){
  boy_cycling = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  boy_collided = loadAnimation("mainPlayer3.png");
  
  groundImage = loadImage("jungle.jpg");
  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  

  gameoverImage=loadImage("gameOver.png");
  
  
}

function setup() {
  createCanvas(600, 600);

  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  boy = createSprite(100,520,20,50);
  boy.addAnimation("running", boy_cycling);
  boy.addAnimation("collided" , boy_collided)
  boy.scale = 0.1;
  //trex.debug=true;
  boy.setCollider("circle",0,0,40);
  
  invisibleGround = createSprite(200,530,400,10);
  invisibleGround.visible = false;

  gameover=createSprite(300,300);
  gameover.addImage(gameoverImage);
  gameover.visible=false;
  gameover.scale=1.5;

 
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();

  
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);

    if(keyDown("space")&& boy.y >= 100) {
      boy.velocityY = -13;
    }
    
    boy.velocityY = boy.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
      
    }

    spawnObstacles();
    if(obstaclesGroup.isTouching(boy)){
      gameState = END;
    }
  }
  else if(gameState === END){
    gameover.visible=true;
    ground.velocityX = 0;
    boy.velocityY=0;
    boy.changeAnimation("collided",boy_collided);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1); 
    score=0;

  
  }
 
  boy.collide(invisibleGround);
  
  drawSprites();

}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,520,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




