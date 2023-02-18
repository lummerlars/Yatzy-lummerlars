// Imports
import { getResults } from "./score.js";
import { handleSelectScore } from "./score.js";

// Fetch button
let rollButton = document.getElementById("rollDice");

rollButton.onclick = () => {
  rollAnimation();
};

function rollAnimation() {
  let dice = [];
  for (let i = 0; i < 5; i++) {
    if (!checkHoldDice(i)) {
      dice.push(document.getElementById("die" + i));
    }
  }
  dice.forEach(function (die) {
    die.classList.add("diceShake");
  });
  setTimeout(function () {
    dice.forEach(function (die) {
      die.classList.remove("diceShake");
    });
    throwDice();
  }, 1000);
}

// roll and round init
let countNumber = 0; // number of times the player has rolled the dice
let totalCounts = 0;

// Dice info
let diceOnTable = [0, 0, 0, 0, 0];
let diceKept = [0, 0, 0, 0, 0];

export function getDices() {
  return diceOnTable;
}

// Roll the 5 dice. Only roll dice that are not hold.
// Note: holdStatus[i] is true, if die no. i is hold (for i in [0..4]).
function throwDice() {
  if (getCount() < 4) {
    let dice = [];
    for (let i = 0; i < 5; i++) {
      if (!checkHoldDice(i)) {
        dice[i] = Math.floor(Math.random() * 6) + 1;
      } else {
        dice[i] = diceOnTable[i];
      }
    }
    diceOnTable = dice;
    addCount(countNumber++);
    updateTotalCount();
    setAlleFaces(dice);
    disableFunction();
    console.log(diceOnTable);
  }
}

export const findDuplicates = (arr) => {
  let sorted_arr = arr.slice().sort();
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
};

export function getCount() {
  return countNumber;
}

const updateTotalCount = () => {
  document.getElementById("totalCount").textContent = ++totalCounts;
};

function holdDie() {
  for (let i = 0; i < 5; i++) {
    let holdCheckBox = document.getElementById("holdDie" + i);
    holdCheckBox.addEventListener("change", () => {
      if (holdCheckBox.checked) {
        diceKept[i] = diceOnTable[i];
      } else {
        diceKept[i] = 0;
      }
    });
  }
}

function setAlleFaces(diceOnTable) {
  for (let i = 0; i < 5; i++) {
    document
      .getElementById("die" + i)
      .setAttribute("src", "images/dice-six-faces-" + diceOnTable[i] + ".png");
  }
}

function checkHoldDice(index) {
  let holdCheckBox = document.getElementById("holdDie" + index);
  if (holdCheckBox.checked) {
    return true;
  } else {
    return false;
  }
}

// Check if count is 3
function checkMaxCount() {
  if (countNumber === 3) {
    document.getElementById("rollDice").disabled = true;
    disableFunction();
    getResults();
    handleSelectScore();
    handleDeselectAllHolds();
  }
}

const handleDeselectAllHolds = () => {
  for (let i = 0; i < 5; i++) {
    let holdCheckBox = document.getElementById("holdDie" + i);
    holdCheckBox.checked = false;
    diceKept[i] = 0;
  }
};

function disableFunction() {
  if (countNumber > 0) {
    for (let i = 0; i < 5; i++) {
      document.getElementById("holdDie" + i).disabled = false;
    }
  }
  if (countNumber === 3) {
    for (let i = 0; i < 5; i++) {
      document.getElementById("holdDie" + i).disabled = true;
    }
  }
  if (countNumber === 0) {
    document.getElementById("rollDice").disabled = false;
  }
}

export function resetCount() {
  countNumber = 0;
  checkMaxCount();
  disableFunction();
  return (document.getElementById("rollCount").textContent = countNumber);
}

// Refactor count
function addCount(number) {
  getCount() + number;
  checkMaxCount();
  return (document.getElementById("rollCount").textContent = countNumber);
}
