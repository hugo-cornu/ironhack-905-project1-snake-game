const gridContainer = document.querySelector(".grid");

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
    this.initialPosition = 55;
  }

  drawSnake() {
    board.allCells[this.initialPosition].classList.add("snake");
  }

  hideLastPosition() {
      
  }

  move(direction) {
    if (direction === "right") {
      this.initialPosition += 1;
      this.drawSnake();
    } else if (direction === "left") {
      this.initialPosition -= 1;
      this.drawSnake();
    } else if (direction === "up") {
      this.initialPosition -= board.width;
      this.drawSnake();
    } else if (direction === "down") {
      this.initialPosition += board.width;
      this.drawSnake();
    }
  }
}

const snake = new Snake();
snake.drawSnake();

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      console.log("left");
      snake.move("left");
      break;
    case "ArrowRight":
      snake.move("right");
      break;
    case "ArrowUp":
      snake.move("up");
      break;
    case "ArrowDown":
      snake.move("down");
      break;
  }
});

//   // Set a direction
//   // Snake should not able able to go right or left if the direction is right or left
//   // Snake expension
