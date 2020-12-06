const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "bg.png"
score = 0
function preload() {
        getbackgroundimage()
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)   // condition to check whether the background image has an image loaded in it or not
    background(backgroundImg);

    Engine.update(engine);
    textSize(35)
    fill("white")
    text("score"+score,width - 300,50)
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score()
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score()
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched") // "!==" means "not equal to"
    //{
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){     // keyCode 32 is ASCII code for the space bar
        bird.trajectory = [];  // Empty the trajectory array so that the previous smoke images of the previous path of the bird
        // gets removed from the screen 
        Matter.Body.setPosition(bird.body, {x:200 , y:30}); // setting the position of the bird to the slingshot
       slingshot.attach(bird.body);
    }
}

// synchronous v/s asynchronous functions.
// In synchronous functions, the instructions are executed one line after another without waiting for the previous 
// lines to finish execution. By default, all functions are synchronous.
// An asynchronous function makes the computer wait for the previous line of code to get completely executed before
// the following lines of code can run. Asynchronous functions are denoted as "async" and we write this keyword
// at the beginning of the function.



 async function getbackgroundimage(){
     // The fetch() function performs the API call by getting the information in the link 
     // await tells the computer to wait for the API call to be completed before moving to the next line of code.
    var response = await fetch ("http://worldclockapi.com/api/json/est/now");
    // next, we convert the information received into a JSON data structure, and the json() function helps us do so
    var responseJSON = await response.json();
    console.log(responseJSON)
    var datetime = responseJSON.currentDateTime 
    var hour = datetime.slice(11,13)
    if(hour>=06&hour<=19)   //19:00 hrs = 7pm
    {
        bg = "bg.png"   // use the daytime background image
    }
    else{
        bg = "bg2.jpg"  // use the night background image
    }
    backgroundImg = loadImage(bg)
}

/*
Types of errors:
1. Typos - spelling errors while referring to variables or function names
2. Incorrect use of functions - using functions in a way that wasn't intended
3. Using variables outside their scope.

How to debug:

1. Comment certain sections of the code and see if the rest of it works correctly, and then narrow it down to the lines causing the 
error.

2. Printing the values of variables that you have a doubt about into the console using console.log().

3. Printing messages into the console through a function or while using conditions

You can use any of these or combine all three tips.

Tips:
1) Always give proper names to variables, functions, objects and avoid giving same names to all of them to avoid confusion.
2) Always write comments to explain what the code does, so that you can remember when you read it later. 


*/