var database;
var dog1, dog2;
var dog;
var fd;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload() {
  dog1 = loadImage("images/dogImg.png")
  dog2 = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  foodObj = new Food()
  database = firebase.database()
  dog = createSprite(250, 300, 150, 150)
  dog.scale = 0.15
  dog.addImage(dog1)
  var foodref = database.ref("Food")
  foodref.on("value", function (data) {
    fd = data.val()
    foodObj.updateFoodStock(fd)
  })
  feed = createButton("FeedTheDog")
  feed.position(700, 95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800, 95)
  addFood.mousePressed(addFoodfn)
}
function draw() {
  background("green")
  foodObj.display()
  drawSprites();
  text("Food remaing:" + fd, 170, 200)
  fedTime = database.ref("FeedTime")
  fedTime.on("value", function (data) {
    lastFed = data.val()
  })
  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }
}
function feedDog() {
  dog2.addImage("dogImg1.png")

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}
// function addFood (fd not FoodS)
function addFoodfn() {
  fd++
  database.ref("/").update({ Food: fd })

}




