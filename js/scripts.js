//business logic
// function Player(name) {
//   // name is "X" or "O"?
//   this.name = name;
//   // this.playerSymbol = 
// }

function Space(x, y) {
  this.x = x;
  this.y = y;
  this.symbol = null;
}
Space.prototype.mark = function(symbol) {
  this.symbol = symbol;
}
Space.prototype.markedBy = function() {
  return this.symbol;
}
//  ?? just use the symbol property

function Board() {
  //array or r
  this.board = [];
}
Board.prototype.build = function() {
  for(let i = 0; i < 3; i++) {
    //build a row
    let temp = [];
    for(let j = 0; j < 3; j++) {
      const space = new Space(i,j);
      temp.push(space);
    }
    //push the row onto the array
    this.board.push(temp);
  }
}

Board.prototype.findSpace = function(x, y) {
  //nested forLoops - test if it matches
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      console.log(this.board)
      console.log(this.board[i][j])
      if (i == x && j == y) {

        console.log("match!")
        return this.board[i][j];
      }
    }
  }
}

function Game() {
  this.turnCounter = 0;
  this.history = [];

}
Game.prototype.writeHistory = function(board) {
  //A history item could have:  board state, turnCounter (this could be the index of the array)
  //call it in the click handler
  // if(this.history[this.turnCounter]) {
  //   this.history[this.turnCounter] = board;

  // } else {
  // }
  this.history.push(board);
  console.log(this.history);
}
//this could enable an undo button and turn selector 
//call it in the dropdown form submit button
Game.prototype.goBackInHistory = function(turnNumber, boardObject) {
  //modify the history array
  const newHistory = this.history.slice(0,turnNumber + 1);
  this.history = newHistory;
  //update turn counter
  this.turnCounter = turnNumber;
  //update board state - does this get the old versions of the spaces for the board?
  boardObject.table = this.history[turnNumber];
  //update the .symbol property of the space - difficult?!
}
Game.prototype.getTurnSymbol = function() {
  if(this.turnCounter % 2 === 0) return "O";
  else return "X";
}

Game.prototype.changeTurn = function() {
  this.turnCounter++;
}

Game.prototype.checkRow = function() {
  
}
Game.prototype.checkCol = function() {

}
Game.prototype.checkDiagonals = function() {

}
Game.prototype.checkWin = function() {

}

//ui logic
//globals:
const myGame = new Game();
// const playerX = new Player("X");
// const playerO = new Player("0");
const myBoard = new Board();

//create 9 spaces stored in array
myBoard.build();

//refactor to display based on the myBoard.table current data
function displaySymbol(x, y, symbol) {
  //double loop - if i === x and j === y .text(symbol)
  const stringCoords = x.toString() + y.toString();
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if (i == x && j == y) {
        $("#" + stringCoords).text(symbol);
        
      }
    }
  }
}

function displayTurn() {
  $("#current-player-display").text(myGame.getTurnSymbol());
  $("#turn-number-display").text(myGame.turnCounter);
}

// function displayHistory() {
//   for(let i = 0; i < game.history.length; i++) {
//     //add the turn number with the current turn to a dropdown
//   }
// }


$(document).ready(function () {
  displayTurn();
  $("#board").on('click', '.space', function() {
    //get id
    const [x, y] = this.id.split("");
    //find Space object using id
    const clickedSpace = myBoard.findSpace(x,y);
    const clickedSymbol = myGame.getTurnSymbol();
    //call the Space function to mark it
    clickedSpace.mark(clickedSymbol);
    displaySymbol(x,y,clickedSymbol);
    myGame.changeTurn();
    displayTurn();
    myGame.writeHistory(myBoard.board);
  });
  
  $("#undo-button").click(function() {
    myGame.goBackInHistory(myGame.turnCounter - 1,myBoard);
    console.dir(myBoard.table);
    displayTurn();
  })
});