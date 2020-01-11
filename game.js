var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");
var paddleAudio = new Audio();
paddleAudio.src = "paddle.mp3";


var gamendAudio = new Audio();
gamendAudio.src = "gamend.mp3";


var score = 1;


//CREATE BRICKS
var brick1 = {x:0,y:0,w: 70,h:20};
var brick2 = {x:75,y:0,w: 70,h:20};
var brick3 = {x:150,y:0,w: 70,h:20};
var brick4 = {x:225,y:0,w: 70,h:20};
var brick5 = {x:300,y:0,w: 70,h:20};
var brick6 = {x:375,y:0,w: 70,h:20};
var brick7 = {x:450,y:0,w: 70,h:20};
var brick8 = {x:525,y:0,w: 70,h:20};

// draw bricks
function brickDraw(){
    ctx.fillStyle="#000f87";
  ctx.fillRect(brick1.x, brick1.y, brick1.w, brick1.h); 
  ctx.fillRect(brick2.x, brick2.y, brick2.w, brick2.h); 
  ctx.fillRect(brick3.x, brick3.y, brick3.w, brick3.h); 
  ctx.fillRect(brick4.x, brick4.y, brick4.w, brick4.h);  
  ctx.fillRect(brick5.x, brick5.y, brick5.w, brick5.h); 
  ctx.fillRect(brick6.x, brick6.y, brick6.w, brick6.h); 
  ctx.fillRect(brick7.x, brick7.y, brick7.w, brick7.h); 
  ctx.fillRect(brick8.x, brick8.y, brick8.w, brick8.h); 
}

//drwa the peddle.
var peddle= {
        X: 200,
        Y:390,
        Width: 20,
        Height: 10,
    };

function peddLing() {
    // poping the Peddle. // fillRect()fills the rect created.
    ctx.beginPath();
    ctx.fillRect(peddle.X, peddle.Y, peddle.Width, peddle.Height);
}


// drawing the pong
var pongX=80;
var pongY=20;
var pongRadius=10;

function drawPong(){
    //popPong.  the arc()draws a circular thingys.
    //0-2*pi=fullcircle
    ctx.beginPath();
    ctx.arc(pongX, pongY, pongRadius,0,Math.PI*2,true);
    ctx.fill(); 
}

//MOVING
var pingPongX= -7
var pingPongY=-5;
 
function movePong(){
    
   
//stop disappearance of dez pong
    if(  pongX<0 || pongX>canvas.width) pingPongX=-pingPongX;
    if(  pongY<0 ) pingPongY=-pingPongY;
    if (pongY>canvas.height) {
          


        cancelAnimationFrame(gameLoop)
        alert("Game Over!")
     
    }

   pongX+=pingPongX;
    pongY+=pingPongY;

}

function update() {
    //clearRect, clears the whole canvas aka de snake :)
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height)
    peddLing()
    drawPong()
    paddleHit()
    brickDraw()

    gameLoop = requestAnimationFrame(update)
    movePong()
    brickHit(brick1)
    brickHit(brick2)
    brickHit(brick3)
    brickHit(brick4)
    brickHit(brick5)
    brickHit(brick6)
    brickHit(brick7)
    brickHit(brick8)
}


// *******************************
//  control the paddle with mouse
//*****************************
canvas.addEventListener("mousemove", function move(event) {
    peddle.X = event.clientX - canvas.offsetLeft-peddle.Width/2;
});

// ************************
//  paddle collision test
//**********************
function paddleHit() {
    // all these variables are just to make the if statement easier to understand
    var ballBottom = pongY + pongRadius*2;
    var ballCenterX = pongX + pongRadius;
    var paddleTop = peddle.Y;
    var paddleCenterX = peddle.X + peddle.Width/2;
    var centerDistance = Math.abs(ballCenterX - paddleCenterX); // might be negative. Math.abs() will fix that
    var touchDistance = pongRadius + peddle.Width/2;

//if (pongY > 350) debugger;
    if (ballBottom >= paddleTop && centerDistance <= touchDistance) { 
        // collision detected!

        pongY = peddle.Y - pongRadius*2; // rescue ball that hit paddle on the side. put it back on top of paddle
        pingPongY=-pingPongY;
        paddleAudio.play();

    }
}
// To understand my collision test, play around with this codepen: http://codepen.io/jkohlin/pen/RpzWXv?editors=1010

// *****************************
//  This function assumes you have a ball object called 'ball'.
//  It also assumes you call this function by passing in a 'brick object' to test collision with
//*****************************
function brickHit(brick) {
    var ballCenterX = pongX + pongRadius;
    var ballCenterY = pongY + pongRadius;
    var brickCenterX = brick.x + brick.w/2;
    var brickCenterY = brick.y + brick.h/2;
    var touchDistanceX = pongRadius;+ brick.w/2; // if center of ball and center of brick is closer than this, its a collision
    var touchDistanceY = pongRadius*2; + brick.h/2;
    var centerDistanceX = Math.abs(ballCenterX - brickCenterX); // Math.abs() returns an absolute number i.e. negative numbers become positive
    var centerDistanceY = Math.abs(ballCenterY - brickCenterY);

    if (centerDistanceX <= touchDistanceX && centerDistanceY <= touchDistanceY){

//If the ball collides with a brick,remove brick.
//paddle.mp3 should be played

        brick.y = -100
         gamendAudio.play();
       


document.getElementById("scores").innerHTML= "Score: " + score;
  if( brick.y == -100){score++}
  
  
                
             
 //score variable should be incremented
//Add text to canvas showing the current score.


         
        if (centerDistanceY < centerDistanceX) { // vertical hit. Bounce left or right.
           pingPongX=-pingPongX;
        }
        if (centerDistanceX < centerDistanceY ) {// horizontal hit. Bounce up or down.
            pingPongY=-pingPongY;
        }
        if (centerDistanceX === centerDistanceY) { //hitting a corner
            
            pingPongY=-pingPongY;
            pingPongX=-pingPongX;

   

                
                        
        }

   if(score>8){


 pongRadius=-100;

  ctx.clearRect(brick1.x, brick1.y, brick1.w, brick1.h); 
  ctx.clearRect(brick2.x, brick2.y, brick2.w, brick2.h); 
  ctx.clearRect(brick3.x, brick3.y, brick3.w, brick3.h); 
  ctx.clearRect(brick4.x, brick4.y, brick4.w, brick4.h);  
  ctx.clearRect(brick5.x, brick5.y, brick5.w, brick5.h); 
  ctx.clearRect(brick6.x, brick6.y, brick6.w, brick6.h); 
  ctx.clearRect(brick7.x, brick7.y, brick7.w, brick7.h); 
  ctx.clearRect(brick8.x, brick8.y, brick8.w, brick8.h); 
  { 
    alert("You won!")
   }
   }
    
    
    }
}

update();


//shortcuts
//ctrl+d+ click

