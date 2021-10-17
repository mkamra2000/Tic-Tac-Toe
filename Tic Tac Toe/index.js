turn = "X";
clickAudio = new Audio("ting.mp3")
clickAudio.playbackRate = 3
gameOver = false;
resetScreen = document.getElementsByClassName("resetScreen")[0];
resetScreen.style.visibility = "hidden";
resetScreenText = document.getElementById("resetScreenText");
resetScreenText.style.visibility = "hidden";

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
      turnText = document.getElementsByClassName("gameInfoText")[1];
      turnText.innerText = `${turn} Won`;
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
      clickAudio.play()
      if (e.target.innerText === "") {
        e.target.innerText = turn;
        (e.target.style.fontFamily = "Prompt"), "sans-serif";
        e.target.style.fontSize = "50px";
        turnText = document.getElementsByClassName("gameInfoText")[1];
        isGameWon();
        if (!gameOver) {
          turn = changeTurn();
          turnText.innerText = `Turn ${turn}`;
          if (isDraw()) {
            resetScreen.style.visibility = "visible";
            resetScreenText.style.visibility = "visible";
          }
        } else {
          resetScreen.style.visibility = "visible";
        }
      }
    });
  });
}

// turnText = document.getElementsByClassName('gameInfoText')[1]
// turnText.innerText = `Turn ${turn}`
gamePlay();
reset = document.getElementById("reset");
turnText = document.getElementsByClassName("gameInfoText")[1];
reset.addEventListener("click", () => {
  boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((box) => {
    box.innerText = "";
    turn = "X";
    turnText.innerText = `Turn ${turn}`;
    resetScreen.style.visibility = "hidden";
    resetScreenText.style.visibility = "hidden";
    gameOver = false;
  });
});
