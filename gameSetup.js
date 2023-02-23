import YatzyDice from "./YatzyDice.js";
import Player from "./player.js";
import { openModal } from "./modal.js";

let dice;
let player;
let inputWithResult = false;

const rollButton = document.getElementById("rollDice");
const createNewGameButton = document.getElementById("createNewGame");
const endButton = document.getElementById("endGame");
let throwCount = document.getElementById("rollCount");
let totalThrowCount = document.getElementById("totalCount");

rollButton.onclick = () => {
  rollTheDice();
};

// endButton.onclick = () => {
//   endGame();
// };

// createNewGame.onclick = () => {
//   initNewGame();
// };

holdDie();

const rollAnimation = () => {
  let rollDiceInterval = setInterval(function () {
    for (let i = 0; i < 5; i++) {
      let die = document.getElementById("die" + i);
      if (!die.classList.contains("diceSelected")) {
        die.classList.add("diceShake");
      }
    }
    dice.throwDice(getHeldDie());
    setAlleDieFaces(dice.getValues());
  }, Math.floor(Math.random() * (100 - 80 + 1) + 100));

  setTimeout(function () {
    clearInterval(rollDiceInterval);
    for (let i = 0; i < 5; i++) {
      let die = document.getElementById("die" + i);
      if (!die.classList.contains("diceSelected")) {
        die.classList.remove("diceShake");
      }
    }
    rollButton.disabled = false;
    checkThrowCount();
  }, Math.floor(Math.random() * (1500 - 900 + 1) + 900));
};

function holdDie() {
  document.querySelectorAll("img").forEach((element) => {
    element.addEventListener("click", function (event) {
      if (
        !rollButton.disabled &&
        dice.getThrowCount() !== 0 &&
        dice.getThrowCount() !== 3
      ) {
        event.preventDefault();
        this.disabled == true ? false : true;
        this.classList.toggle("diceSelected");
      }
    });
  });
}

const getHeldDie = () => {
  let heldButtonStatus = new Array(5).fill(false);
  for (let i = 0; i < heldButtonStatus.length; i++) {
    let die = document.getElementById("die" + i);
    heldButtonStatus[i] = die.classList.contains("diceSelected") ? true : false;
  }
  return heldButtonStatus;
};

const removeHeldDie = () => {
  for (let i = 0; i < 5; i++) {
    let die = document.getElementById("die" + i);
    die[i] = die.classList.remove("diceSelected");
  }
};

const rollTheDice = () => {
  checkIfPointIsTaken();
  rollButton.disabled = true;
  rollAnimation();
  dice.setThrowCount();
  throwCount.textContent = dice.getThrowCount();
  totalThrowCount.textContent = dice.getTotalThrowCount();
};

const setAlleDieFaces = (dice) => {
  for (let i = 0; i < dice.length; i++) {
    let die = document.getElementById("die" + i);
    die.setAttribute("src", "images/dice-six-faces-" + dice[i] + ".png");
  }
};

const checkThrowCount = () => {
  if (dice.getThrowCount() === 3) {
    rollButton.disabled = true;
    showResults();
    selectResult();
  } else {
    return;
  }
};

const showResults = () => {
  let results = dice.getResults();
  for (let i = 0; i < 15; i++) {
    let inputField = document.getElementById("result-" + i);
    if (inputField.disabled !== true) {
      inputField.value = results[i];
    }
  }
};

const selectResult = () => {
  document.querySelectorAll("input").forEach((inputField) => {
    let id = inputField.getAttribute("id");
    if (!inputField.disabled) {
      inputField.onclick = (event) => {
        if (
          id !== "sum" &&
          id !== "bonus" &&
          id !== "totalSum" &&
          dice.getThrowCount() === 3
        ) {
          console.log(inputField);
          rollButton.disabled = false;
          event.preventDefault();
          event.stopPropagation();
          console.log(inputField.value + " with id: " + id);
          inputField.disabled == true ? false : true;
          inputField.classList.toggle("selected");

          document.querySelectorAll("input").forEach((lastSelectedInput) => {
            if (lastSelectedInput.id !== id) {
              lastSelectedInput.classList.remove("selected");
            }
          });
        }
      };
    }
  });
};

