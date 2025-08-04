// `
console.log('Welcome to snack game');

//requre root element
let root = document.getElementById("main");


// difine cell size for making grid
let cellSize = 20;
let gameArinaSize = 30;

//making a game aria
let gameArina = (() =>{
    let gameArina = document.createElement("div");
    gameArina.id = "gameArina";
    gameArina.style.height = `${gameArinaSize*cellSize}px`;
    gameArina.style.width = `${gameArinaSize*cellSize}px`;
    return gameArina;
})();
root.appendChild(gameArina);

//crating food item
let food = document.createElement("div");
food.id = "food";
gameArina.appendChild(food);

//importing vice
const eatSound = new Audio('sounds/eat.mp3');
const gameOverSound = new Audio('sounds/gameover.mp3');

//geting image
const img = (() =>{
    const img = new Image();
    img.src = 'https://www.shareicon.net/data/128x128/2016/10/25/847548_cute_512x512.png';
    img.style.height = `${cellSize}px`;
    return img;
})();


//declare sum variables
let snack , x, y, dx, dy, gameId, isGameStart, gamePuse, fx, fy, gameSpeed, currentScore, highScore;
isGameStart = gamePuse = false;
highScore = currentScore = 0;

//adding score bord
const scoreBoard = (()=>{
    const scoreBoard = document.createElement('div');
    scoreBoard.id = "scorebord";
    const hScore = document.createElement('h2'); 
    hScore.innerText = `High Score : ${highScore}`;
    const hr = document.createElement('hr');
    const score = document.createElement('h2');
    score.innerText = `Score : ${currentScore}`;

    scoreBoard.appendChild(hScore);
    scoreBoard.appendChild(hr);
    scoreBoard.appendChild(score);
    return scoreBoard;
})();
root.appendChild(scoreBoard);

//ading start button
const buttons = (() =>{
    const buttons = document.createElement("div");
    buttons.id = "buttons";
    const startButton = document.createElement("button");
    const pauseButton = document.createElement("button");
    buttons.appendChild(startButton);
    startButton.innerText = "Start";
    buttons.appendChild(pauseButton);
    pauseButton.innerText = "Pause";
    return buttons;
})(); 
root.appendChild(buttons);

//restarting the game
function restart(){
    //seting offset values
    if(isGameStart)   clearInterval(gameId);
    isGameStart = false;
    gamePuse = false;

    snack = [{x:20,y:20},{x:40,y:20},{x:60,y:20},{x:80,y:20}];

    x = 80;
    y = 20;
     
    dx = 20;
    dy = 0;

    gameSpeed = 200;

    if(highScore<currentScore)
        highScore = currentScore;

    currentScore =0;
    scoreBoard.childNodes[0].innerText = `High Score : ${highScore}`;
    scoreBoard.childNodes[2].innerText = `Score : ${currentScore}`;
   
    createfood();
    drawSnack();
}

// start game
function start(){
    if(isGameStart && !gamePuse) return;
    isGameStart = true;
    gameId = setInterval(()=>{
        x += dx;
        y += dy;
        // chaking for game over
        if(isGameOver({x,y})){
            gameOverSound.play().then(()=>{
                alert("Game Over");
                restart();
            });  
        }
        snack.push({x,y});
        
        //checking for eat food
        if(!isEatFood({x,y})){
            snack.shift();
        }
        else if(!gamePuse){
            eatSound.play().then(()=>{
                currentScore += 10;
                scoreBoard.childNodes[2].innerText = `Score : ${currentScore}`;
                createfood();
                gameSpeed -= 10;
                puseHandeler();
                puseHandeler();
            });
            
        }  
    
        drawSnack();
    },gameSpeed);
}

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

//Randmising food item
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

    food.style.top = `${fy}px`;
    food.style.left = `${fx}px`;

}

// check for eat food 
function isEatFood(face){
    return (fx==face.x && fy==face.y);
}

//chaecking for game over
function isGameOver(face){
    //chacking for wall
    if(face.x<0||face.y<0||face.y>=(cellSize*gameArinaSize)||face.x>=(cellSize*gameArinaSize))    return true;

    let flage =false;
    //chacking for self body
    snack.forEach((e)=>{
        if(face.x==e.x && face.y==e.y)
            flage = true;
    });
    return flage;
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

//eventlistenr on buttons
document.addEventListener("click", (e)=>{
    if(e.target == buttons.childNodes[0]){
        start();
    }
    else if(isGameStart && e.target == buttons.childNodes[1]){
        puseHandeler();
    }
});

restart();

