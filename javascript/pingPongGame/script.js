//  `

console.log("wellcome to my ping pong game");

let table = document.getElementById("table");
let boll = document.getElementById("boll");
let padel = document.getElementById("padel");

//game details
var startGame = false;
var gameId = 0;
var bestScore = 0;
var currentScore = 0;

// Boll position
var bollx = padel.offsetWidth/2 - boll.offsetWidth/2;
var bolly = padel.offsetTop - padel.offsetHeight;

var dx  = 1;
var dy = 3;

boll.style.left = `${bollx}px`;
boll.style.top = `${bolly}px`;

//padell movment
var padelx = 0;
var pdx = 50;


//restart the Game
function restart(){
    if(startGame===false)   return;
    startGame = false;
    clearInterval(gameId);
    // Boll position
    bollx = padel.offsetWidth/2 - boll.offsetWidth/2;
    bolly = padel.offsetTop - padel.offsetHeight;

    dx  = 2;
    dy = 2;

    boll.style.left = `${bollx}px`;
    boll.style.top = `${bolly}px`;

    //padell movment
    padelx = 0;
    pdx = 20;
    padel.style.left = `${padelx}px`;

}

//staraing game
function start (){
    if(startGame)   return;
    startGame = true;
    let count = 0;
    gameId =  setInterval(()=>{
        //moveing boll
        bolly += dy;
        bollx += dx;
        boll.style.left = `${bollx}px`;
        boll.style.top = `${bolly}px`;

        //priventing boll not go out side table
        if(bolly>(table.offsetHeight-boll.offsetWidth-10)||bolly<0)
            dy *= -1;
        if(bollx>(table.offsetWidth-boll.offsetWidth-10)||bollx<0)
            dx *= -1;

        //cheking boll hit padel or not
        if(bolly>=(padel.offsetTop-boll.offsetWidth)&&(bollx>=padel.offsetLeft&&bollx<=padel.offsetLeft+padel.offsetWidth-boll.offsetWidth)){
            if(bolly>(padel.offsetTop-boll.offsetWidth)||bolly<0)
                dy *= -1;
        }
        if(bolly>=padel.offsetTop)
            restart();
    },1);
}

table.addEventListener("click",start);

document.addEventListener("keydown",(event)=>{
    
    if (event.key === "Enter") start();
    else if(startGame){
        if (event.key === "ArrowLeft") {
            padelx -= pdx; 
        } else if (event.key === "ArrowRight") {
            padelx += pdx; 
        }
    }

    //preventin padel not move out side table
    if(padelx<0)    padelx = 0;
    if(padelx>(table.offsetWidth-padel.offsetWidth)) padelx = (table.offsetWidth-padel.offsetWidth-10);
    padel.style.left = `${padelx}px`;

});


