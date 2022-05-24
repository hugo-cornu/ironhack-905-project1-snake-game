const gridContainer = document.querySelector(".grid");
let gameOver = false;
let score = 0;

// //FUNCTION START THE GAME

// ---------------------------- GAMEBOARD CLASS ------------------------------------ //

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

// ---------------------------- SNAKE CLASS ------------------------------------ //

class Snake {
  constructor() {
    this.snakePositions = [51, 52, 53];
    this.snakeHeadPosition = this.snakePositions.slice(-1)[0];
    this.tailPosition = this.snakePositions[0];
    this.direction = "right";
  }

  getSnakeWithoutHead() {
    console.log("yo,", this.snakePositions.slice(0, -1));
    return this.snakePositions.slice(0, -1);
  }

  drawSnake() {
    this.snakePositions.forEach((index) => {
      board.allCells[index]?.classList.add("snake");
    });
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
    if (this.snakeHeadPosition === food.position) {
      food.hide();
      food.generateNew();
      score += 1;
      this.snakePositions.unshift(this.tailPosition);
    }
  }
}

const snake = new Snake();
// snake.drawSnake() -> When start the game it needs to appears.

// ---------------------------- FOOD CLASS ------------------------------------ //

class Food {
  constructor() {
    this.position = null;
    this.generateNew();
  }

  foodRandomPosition() {
    const unoccupiedCells = board.allCells.filter((cell) => {
        return !cell.classList.contains("snake")
    })
    // const unoccupiedCells = board.allCells.filter((cell) => {
    //     return !snake.snakePositions.includes(cell)
    // })
    console.log(unoccupiedCells)
    return unoccupiedCells[Math.floor(Math.random() * unoccupiedCells.length)];
    // return Math.floor(Math.random() * board.allCells.length);
  }

  draw() {
    board.allCells[this.position].classList.add("food");
  }

  hide() {
    board.allCells[this.position].classList.remove("food");
  }

  generateNew() {
    this.position = this.foodRandomPosition();
    this.draw();
  }
}

const food = new Food();
food.draw(); // Should be called when the game starts

// ----------------------------            ------------------------------------ //

const intervalId = setInterval(() => {
  snake.move();
}, 200);

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
    gridContainer.classList.add("hide");
    return clearInterval(intervalId);
  }

  // Check if the snake reach its tail
  if (
    snake.getSnakeWithoutHead().find((cell) => {
      return cell === snake.snakeHeadPosition;
    })
  ) {
    gridContainer.classList.add("hide");
    return clearInterval(intervalId);
  }
}

// snake.getSnakeWithoutHead().forEach((index) => {
//   return board.allCells[index].classList.contains("snake");
// })

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

// TO-DO
// 2.a - Get the food position randomly outside SnakeArray

// OPITMISATIONS
// Clean the code (snake.snakePositon for example)

// 11:00 -> https://www.youtube.com/watch?v=rui2tRRVtc0 ALL CONDITIONS
// https://www.youtube.com/watch?v=TAmYp4jKWoM
// https://www.youtube.com/watch?v=QTcIXok9wNY
