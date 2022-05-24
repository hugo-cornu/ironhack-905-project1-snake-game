const gridContainer = document.querySelector(".grid");
let gameOver = false;

// //FUNCTION START THE GAME

class GameBoard {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.container = gridContainer;
    this.allCells = this.generateCells();
  }

  // Generate all the cells
  generateCells() {
    const gridSize = this.width * this.height;
    const allCells = [];

    for (let i = 0; i < gridSize; i++) {
      const oneCell = document.createElement("div");

      oneCell.classList.add("cell");
      oneCell.dataset.index = i;
      oneCell.textContent = i; // remove later

      gridContainer.appendChild(oneCell);

      allCells.push(oneCell);
    }
    return allCells;
  }
}

const board = new GameBoard(10, 10);

class Snake {
  constructor() {
    this.snakePositions = [55, 56, 57];
    this.snakeHeadPosition = this.snakePositions.slice(-1)[0];
    this.direction = "right";
  }

  drawSnake() {
    this.snakePositions.forEach((index) => {
      board.allCells[index].classList.add("snake");
    });
  }

  hideLastPosition() {
    board.allCells[this.snakePositions[0]].classList.remove("snake");
    this.snakePositions.shift();
  }

  move() {
    console.log(this.direction);
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
  }
}

const snake = new Snake();
// snake.drawSnake() -> When start the game it needs to appears.

const intervalId = setInterval(() => {
  snake.move();
}, 1000);

function CheckForGameOver() {
  if (
    (snake.direction === "up" && snake.snakeHeadPosition < 0) || // snake reached the top of the grid
    2 || // snake reaches the right side of the grid
    3 || // snake reaches the left side of the grid
    (snake.direction === "down" && snake.snakeHeadPosition > board.gridSize)
  ) {
    gameOver = true;
  } // snake reached the bottom of the grid
}

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

// if (currentPosition % gridWidth === gridWidth - 1) {
//     break}

//   // Set a direction
//   // Snake should not able able to go right or left if the direction is right or left
//
//   // Snake expension

// FOR TOMORROW
// 1. Make the snake move alone
// 2. Get the food position randomly
// 3. When the snake eats the food -> Expend + 1 && recall the random function
// 4. Set a un score and increment it when the food is eaten.

// 11:00 -> https://www.youtube.com/watch?v=rui2tRRVtc0 ALL CONDITIONS
// https://www.youtube.com/watch?v=TAmYp4jKWoM
// https://www.youtube.com/watch?v=QTcIXok9wNY
