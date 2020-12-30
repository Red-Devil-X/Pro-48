var nobita, nobitaImg, scared, scareImg;
var home, homeImg;
var score = 0;
var gr;
var food, foodImg, foodGrp;
var obstacle, obstacleImg, obstaclesGroup,friendsGroup;
var play = 1;
var end = 0;
var gameState = "serve";
var gameOver, gameOverImg;
var restart, resetImg;
var song;
localStorage["HighestScore"] = 0;
var gian, doraemon,dorame, teacher, resetImg;
var scareImg, homeImg, cakeImg, foodImg, pizzaImg;
var school, schoolImg, startImg, button, buttonImg;
var back, backImg, chowImage, logo, logoImg, flyImg;
var highScore, highScoreImg, point, pointImg, eat, lose, click,friend;
var life = 3;
var life1,life2,life3,lifeImg;

function preload(){
  nobitaImg = loadImage("Nobita_1.png");
  lifeImg = loadImage("life.png");
  gian = loadImage("gian.png");
  doraemon = loadImage("doraemon.png");
  dorame = loadImage("dorame.png");
  teacher = loadImage("teacher.png");
  resetImg = loadImage("reset.png");
  gameOverImg = loadImage("game_over_PNG57.png");
  scareImg = loadImage("cry.png");
  homeImg = loadImage("home1.png");
  schoolImg = loadImage("school.png");
  foodImg = loadImage("doracake.png");
  cakeImg = loadImage("cake.png");
  pizzaImg = loadImage("pizza.png");
  startImg = loadImage("backg.jpg");
  buttonImg = loadImage("startbu.png");
  backImg = loadImage("back.png");
  chowImage = loadImage("chow.png");
  logoImg = loadImage("logo.png");
  fireImg = loadImage("fire.png");
  flyImg = loadImage("flying_nobita.png");
  highScoreImg = loadImage("highscore.png");
  pointImg = loadImage("score.png");
  eat = loadSound("eat.wav");
  lose = loadSound("lose.wav");
  click = loadSound("click.wav");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  console.log(width);
  console.log(height);
  
  home = createSprite(width/2, height/2 ,width,height);
  home.shapeColor = rgb(173, 216, 230);
  home.addImage(homeImg);
  home.scale = 2.2;
  home.velocityX = -12;
  home.visible = false;

  
  
  nobita = createSprite(80,height-50,50,50);
  nobita.addImage(flyImg);
  nobita.scale = 0.25;
  nobita.visible = false;
  nobita.debug=false;
  nobita.setCollider("rectangle",0,0,460,nobita.height);

 

  life1 = createSprite(windowWidth-50,20);
  life1.addImage(lifeImg);
  life1.scale=0.3;

  life2 = createSprite(windowWidth-120,20);
  life2.addImage(lifeImg);
  life2.scale=0.3;

  life3 = createSprite(windowWidth-190,20);
  life3.addImage(lifeImg);
  life3.scale=0.3;
  
  
  gr = createSprite(width/2,nobita.y+50,width,10);
  gr.visible = false;
  
  foodGrp = new Group();
  obstaclesGroup = new Group();
  friendsGroup = new Group();
  
  scared = createSprite(nobita.x, nobita.y-120,20,20);
  scared.addImage(scareImg);
  scared.scale = 0.3;
  scared.visible = false;
  
  gameOver = createSprite(width/2,height/2,100,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.3;
  gameOver.visible = false;
  
  restart = createSprite(width/2-70,gameOver.y+120,30,20);
  restart.addImage(resetImg);
  restart.scale = 0.4;
  restart.visible = false;

  button = createSprite(width/2, height/2+200, 20, 20);
  button.addImage(buttonImg);
  button.scale = 0.7;

  back = createSprite(width/2+80, restart.y, 20, 20);
  back.addImage(backImg);
  back.scale = 0.3;
  back.visible = false;

  logo = createSprite(width/2, height/2, 59, 49);
  logo.addImage(logoImg);
  logo.scale = 0.5;

  highScore = createSprite(100, 50,20, 20);
  highScore.addImage(highScoreImg);
  highScore.scale = 0.4;

  point = createSprite(80, 100,20, 20);
  point.addImage(pointImg);
  point.scale = 0.4;
}

function draw(){
background("black");

  if(gameState === "serve"){
    background(startImg);
    if(mousePressedOver(button) || touches.length>0){
      button.visible = false;
      logo.visible = false;
      home.visible = true;
      nobita.visible = true;
      console.log("buttonPressed")
      reset();
      touches = [];
      click.play();
    }
    console.log(gameState);
  }
  else if(gameState === "play"){
  if (home.x < 0){
      home.x = home.width/2+400;
    }
  
  if(touches.length>0 || keyDown("space") && nobita.y >= height/2-50) {
      nobita.velocityY = -12;
      nobita.addImage(flyImg);
      touches = [];
    }
   if(nobita.isTouching(gr)){
     nobita.addImage(nobitaImg);
   }
    nobita.velocityY = nobita.velocityY + 0.8
  nobita.collide(gr);
  
  if(nobita.isTouching(foodGrp)){
  score = score+2;
    foodGrp.destroyEach();
    eat.play();
  }
   if(nobita.isTouching(friendsGroup)){
     friendsGroup.destroyEach();
     if(life<3){
       console.log(life);
      life++
     }
   }
    
    if (nobita.isTouching(obstaclesGroup)){

      obstaclesGroup.destroyEach();
    life--;
    console.log(life);
    lose.play();
    }
        if(life===2){
          console.log("life 2")
      life3.visible=false; 
      life2.visible=true; 
      life1.visible=true; 

      
    }
 
    
    if(life===1){
      life2.visible=false;
      life3.visible=false; 
      life1.visible=true; 
    }
    if(life===0) {
      gameState = "end";
      life1.visible=false;
      life2.visible=false; 
      life3.visible=false; 
    restart.visible = true;
    gameOver.visible = true;
    }

    if(life===3){
      life2.visible=true;
      life3.visible=true; 
      life1.visible=true; 
    }
    
    
  spawnFoods();
  friends();
  spawnObstacles();
   

   

  }
  else if (gameState === "end") {
    scared.visible = true;
   
    nobita.visible = false;
    back.visible = true;
    
    //set velcity of each game object to 0
    home.velocityX = 0;
    nobita.velocityY = 0;
    foodGrp.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    text("Your Score is: ",score,width/2, height/2+150);
   
    obstaclesGroup.setLifetimeEach(-1);
    foodGrp.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)||touches.length>0) {
      reset();
      back.visible = false;
      touches = [];
      click.play();
    }
    
  }
  if(mousePressedOver(back)||touches.length>0){
    gameState = "serve";
      background(startImg);
      
        button.visible = true;
        logo.visible = true;
        home.visible = false;
        nobita.visible = false;
        back.visible = false;
        scared.visible = false;
        restart.visible = false;
        foodGrp.destroyEach();
        obstaclesGroup.destroyEach();
       touches = [];
       click.play();
  }
  gameOver.depth = logo.depth;
  logo.depth = logo.depth+1;

  drawSprites();
  
  fill(0);
  textSize(30);
  stroke(0);
  text(score, point.x+70,point.y+10);
  text(localStorage["HighestScore"],highScore.x+80,highScore.y+5)
  
}

