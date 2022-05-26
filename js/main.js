// SELECTORS – WELCOME PAGE
const startScreen = document.querySelector(".start-screen");
const startButton = document.querySelector("#start-btn");

// SELECTORS – GAME PAGE
const gameScreen = document.querySelector("main");
const gridContainer = document.querySelector(".grid");
const yourScore = document.querySelector("#your-score-number");

// SELECTORS – GAME OVER PAGE
const gameOverScreen = document.querySelector(".game-over-screen");
const scoreGameOver = document.querySelector(".game-over-screen h2");
const restartButton = document.querySelector("#restart-btn");

// SELECTORS – AUDIO
const soundButton = document.querySelector("#sound-btn");

const audioWelcomePage = document.querySelector("#audio-welcome");
audioWelcomePage.volume = 0.35;

const audioPoint = document.querySelector("#audio-point");
audioPoint.volume = 0.1;

const gameOverSound = document.querySelector("#audio-game-over");
gameOverSound.volume = 0.2;

// INITIAL VALUES FOR THE GAME
let score = 0;
let board = null; //new GameBoard(20, 20);
let food = null; //new Food();
let snake = null; //new Snake();
// snake.drawSnake();

// ---------------------------- GAMEBOARD CLASS ------------------------------------ //

class GameBoard {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.container = gridContainer;
    this.allCells = this.generateCells();
  }

  generateCells() {
    const gridSize = this.width * this.height;
    const allCells = [];

    for (let i = 0; i < gridSize; i++) {
      const oneCell = document.createElement("div");

      oneCell.classList.add("cell");
      oneCell.dataset.index = i;

      gridContainer.appendChild(oneCell);

      allCells.push(oneCell);
    }
    return allCells;
  }

  startGame() {
    gameScreen.classList.remove("hidden");
    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    score = 0;
    yourScore.textContent = "0";

    audioWelcomePage.play();

    this.intervalId = setInterval(() => {
      snake.move();
    }, 100);
  }

  // BAD PRACTICE TO SETUP STYLE WITH HTML -> SHOULD BE WITH CLASS.
  endGame() {
    // gameScreen.style.visibility = "hidden";
    gameScreen.classList.add("hidden");
    // startScreen.style.visibility = "hidden";
    // gameOverScreen.style.visibility = "visible";
    gameOverScreen.classList.remove("hidden");
    if (score < 5) {
      scoreGameOver.textContent = `LOL. YOUR SCORE IS ${score}`;
    } else if (score < 15) {
      scoreGameOver.textContent = `COULD DO BETTER. YOUR SCORE IS ${score}`;
    } else if (score > 15) {
      scoreGameOver.textContent = `GOOD JOB! YOUR SCORE IS ${score}`;
    }
    clearInterval(this.intervalId);
  }

  incrementLiveScore() {
    yourScore.textContent = score;
  }
}

// ---------------------------- SNAKE CLASS ------------------------------------ //

class Snake {
  constructor() {
    this.snakePositions = [201, 202, 203];
    this.snakeHeadPosition = this.snakePositions.slice(-1)[0];
    this.tailPosition = this.snakePositions[0];
    this.direction = "right";
  }

  getSnakeWithoutHead() {
    return this.snakePositions.slice(0, -1);
  }

  drawSnake() {
    this.snakePositions.forEach((index, indexInSnakePosition) => {
      if (indexInSnakePosition === this.snakePositions.length - 1) {
        board.allCells[index]?.classList.add("snake-head");
      } else {
        board.allCells[index]?.classList.remove("snake-head");
        board.allCells[index]?.classList.add("snake");
      }
    });
    this.snakePositions.forEach((div, i) => board.allCells[div].classList);
  }

  hideLastPosition() {
    board.allCells[this.snakePositions[0]].classList.remove("snake");
    this.snakePositions.shift();
  }

