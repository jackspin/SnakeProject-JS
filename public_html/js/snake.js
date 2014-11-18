var snake;
var snakeDirection;


var food;

var context;
var screenWidth;
var screenHeight;

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000 / 10);

//gameInitialize starting the screen

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    document.addEventListener("keydown", keyboardHandler);
}
// the function looping the game allowing the snake to move
function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}
//draws the game
function gameDraw() {
    context.fillStyle = "rgb(180, 250, 213)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}
// draws starts snake
function snakeInitialize() {
    snake = [];
    snakeLength = 100;
    snakeSize = 20;
    snakeDirection = "down";


    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0

        });
    }
}
//draws snake
function snakeDraw() {
    console.log("snakedraw");
    for (var index = 0; index < snake.length; index++) {
        context.fillStyle = "white";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}
//starts food
function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}
// sets food on map
function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    food.x = randomX;
    food.y = randomY;
}
//starts keyboard controls for WASD
function keyboardHandler(event) {
    console.log(event);

    if (event.keyCode == "87" && snakeDirection != "down") {
        snakeDirection = "up";
    }
    if (event.keyCode == "83" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    if (event.keyCode == "65" && snakeDirection != "right") {
        snakeDirection = "left";
    }
    if (event.keyCode == "68" && snakeDirection != "left") {
        snakeDirection = "right";
    }

}
//*******KEYCODES FOR WASD*******
//W = 87
//A = 65
//S = 83
//D = 68


//draws yummy square food
function foodDraw() {
    context.fillStyle = "white";
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}

//makes snake move in disired direction
function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if (snakeDirection === "down") {
        snakeHeadY++;
    }
    else if (snakeDirection === "right") {
        snakeHeadX++;
    }
    else if (snakeDirection === "up") {
        snakeHeadY--;
    }
    else if (snakeDirection === "left") {
        snakeHeadX--;
    }

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}
