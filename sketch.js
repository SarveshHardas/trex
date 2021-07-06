var trex,timage;
var ground,gimage,iGround,collidedTrex;
var cloud,cImage;
var obsctacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var gameOver1,gameOver,restart1,restart;
var PLAY=1;
var END=0;
var gameState=PLAY;

var count=0;
 
function preload(){
timage=loadAnimation("trex1.png","trex3.png","trex4.png");
  gimage=loadImage("ground2.png");
  cImage=loadImage("cloud.png");
  collidedTrex=loadImage("trex_collided.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  gameOver=loadImage("gameOver.png");
  restart=loadImage("restart.png");
}
function setup(){
  createCanvas(windowWidth,windowHeight)
  trex=createSprite(50,windowHeight-40,10,10);
  trex.addAnimation("running",timage)
  trex.addAnimation("collided",collidedTrex);
  trex.scale=0.6;
  
  ground=createSprite(0,windowHeight-40);
  ground.x=ground.width/2;
  ground.addImage(gimage);
  
  iGround=createSprite(0,windowHeight-30,600,10);
  ObstacleG=createGroup();
  cloudsG=createGroup();
  
  gameOver1=createSprite(300,150);
  gameOver1.addImage(gameOver);
  gameOver1.scale=0.5;
    
  restart1=createSprite(300,120);
  restart1.addImage(restart);
  restart1.scale=0.3; 
  
    gameOver1.visible=false;
    restart1.visible=false;
  //trex.debug=true;
  
  trex.setCollider("circle",0,0,30);
  
 
}
function draw(){
  background(160);
  
  if(gameState===1)
    {
      ground.velocityX=-3;
      if(ground.x<0){
      ground.x=ground.width/2;
      }
      if(keyDown("space"))
    {
      if(trex.y>160)
      {
        trex.velocityY=-10;

      }
    }
    trex.velocityY=trex.velocityY+0.5;
      
   count=count+Math.round(getFrameRate()/60);
      
      spawnCloud();
      spawnobstacle();
      
     ground.velocityX = -(3  + 3*count/100);   
    
        
      if(ObstacleG.isTouching(trex))
        {
          gameState=END;
        }
      
    
    }
else if(gameState===END)  
  {
    ground.velocityX=0;
    trex.changeAnimation("collided",collidedTrex)
    trex.velocityY=0;
    ObstacleG.setVelocityXEach(0);
    ObstacleG.setLifetimeEach(-1);
    cloudsG.setVelocityXEach(0);
    cloudsG.setLifetimeEach(-1);
    gameOver1.visible=true;
    restart1.visible=true;
  }
  
      if(mousePressedOver(restart1))
      {
       reset();
      }
  trex.collide(iGround);
  
  iGround.visible=false;
 // console.log(frameRate());
  
  
  
  drawSprites();
  
  stroke("black");
  fill("black");
  textSize(20);  
  text("score:  "+count,350,50);
}
function spawnCloud()
{
  if(frameCount%100===0)
  {
    var r=random(100,windowHeight/2)
   cloud=createSprite(windowWidth,r,10,10);
   cloud.addImage(cImage);
   cloud.velocityX=-5;
   //cloud.scale=0.5;
   cloud.lifetime = windowWidth/5;
   cloud.depth = trex.depth;
   trex.depth = trex.depth + 1;
   cloudsG.add(cloud);
  }
}
function spawnobstacle() {
  //write code here to spawn the obstacles
  if (World.frameCount % 200 === 0) {
    var obstacle = createSprite(windowWidth,windowHeight-50,40,10);
    var r=Math.round(random(1,6));
    
    obstacle.scale = 1;
    obstacle.velocityX = -3;
    obstacle.lifetime = windowWidth/3;
    
    switch(r)
    {
        case 1:obstacle.addImage(obstacle1) 
        break;
        case 2:obstacle.addImage(obstacle2) 
        break;
        case 3:obstacle.addImage(obstacle3) 
        break;
        case 4:obstacle.addImage(obstacle4) 
        break;
        case 5:obstacle.addImage(obstacle5) 
        break;
        case 6:obstacle.addImage(obstacle6) 
        break;
        default:break;
     }
    ObstacleG.add(obstacle);
  }
}

function reset()
  {
   gameState=PLAY;
    gameOver1.visible=false;
    restart1.visible=false;
    ObstacleG.destroyEach();
    cloudsG.destroyEach();
    trex.changeAnimation("running",timage);
    count=0;
  }