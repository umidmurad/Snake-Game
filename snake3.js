var canvas, ctx;
var gameInProgress = true;
var gameInterval;

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  var x = 20; //speed has increased
  gameInterval = setInterval(draw, 1000 / x);
};
// movements of snake, up, bot, right,left arrow keys
function keyDownEvent(e) {
  if (!gameInProgress) {
    return; // Ignore keydown events when the game is over
  }

  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
}

// snake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);

// game world
var gridSize = (tileSize = 20); // 20 x 20 = 400

var nextX = (nextY = 0);

// apple
var appleX = (appleY = 15);

// draw
function draw() {
  // move snake in next pos
  if (gameInProgress) {
    snakeX += nextX;
    snakeY += nextY;
  }

  // snake over game world?
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX > gridSize - 1 ||
    snakeY > gridSize - 1
  ) {
    gameInProgress = false;
    clearInterval(gameInterval);
    document.getElementById("p5").style.visibility = "visible";
    document.getElementById("p6").style.visibility = "visible";
  }

  //snake bite apple?
  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;

    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }

  //paint background
  ctx.fillStyle = "lightgray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // paint snake
  ctx.fillStyle = "red";
  for (var i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );

    //snake bites it's tail?
    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      tailSize = defaultTailSize;
    }
  }

  // paint apple
  ctx.fillStyle = "green";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  //set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
  //if tail size reachs to 8, automatic win, skipping to next level.
  if (tailSize == 13) {
    document.getElementById("p4").style.visibility = "visible";
    gameInProgress = false;
    return;
  }
}
