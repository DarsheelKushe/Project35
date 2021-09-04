var balloon,balloonImage;
var database;
var height;

function preload(){
   bg =loadImage("Images/city.png");
   balloonImage=loadAnimation("Images/1.png","Images/2.png","Images/3.png");
  }

//Function to set initial environment
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-3,0);
    // balloon.addAnimation("hotAirBalloon",balloonImage);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(3,0);
    // balloon.addAnimation("hotAirBalloon",balloonImage);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-3);
    // balloon.addAnimation("hotAirBalloon",balloonImage);
    // balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+3);
    // balloon.addAnimation("hotAirBalloon",balloonImage);
    // balloon.scale=balloon.scale+0.005;
  }


  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

 function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x':  balloon.x+x ,
     'y':  balloon.y+y
   })
 }


//CHOOSE THE CORRECT READHEIGHT FUNCTION
// function readHeight(data){
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;

  console.log("X :"+ balloon.x);
  console.log("Y :"+ balloon.y);
}



// function readHeight(data){
//   height = data.val();
// }

// function readHeight(){
//   height = val();
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function showError(){
  console.log("Error in writing to the database");
}