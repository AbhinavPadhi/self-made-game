var player;
var playerRunning;
var playerStill;
var zombie;
var zombie1Img;
var zombie2Img;
var road;
var roadImag;
var food;
var food2;
var foodImg;
var foodImg2;
var stamina = 100;
var maxStamina = 99;
var score = 0;
var score2 = 0;
var maxZombies = 0;
var zombieGroup;
var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;
var play;

function preload() {

    playerRunning = loadAnimation("images/run.png", "images/runflip.png");
    playerStill = loadImage("images/still.png");

    zombie1Img = loadImage("images/zombie1.png");
    zombie2Img = loadImage("images/zombie2.png");

    roadImg = loadImage("images/road.jpg");

    foodImg = loadImage("images/food.png");
	foodImg2 = loadImage("images/water.png")
	
}

function setup() {
    createCanvas(800, 1200);
    player = createSprite(400, 500, 50, 50);

    player.addAnimation("playerStill", playerStill);
    player.addAnimation("playerRunning", playerRunning);

    road = createSprite(400, 550, 50, 50);
    road.addImage("roadImage", roadImg);

    food = createSprite(random(10, 790), random(-100, -150), 5, 5);
    food2 = createSprite(random(10, 790), -50, 5, 5);

    food.addImage("apple", foodImg);

    food2.addImage("water", foodImg2);
    
    play = createSprite(400,600,200,50);
	
    zombieGroup = new Group;
    
    play.visible = false;
    player.visible = false;
    food.visible = false;
    food2.visible = false;
    road.visible = false;


}

function draw() {

    if(gameState === START){
     background("#FF0000");    
     play.visible = true;
     drawSprites();
     textSize(20);
     fill("white")
     text("play",380,610)
     text("There is a zombie outbreak throughout the city",185,650)
     text("you have to run from the zombies",240,680)
     text("and collect water and food",270,710)
     text("but your stamina will get low as you run",210,740)
     text("you need to wait for the stamina to regen",205,770)
     text("dont get caught by the zombies",240,800);
     text("good luck",340,830)
    
    
     if(mousePressedOver(play)){
       gameState = PLAY;
     }
    }



    if(gameState === PLAY){
    background(0, 0, 0);

    play.visible = false;
    player.visible = true;
    food.visible = true;
    food2.visible = true;
    road.visible = true;

	road.depth = 0;
	
	zombies();

    zombieGroup.setVelocityEach(0,-1);

    if (stamina >= 21) {
        if (keyDown("UP_ARROW") || keyDown("w")) {
            player.changeAnimation("playerRunning", playerRunning);
            stamina = stamina - 0.5;
            road.velocityY = 5;
            food.velocityY = 5;
			food2.velocityY = 5;
			zombieGroup.setVelocityEach(0,1);
			
        } else if (keyDown("RIGHT_ARROW") || keyDown("d")) {
            player.changeAnimation("playerRunning", playerRunning);
            stamina = stamina - 0.5;
			player.x = player.x + 20;
			
        } else if (keyDown("LEFT_ARROW") || keyDown("a")) {
            player.changeAnimation("playerRunning", playerRunning);
            stamina = stamina - 0.5;
			player.x = player.x - 20;
			
        } else {
			player.changeAnimation("playerStill", playerStill);
            if (stamina <= maxStamina) {
                stamina = stamina + 0.5;
                road.velocityY = 0;
            }
        }
    }

    if (keyWentUp("UP_ARROW") || keyWentUp("w")) {
        player.changeAnimation("playerStill", playerStill);
        if (stamina <= maxStamina) {
            stamina = stamina + 0.5;
            road.velocityY = 0;
            food.velocityY = 0;
            food2.velocityY = 0;
        }
    }

    if (keyWentUp("RIGHT_ARROW") || keyWentUp("d")) {
        player.changeAnimation("playerStill", playerStill);
        if (stamina <= maxStamina) {
            stamina = stamina + 0.5;
            road.velocityY = 0;
        }
    }

    if (keyWentUp("LEFT_ARROW") || keyWentUp("d")) {
        player.changeAnimation("playerStill", playerStill);
        if (stamina <= maxStamina) {
            stamina = stamina + 0.5;
            road.velocityY = 0;
        }
    }


    if (stamina <= 21) {
        food.velocityY = 0;
        food2.velocityY = 0;
    }

    if (road.y >= 650) {
        road.y = 600
    }

    if (stamina <= 21) {
        player.changeAnimation("playerStill", playerStill);
        road.velocityY = 0;
    }


    if (food.y >= 1250) {
        food.y = -150;
        food.x = random(0, 400);
    }

    if (food2.y >= 1500) {
        food2.y = -50;
    }

    if (player.isTouching(food)) {
        food.y = random(-1000, -1500)
        stamina = stamina + 20;
        score = score + 1;
    }

    if (player.isTouching(food2)) {
        food2.y = random(-1000, -1500)
        stamina = stamina + 20;
        score2 = score2 + 1;
    }

    

    if(zombieGroup.isTouching(player)){
     stamina = 0;
     gameState = END;
     maxZombies = 0;
     zombieGroup.destroyEach();
    }

    drawSprites();

    textSize(30)
    fill(0, 255, 0)
    text("food collected : " + score,50,90)

    textSize(30)
    fill(0, 255, 0)
    text("water collected : " + score2,50,130)

    textSize(30)
    fill(0, 255, 0)
    text("Stamina : " + stamina, 50, 50)

    }

    if(gameState === END){

    background("#FF0000");    

    play.visible = false;
    player.visible = false;
    food.visible = false;
    food2.visible = false;
    road.visible = false;

    food.velocityY = 0;
    food2.velocityY = 0;
    road.velocityY = 0;

    textSize(20);
    fill("white")
    text("press R to restart",320,600);
    text("you have been caught",310,630);

    if(keyDown("r")){
     gameState = PLAY;
     stamina = 100;
     score= 0;
    }

    }

    

}

function zombies(){
	maxZombies = maxZombies + 1;
		if(maxZombies <= 10){
		zombie = createSprite(random(20,760),1210,50,50);
        var rand = Math.round(random(1,2))
        switch(rand){
        case 1 : zombie.addImage("zombie1img",zombie1Img);
        break;
        case 2 : zombie.addImage("zombie2img",zombie2Img);
        break;
        }
		zombieGroup.add(zombie)
		}

}