function spawnFoods() {
  //write code here to spawn the foods
  if (frameCount % 130 === 0) {
    food = createSprite(width+10,Math.round(random(150, 350)),40,10);
    food.velocityX = -12;
    food.scale = 0.2;
    var ran = Math.round(random(1,4));
    switch(ran){
      case 1: food.addImage(foodImg);
      break;
      case 2: food.addImage(cakeImg);
      break;
      case 3: food.addImage(pizzaImg);
      break;
      case 4: food.addImage(chowImage);
      break;
      default : break;
    }
    restart.depth = food.depth;
    restart.depth = restart.depth+1;
    back.depth = restart.depth;
    gameOver.depth = restart.depth;
     //assign lifetime to the variable
    food.lifetime = 200;
    foodGrp.add(food);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(width+10,Math.round(random(height/2+200, height/2+350)),10,40);
    obstacle.debug = false;
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    obstacle.velocityX = -12;
    //generate random obstacles
   var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(gian);
      obstacle.scale = 1.2;       
          break;
      case 2: obstacle.addImage(fireImg);
      obstacle.scale = 0.2; 
              break;
      case 3: obstacle.addImage(teacher);
      obstacle.scale = 0.8; 
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    restart.depth = obstacle.depth;
    restart.depth = restart.depth+1;
    back.depth = restart.depth;
    gameOver.depth = restart.depth;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function friends(){
  if(frameCount % 500 === 0) {
  friend = createSprite(width+10,Math.round(random(height/2-200, height/2-350)),10,40);
  friend.debug = false;
  friend.setCollider("rectangle",0,0,50,100);
  friend.velocityX = -10;

  var rand = Math.round(random(1,2));
  switch(rand) {
    case 1: friend.addImage(doraemon);
    friend.scale = 0.15;       
        break;
    case 2: friend.addImage(dorame);
    friend.scale = 0.20; 
            break;
    default: break;
  }
  friendsGroup.add(friend);
  }
 
}

function reset(){
  gameState = play;
  gameOver.visible = false;
  restart.visible = false;
  scared.visible = false;
  nobita.visible = true;
  life=3;
  life1.visible=true;
  life2.visible=true
  life3.visible=true
  
  foodGrp.destroyEach();
  obstaclesGroup.destroyEach();
  
  home.velocityX = -7;
   if (home.x < 0){
      home.x = home.width/2;
    }
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  gameState = "play";
  
}