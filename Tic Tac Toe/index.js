turn = "X";
clickAudio = new Audio("ting.mp3");
winAudio = new Audio("winning.mp3");
clickAudio.playbackRate = 3;
gameOver = false;
resetScreen = document.getElementsByClassName("resetScreen")[0];
turnText = document.getElementsByClassName("gameInfoText")[0];
turnText.style.visibility = "visible";
turnText.style.margin = "8px";
resetScreen.style.visibility = "hidden";
resetScreenText = document.getElementsByClassName("gameInfoText")[1];
resetScreenText.style.visibility = "hidden";
gif = document.getElementsByClassName("gif")[0];
resetScreenText.style.fontSize = "35px";
// Media Query in JS
let x = window.matchMedia("(max-width: 900px)");
let y = window.matchMedia("(max-width: 400px)");

if(x.matches)
{
  turnText.style.fontSize = "31px";
}
if(y.matches)
{
  turnText.style.fontSize = "25px";
}

// Change Turn
function changeTurn() {
  return turn === "X" ? "O" : "X";
}

// Game Won Condition
function isGameWon() {
  wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  boxes = document.getElementsByClassName("box");
  wins.forEach((win) => {
    if (
      boxes[win[0]].innerText === boxes[win[1]].innerText &&
      boxes[win[0]].innerText === boxes[win[2]].innerText &&
      boxes[win[0]].innerText !== ""
    ) {
      turnText.style.visibility = "hidden";
      turnText.style.display = "none";
      resetScreen.style.visibility = "visible";
      resetScreenText.innerText = `${turn} Won`;
      resetScreenText.style.color = "rgb(7, 9, 39)";
      resetScreenText.style.margin = "12px";
      (resetScreenText.style.fontFamily = "Prompt"), "sans-serif";
      resetScreenText.style.visibility = "visible";
      gif.style.visibility = "visible";
      boxes[win[0]].style.backgroundColor = "rgb(226 229 255 / 97%)";
      boxes[win[1]].style.backgroundColor = "rgb(226 229 255 / 97%)";
      boxes[win[2]].style.backgroundColor = "rgb(226 229 255 / 97%)";
      winAudio.play();
      gameOver = true;
    }
  });
}

// Draw
function isDraw() {
  flag = 0;
  if (!gameOver) {
    boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach((box) => {
      if (box.innerText === "") {
        flag = 1;
      }
    });
  }
  if (flag === 0) {
    return true;
  } else {
    return false;
  }
}

// Game start here
function gamePlay() {
  boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((box) => {
    box.addEventListener("click", (e) => {
      if (!gameOver) {
        console.log(gameOver);
        clickAudio.play();
        if (e.target.innerText === "") {
          e.target.innerText = turn;
          (e.target.style.fontFamily = "Prompt"), "sans-serif";
          if (x.matches) {
            e.target.style.fontSize = "65px";
          }
          if (y.matches) {
            e.target.style.fontSize = "50px";
          } else {
            e.target.style.fontSize = "80px";
          }
          e.target.style.color = "rgb(7, 9, 39)";
          isGameWon();
          if (!gameOver) {
            turn = changeTurn();
            turnText.innerText = `Turn ${turn}`;
            turnText.style.fontFamily = "Prompt";
            turnText.style.color = "rgb(7, 9, 39)";
            if (isDraw()) {
              resetScreen.style.visibility = "visible";
              resetScreenText.innerText = "Game is Draw";
              turnText.style.visibility = "hidden";
              // resetScreenText.style.top = "71px";
              turnText.style.display = "none";
              // resetScreenText.style.right = "-215px";
              resetScreenText.style.visibility = "visible";
              gif.style.visibility = "hidden";
              gif.style.display = "none";
            }
          } else {
            resetScreen.style.visibility = "visible";
          }
        }
      }
    });
  });
}

gamePlay();
reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "white";
    turn = "X";
    turnText.innerText = `Turn ${turn}`;
    turnText.style.display = "block";
    turnText.style.visibility = "visible";
    resetScreen.style.visibility = "hidden";
    resetScreenText.style.visibility = "hidden";
    gif.style.visibility = "hidden";
    gif.style.display = "block";
    gameOver = false;
  });
});