  move() {
    checkForGameOver();
    if (this.direction === "right") {
      this.snakeHeadPosition += 1;
      this.snakePositions.push(this.snakeHeadPosition);
      this.drawSnake();
      this.hideLastPosition();
    } else if (this.direction === "left") {
      this.snakeHeadPosition -= 1;
      this.snakePositions.push(this.snakeHeadPosition);
      this.drawSnake();
      this.hideLastPosition();
    } else if (this.direction === "up") {
      this.snakeHeadPosition -= board.width;
      this.snakePositions.push(this.snakeHeadPosition);
      this.drawSnake();
      this.hideLastPosition();
    } else if (this.direction === "down") {
      this.snakeHeadPosition += board.width;
      this.snakePositions.push(this.snakeHeadPosition);
      this.drawSnake();
      this.hideLastPosition();
    }
    this.checkForFood();
  }

  checkForFood() {
    if (this.snakeHeadPosition === Number(food.position.dataset.index)) {
      audioPoint.play();
      food.hide();
      food.generateNew();
      score += 1;
      board.incrementLiveScore();
      this.snakePositions.unshift(this.tailPosition);
    }
  }
}

// ---------------------------- FOOD CLASS ------------------------------------ //

class Food {
  constructor() {
    this.position = null;
    this.generateNew();
  }

  foodRandomPosition() {
    const unoccupiedCells = board.allCells.filter((cell) => {
      return !cell.classList.contains("snake");
    });

    return unoccupiedCells[Math.floor(Math.random() * unoccupiedCells.length)];
  }

  draw() {
    this.position.classList.add("food");
  }

  hide() {
    this.position.classList.remove("food");
    // board.allCells[this.position].classList.remove("food");
  }

  generateNew() {
    this.position = this.foodRandomPosition();
    this.draw();
  }
}

// food.draw(); // Should be called when the game starts

// ----------------------------            ------------------------------------ //

function checkForGameOver() {
  // Check when the snake reach the border
  const isUp =
    snake.direction === "up" && snake.snakeHeadPosition - board.width < 0;
  const isDown =
    snake.direction === "down" &&
    snake.snakeHeadPosition + board.width > board.width * board.height;
  const isRight =
    snake.direction === "right" &&
    (snake.snakeHeadPosition + 1) % board.width === 0;
  const isLeft =
    snake.direction === "left" && snake.snakeHeadPosition % board.width === 0;

  if (
    isUp || // snake reached the top of the grid
    isRight || // snake reaches the right side of the grid
    isLeft || // snake reaches the left side of the grid
    isDown // snake reached the bottom of the grid
  ) {
    board.endGame();
    audioWelcomePage.pause();
    gameOverSound.play();

    return;
  }

  // Check if the snake reach its tail
  if (
    snake.getSnakeWithoutHead().find((cell) => {
      return cell === snake.snakeHeadPosition;
    })
  ) {
    board.endGame();
    return;
  }
}

function startTheGame() {
  gridContainer.innerHTML = "";
  board = new GameBoard(15, 15);
  food = new Food();
  snake = new Snake();
  snake.drawSnake();
  board.startGame();
}

// ---------------------------- EVENTS LISTENER ------------------------------------ //

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      if (snake.direction === "left" || snake.direction === "right") break;
      snake.direction = "left";
      break;
    case "ArrowRight":
      if (snake.direction === "left" || snake.direction === "right") break;
      snake.direction = "right";
      break;
    case "ArrowUp":
      if (snake.direction === "up" || snake.direction === "down") break;
      snake.direction = "up";
      break;
    case "ArrowDown":
      if (snake.direction === "up" || snake.direction === "down") break;
      snake.direction = "down";
      break;
    default:
      snake.direction = "left";
  }
});

// START THE GAME
startButton.addEventListener("click", startTheGame);

// RESTART THE GAME
restartButton.addEventListener("click", startTheGame);

// SOUND ON
window.addEventListener("load", () => {
  audioWelcomePage.play();
});

// SOUND OFF
soundButton.addEventListener("click", () => {
  audioWelcomePage.pause();
});

// 11:00 -> https://www.youtube.com/watch?v=rui2tRRVtc0 ALL CONDITIONS
// https://www.youtube.com/watch?v=TAmYp4jKWoM
// https://www.youtube.com/watch?v=QTcIXok9wNY
