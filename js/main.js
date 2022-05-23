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
    return allCells
  }
}

const board = new GameBoard(10, 10);


class Snake {
    constructor() {
      this.snakePosition = [board.allCells[44], board.allCells[45]];
    }
  
    draw() {
        this.snakePosition.forEach((cell) => {
            cell.classList.add("snake")
        })
    }
  
  //   move(direction) {
  
  //   }
  }
  
  const snake = new Snake()
  snake.draw()
  
  
  document.addEventListener("keydown", (e) => {
      console.log("yo")
    switch (e.code) {
      case "arrowLeft":
        snake.move("left");
        break;
      case "arrowRight":
        snake.move("right");
        break;
      case "arrowUp":
        snake.move("up");
        break;
        case "arrowDown":
        snake.move("down")
        break
    }
  });
  
//   // Set a direction
//   // Snake should not able able to go right or left if the direction is right or left
//   // Snake expension
//   // 

