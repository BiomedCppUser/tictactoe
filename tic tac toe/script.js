// set initial turn to 'X', and select all boxes on the board
let turn = "X";
const box = document.querySelectorAll(".box");
// initialize arrays to keep track of player moves, and player names
let player1Moves = [];
let player2Moves = [];
let player1Name = "X";
let player2Name = "O";
// set game over state to false
let gameOver = false;
// add click event listener to each box
box.forEach((box) => {
  box.addEventListener("click", () => {
    // only allow moves if game is not over and the box has not been clicked before
    if (!gameOver && !box.classList.contains("clicked")) {
      // mark the box as clicked and display the player's symbol
      box.classList.add("clicked");
      box.textContent = turn;

      // update player moves array and check for a win
      if (turn === "X") {
        player1Moves.push(parseInt(box.id));
        if (checkForWin(player1Moves)) {
          // if player 1 wins, display message and set game over state to true
          console.log(player1Name + " wins!");
          document.getElementById("messageDisplay").textContent =
            player1Name + " wins!";
          gameOver = true;
        } else {
          // if player 1 does not win, switch to player 2's turn
          turn = "O";
        }
      } else {
        player2Moves.push(parseInt(box.id));
        if (checkForWin(player2Moves)) {
          // if player 2 wins, display message and set game over state to true
          console.log(player2Name + " wins!");
          document.getElementById("messageDisplay").textContent =
            player2Name + " wins!";
          gameOver = true;
        } else {
          // if player 2 does not win, switch to player 1's turn
          turn = "X";
        }
      }
    }
  });
});
// check for a win by comparing player moves to all possible winning combinations
function checkForWin(playerMoves) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      playerMoves.includes(a) &&
      playerMoves.includes(b) &&
      playerMoves.includes(c)
    ) {
      return true;
    }
  }
  return false;
}
// add click event listener to reset button to reload the page and start a new game
const resetBtn = document.querySelector(".resetBtn");
resetBtn.addEventListener("click", () => {
  location.reload();
});
