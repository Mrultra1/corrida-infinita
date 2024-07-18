var path, mainNave;
var nave2, nave3, nave4;
var pathImg, mainNaveImg1, mainNaveCollidedImg;

var oppNave2Img1, oppNave2Img2;
var oppNave3Img1, oppNave3Img2;
var oppNave4Img1, oppNave4Img2;
var gameOverImg, cycleBell, explosaoImg;

var nave2Group, nave3Group, nave4Group;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;

function preload() {
  pathImg = loadImage("Road.png");
  mainNaveImg1 = loadAnimation("nave.png");
  mainNaveCollidedImg = loadAnimation("nave.png"); 

  oppNave2Img1 = loadAnimation("nave 2.png");
  oppNave2Img2 = loadAnimation("nave 2.png");

  oppNave3Img1 = loadAnimation("nave 3.png");
  oppNave3Img2 = loadAnimation("nave 3.png");

  oppNave4Img1 = loadAnimation("nave 4.png");
  oppNave4Img2 = loadAnimation("nave 4.png");

  explosaoImg = loadAnimation("explosão1.png");
  
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(1200, 300);
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  mainNave = createSprite(70, 150);
  mainNave.addAnimation("Running", mainNaveImg1);
  mainNave.addAnimation("Collided", mainNaveCollidedImg); 
  mainNave.addAnimation("Exploded", explosaoImg);
  mainNave.scale = 0.2;

  mainNave.setCollider("rectangle", 0, 0, mainNave.width * 1.5, mainNave.height * 1.5);

  gameOver = createSprite(650, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  nave2Group = new Group();
  nave3Group = new Group();
  nave4Group = new Group();
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 900, 30);

  if (gameState === PLAY) {
    distance = distance + Math.round(getFrameRate() / 50);
    path.velocityX = -(6 + 2 * distance / 150);

    mainNave.y = World.mouseY;

    edges = createEdgeSprites();
    mainNave.collide(edges);

    if (path.x < 0) {
      path.x = width / 2;
    }

    
    var select_oppPlayer = Math.round(random(1, 3));

    if (World.frameCount % 150 === 0) {
      if (select_oppPlayer === 1) {
        spawnNave2();
      } else if (select_oppPlayer === 2) {
        spawnNave3();
      } else {
        spawnNave4();
      }
    }

    checkCollision(nave2Group);
    checkCollision(nave3Group);
    checkCollision(nave4Group);

  } else if (gameState === END) {
    gameOver.visible = true;

    textSize(25);
    fill(255);
    text("Pressione a Seta Para Cima para Reiniciar o jogo!", 400, 200);

    if (keyDown("UP_ARROW")) {
      reset();
    }

    path.velocityX = 0;
    mainNave.velocityY = 0;

    nave2Group.setVelocityXEach(0);
    nave2Group.setLifetimeEach(-1);

    nave3Group.setVelocityXEach(0);
    nave3Group.setLifetimeEach(-1);

    nave4Group.setVelocityXEach(0);
    nave4Group.setLifetimeEach(-1);
  }
}

function spawnNave2() {
  nave2 = createSprite(1100, Math.round(random(50, 250)));
  nave2.scale = 0.3;
  nave2.velocityX = -(6 + 2 * distance / 150);
  nave2.addAnimation("opponentPlayer1", oppNave2Img1);
  nave2.addAnimation("Exploded", explosaoImg);
  nave2.setCollider("rectangle", 0, 0, nave2.width * 1.5, nave2.height * 1.5);
  nave2.setLifetime = 170;
  nave2Group.add(nave2);
}

function spawnNave3() {
  nave3 = createSprite(1100, Math.round(random(50, 250)));
  nave3.scale = 0.3;
  nave3.velocityX = -(6 + 2 * distance / 150);
  nave3.addAnimation("opponentPlayer2", oppNave3Img1);
  nave3.addAnimation("Exploded", explosaoImg);
  nave3.setCollider("rectangle", 0, 0, nave3.width * 1.5, nave3.height * 1.5);
  nave3.setLifetime = 170;
  nave3Group.add(nave3);
}

function spawnNave4() {
  nave4 = createSprite(1100, Math.round(random(50, 250)));
  nave4.scale = 0.3;
  nave4.velocityX = -(6 + 2 * distance / 150);
  nave4.addAnimation("opponentPlayer3", oppNave4Img1);
  nave4.addAnimation("Exploded", explosaoImg);
  nave4.setCollider("rectangle", 0, 0, nave4.width * 1.5, nave4.height * 1.5);
  nave4.setLifetime = 170;
  nave4Group.add(nave4);
}

function checkCollision(group) {
  group.forEach(function(nave) {
    if (nave.isTouching(mainNave)) {
      gameState = END;
      nave.velocityX = 0;
      nave.changeAnimation("Exploded");
      nave.animation.play();
      
      mainNave.changeAnimation("Exploded");
      mainNave.animation.play();

      setTimeout(() => {
        nave.remove();
      }, 500);
    }
  });
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;

  mainNave.changeAnimation("Running"); 
  nave2Group.destroyEach();
  nave3Group.destroyEach();
  nave4Group.destroyEach();

  distance = 0;
  path.velocityX = -5;
}

