// `
console.log('Welcome to snack game');

//requre root element
let root = document.getElementById("main");


// difine cell size for making grid
let cellSize = 20;

//making a game aria
let gameArinaSize = 20;

let gameArina = document.createElement("div");
gameArina.id = "gameArina";
gameArina.style.height = `${gameArinaSize*cellSize}px`;
gameArina.style.width = `${gameArinaSize*cellSize}px`;
root.appendChild(gameArina);

//declare sum variables
let snack , x, y, dx, dy, gameTd, isGameStart, gamePuse, fx, fy, gameSpeed;
isGameStart = false;
gamePuse = false;

//geting image
const img = new Image();
img.src = 'https://www.shareicon.net/data/128x128/2016/10/25/847548_cute_512x512.png';
img.style.height = `${cellSize}px`;

//crating food item
let food = document.createElement("div");
food.id = "food";
gameArina.appendChild(food);

//Drawing snack
function drawSnack(){
    gameArina.innerHTML = "";
    gameArina.appendChild(food);
    snack.forEach(e => {
        let snackCell = document.createElement("div");
        snackCell.className = "snackCell";
        snackCell.style.left = `${e.x}px`;
        snackCell.style.top = `${e.y}px`;
        snackCell.style.height = `${cellSize}px`;
        snackCell.style.width = `${cellSize}px`;
        snackCell.appendChild(img);
        gameArina.appendChild(snackCell);
    });
}

//Creating a food item
function createfood(){
    let flage = true;
    //chack food shod not over the snack
    while(flage){
        fx = (Math.floor(Math.random() * (gameArinaSize-1))+1)*cellSize;
        fy = (Math.floor(Math.random() * (gameArinaSize -1))+1)*cellSize;
        flage = false;
        snack.forEach((e)=>{
            if(fx==e.x && fy==e.y)
                flage = true;
        });
    }
    console.log({fx,fy});
    food.style.top = `${fy}px`;
    food.style.left = `${fx}px`;

}

// check eat food 
function isEatFood(face){
    return (fx==face.x && fy==face.y);
}

//restarting the game
function restart(){
    //seting offset values
    if(isGameStart)   clearInterval(gameId);
    isGameStart = false;

    snack = [{x:20,y:20},{x:40,y:20},{x:60,y:20},{x:80,y:20}];

    x = 80;
    y = 20;
     
    dx = 20;
    dy = 0;

    gameSpeed = 200;

    createfood();
    drawSnack();
}

//chaecking for game over
function isGameOver(face){
    //chacking for wall
    if(face.x<0||face.y<0||face.y>=(cellSize*gameArinaSize)||face.x>=(cellSize*gameArinaSize))    restart();

    //chacking for self body
    snack.forEach((e)=>{
        if(face.x==e.x && face.y==e.y)
            restart();
    });
}

//pose the game
function puseHandeler(){
    if(gamePuse) {
        start();
        gamePuse = false;
    }
    else{
        clearInterval(gameId);
        gamePuse = true;
    }
}

// start game
function start(){
    if(isGameStart && !gamePuse) return;
    isGameStart = true;
    gameId = setInterval(()=>{
        x += dx;
        y += dy;
        // chaking for game over
        if(isGameOver({x,y}))    restart();
        snack.push({x,y});
        
        //checking for eat food
        if(!isEatFood({x,y})) 
            snack.shift();
        else if(!gamePuse){
            createfood();
            gameSpeed -= 10;
            puseHandeler();
            puseHandeler();
        }  
            


        drawSnack();
    },gameSpeed);
}

//snack control
document.addEventListener("keydown",(event)=>{
    if(!isGameStart && event.key == "Enter"){
        start();
    }
    else if(isGameStart){
        if(event.code == "Space"){
            puseHandeler();
        }
        else if(!gamePuse){
            if(dy==0 && event.key == "ArrowDown"){
                dy = 20;
                dx = 0;
            }
            else if(dy==0 && event.key == "ArrowUp"){
                dy = -20;
                dx = 0;
            }
            else if(dx==0 && event.key == "ArrowLeft"){
                dx = -20;
                dy = 0;
            }
            else if(dx==0 && event.key == "ArrowRight"){
                dx = 20;
                dy = 0;
            }
        }
      
    }
    
});

restart();

// start();

