import YatzyDice from "./YatzyDice.js";
import Player from "./player.js";
import { openModal } from "./modal.js";

let dice;
let player;
let newGame = true;

const rollButton = document.getElementById("rollDice");
const endButton = document.getElementById("endGame");
let throwCount = document.getElementById("rollCount");

rollButton.onclick = () => {
  rollTheDice();
};

endButton.onclick = () => {
  endGame();
};

export const initNewGame = () => {
  player = new Player();
  dice = new YatzyDice();
  openModal(player, "chooseName");
};

initNewGame();

export const resetGame = () => {};

// const checkNewGame = (playerObject) => {
//   // NEW DICE / NEW PLAYER
//   console.log(newGame);
//   if (newGame === true) {
//     openModal(playerObject, "chooseName");
//   }
// };

// checkNewGame(player);

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
    console.log(dice.values);
  }, 130);
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
  }, 2000);
};

// const rollAnimation = () => {
//   let dice = [];
//   for (let i = 0; i < 5; i++) {
//     let die = document.getElementById("die" + i);
//     dice.push(die);
//   }
//   dice.forEach(function (die) {
//     die.classList.add("diceShake");
//   });
//   rollButton.disabled = true;
//   setTimeout(function () {
//     dice.forEach(function (die) {
//       die.classList.remove("diceShake");
//     });
//     rollButton.disabled = false;
//   }, 1000);
// };

function holdDie() {
  document.querySelectorAll("img").forEach((element) => {
    let id = element.getAttribute("id");
    element.addEventListener("click", function (event) {
      if (!rollButton.disabled && dice.getThrowCount() !== 0) {
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

const rollTheDice = () => {
  // dice.throwDice(getHeldDie());
  rollButton.disabled = true;
  rollAnimation();
  dice.setThrowCount();
  // setAlleDieFaces(dice.getValues());
  throwCount.textContent = dice.getThrowCount();
};

const setAlleDieFaces = (dice) => {
  for (let i = 0; i < dice.length; i++) {
    let die = document.getElementById("die" + i);
    die.setAttribute("src", "images/dice-six-faces-" + dice[i] + ".png");
  }
};

const checkThrowCount = () => {
  if (dice.getThrowCount() === 3) {
    showResults();
    selectResult();
    rollButton.disabled = true;
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
  let newInputFieldPressed = 0;
  document.querySelectorAll("input").forEach((inputField) => {
    let id = inputField.getAttribute("id");
    inputField.addEventListener("click", function (event) {
      if (
        id !== "sum" &&
        id !== "bonus" &&
        id !== "totalSum" &&
        dice.getThrowCount() === 3
      ) {
        event.preventDefault();
        console.log(dice.getThrowCount());
        console.log("You pressed a button with id: " + id);
        inputField.disabled = true;
        newInputFieldPressed = inputField.value;
        updateSumAndBonus();
        dice.resetThrowCount();
        throwCount.textContent = dice.getThrowCount();
        rollButton.disabled = false;
        resetResults();
        checkStatus();
        for (let i = 0; i < 5; i++) {
          document.getElementById("die" + i).classList?.remove("diceSelected");
        }
      }
    });
  });
};

const continueGame = (indputValue) => {
  if (dice.getThrowCount() === 3) {
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

const checkStatus = () => {
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
};

loadPlayerList();
