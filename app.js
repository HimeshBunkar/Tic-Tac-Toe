const boxes = document.querySelectorAll(".button");
const resetBtn = document.querySelector("#reset");
const newButton = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector(".msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
  });
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner, winPattern) => {
  msg.innerText = `🎉 Congratulations! The winner is ${winner}`;
  msgContainer.classList.remove("hide");
  winPattern.forEach(index => {
    boxes[index].classList.add("winner");
  });
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1, pattern);
      return true;
    }
  }

  let isDraw = [...boxes].every(box => box.innerText !== "");
  if (isDraw) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    return true;
  }

  return false;
};

boxes.forEach(button => {
  button.addEventListener("click", () => {
    button.innerText = turnO ? "O" : "X";
    button.disabled = true;
    if (!checkWinner()) {
      turnO = !turnO;
    }
  });
});

resetBtn.addEventListener("click", resetGame);
newButton.addEventListener("click", resetGame);
