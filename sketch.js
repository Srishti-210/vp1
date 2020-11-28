//Create variables here
var db;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;
var milk,milkimg;
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  dogImage1 = loadImage("images/dogImg1.png");
  milkimg=loadImage("milk.jpg");
  //foodImage = loadImage("images/Bone.png");
}

function setup() {
  createCanvas(500, 500);

  //Sprites

  //food = createSprite(250,400,50,50);
  //food.addImage(foodImage);
 // food.scale = 0.3;

  milk= createSprite(180,320,10,10);
  milk.addImage(milkimg);
  milk.scale=0.12

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  //Firebase
  db = firebase.database();

  //Reference for food
  foodRef = db.ref("Food");
  foodRef.on("value",read,console.log("error"));

  foodRef.set(20);


}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  
  //add styles here
  textSize(27);
  strokeWeight(3);
  stroke(color((0,255),(0,255),(0,255)));
  fill("black");
  text("Bowls of milk left: "+foodStock,50,400);
  textSize(18);
  text("Press the 'Up Arrow' key to feed Brownie",50,70)
  decreaseFood();
  if(foodStock===0){
    foodStock = 20;
  }
}

function read(data){
  foodStock = data.val();
}

function decreaseFood(){
  if(keyWentDown(UP_ARROW)){
  foodRef = db.ref("Food");
  foodStock = foodStock - 1;
  foodRef.set(foodStock);
  dog.addImage(dogImage1);
  

 // food.x = 350;
  //food.y = 200;
  //food.scale = 0.1;

  }
  if(keyWentUp(UP_ARROW)){
    foodStock = foodStock;
    dog.addImage(dogImage);
    //food.x = 250;
    //food.y = 400;
    //food.scale = 0.2;
  }
}