const checkIfPointIsTaken = () => {
  console.log("From check");
  document.querySelectorAll("input").forEach((inputField) => {
    if (inputField.classList.contains("selected")) {
      inputField.classList.remove("selected");
      inputField.disabled = true;
      inputWithResult = true;
    }
  });
  if (inputWithResult) {
    dice.resetThrowCount();
    throwCount.textContent = dice.getThrowCount();
    rollButton.disabled = false;
    updateSumAndBonus();
    resetResults();
    checkGameStatus();
    removeHeldDie();
    inputWithResult = false;
  }
};

const resetResults = () => {
  for (let i = 0; i < 15; i++) {
    let inputField = document.getElementById("result-" + i);
    if (inputField.disabled !== true) {
      inputField.value = "";
    }
  }
};

const checkGameStatus = () => {
  let countDisabledInputField = 0;
  for (let i = 0; i < 15; i++) {
    let inputField = document.getElementById("result-" + i);
    if (inputField.disabled == true) {
      countDisabledInputField++;
    }
  }
  if (countDisabledInputField === 15) {
    endGame();
  }
};

const updateSumAndBonus = () => {
  let sumUpper = 0;
  let sumLower = 0;
  let bonus = 0;
  for (let i = 0; i < 6; i++) {
    let inputField = document.getElementById("result-" + i);
    if (inputField.disabled === true) {
      sumUpper += parseInt(inputField.value);
    }
  }
  for (let i = 6; i < 15; i++) {
    let inputField = document.getElementById("result-" + i);
    if (inputField.disabled === true) {
      sumLower += parseInt(inputField.value);
    }
  }
  if (sumUpper >= 63) {
    bonus = 50;
  }
  let totalSum = parseInt(sumLower) + parseInt(sumUpper) + parseInt(bonus);
  document.getElementById("sum").value = parseInt(sumUpper);
  document.getElementById("bonus").value = parseInt(bonus);
  document.getElementById("totalSum").value = parseInt(totalSum);
};

// GAME SETUP - INIT / END GAME ec.

const endGame = () => {
  let resultArray = [];
  for (let i = 0; i < 15; i++) {
    let inputField = document.getElementById("result-" + i);
    if (inputField.value === "") {
      resultArray.push(0);
    } else {
      resultArray.push(parseInt(inputField.value));
    }
  }
  let score = document.getElementById("totalSum");
  player.setScore(score.value);
  player.setResults(resultArray);
  openModal(player, "endGameModal");
};

export const resetGame = () => {
  for (let i = 0; i < 15; i++) {
    let inputField = document.getElementById("result-" + i);
    inputField.value = "";
    inputField.disabled = false;
    rollButton.disabled = false;
    document.getElementById("sum").value = "";
    document.getElementById("bonus").value = "";
    document.getElementById("totalSum").value = "";
  }
  throwCount.textContent = dice.getThrowCount();
  totalThrowCount.textContent = dice.getTotalThrowCount();
  removeHeldDie();
};

export const initNewGame = () => {
  player = new Player();
  dice = new YatzyDice();
  openModal(player, "chooseName");
  console.log("initNewGame: " + player.score);
  resetGame();
};

initNewGame();

export const loadPlayerList = () => {
  const table = document.getElementById("highscoreTable");
  table.innerHTML = "";
  let existingPlayerList = JSON.parse(localStorage.getItem("players")) || [];

  existingPlayerList
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => {
      let row = table.insertRow();
      let nameCell = row.insertCell(-1);
      nameCell.innerHTML = item.name;
      let scoreCell = row.insertCell(-1);
      scoreCell.innerHTML = item.score;
      let dateFormat = new Date(item.id);
      let dateCell = row.insertCell(-1);
      dateCell.innerHTML = dateFormat.toLocaleDateString();
    });
  return existingPlayerList;
};

loadPlayerList();
