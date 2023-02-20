// Imports
import { getResults } from "./score.js";
import { sameValuePoints } from "./score.js";
import { calculateKindsValue } from "./score.js";
import { calculatePairValue } from "./score.js";
import {
  calculateSmallStraightPoints,
  calculateLargeStraightPoints,
  calculateFullHouse,
} from "./score.js";
import YatzyDice from "./YatzyDice.js";

// Fetch button
let rollButton = document.getElementById("rollDice");

rollButton.onclick = () => {
  rollAnimation();
};

holdDie();

let yatzyDice = new YatzyDice();

// roll and round init
let countNumber = 0; // number of times the player has rolled the dice
let totalCounts = 0;
let totalSum = 0;

// Dice info
let diceOnTable = [0, 0, 0, 0, 0];
let diceKept = [0, 0, 0, 0, 0];

export function getDices() {
  return diceOnTable;
}

const rollAnimation = () => {
  let dice = [];
  for (let i = 0; i < 5; i++) {
    if (!checkHoldDice(i)) {
      dice.push(document.getElementById("die" + i));
    }
  }
  dice.forEach(function (die) {
    die.classList.add("diceShake");
  });
  rollButton.disabled = true;
  setTimeout(function () {
    dice.forEach(function (die) {
      die.classList.remove("diceShake");
    });
    rollButton.disabled = false;
    throwDice();
  }, 1000);
};

// Roll the 5 dice. Only roll dice that are not hold.
// Note: holdStatus[i] is true, if die no. i is hold (for i in [0..4]).
const throwDice = () => {
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
};

// handle the selected inputs score and adds it to the total
const handleSelectedScore = () => {
  document.querySelectorAll("input").forEach((element) => {
    let id = element.getAttribute("id");
    element.addEventListener("click", function (event) {
      if (
        getCount() === 3 &&
        id !== "sum" &&
        id !== "bonus" &&
        id !== "totalSum"
      ) {
        event.preventDefault();
        console.log("You pressed a button with id: " + id);
        setTheTotalScoreInputField(element.value);
        element.disabled = true;
        resetResults();
        resetCount();
      }
    });
  });
};

// Return the score - HELPER
function setTheTotalScoreInputField(preSum) {
  let scoreInputField = document.getElementById("totalSum");
  scoreInputField.value = totalSum += parseInt(preSum);
}

const resetResults = () => {
  document.querySelectorAll("input").forEach((element) => {
    let id = element.getAttribute("id");
    if (
      getCount() === 3 &&
      id !== "sum" &&
      id !== "bonus" &&
      id !== "totalSum" &&
      element.disabled === false
    ) {
      element.value = "";
    }
  });
};

export function getCount() {
  return countNumber;
}

const updateTotalCount = () => {
  document.getElementById("totalCount").textContent = ++totalCounts;
};

function holdDie() {
  for (let i = 0; i < 5; i++) {
    let holdCheckBox = document.getElementById("die" + i);
    holdCheckBox.addEventListener("click", function () {
      this.disabled == true ? false : true;
      this.disabled == true ? (diceKept[i] = holdCheckBox) : (diceKept[i] = 0);
      this.classList.toggle("diceSelected");
      console.log("DiceKept: " + diceKept + " button pressed: " + holdCheckBox);
    });
  }
  // for (let i = 0; i < 5; i++) {
  //   let holdCheckBox = document.getElementById("die" + i);
  //   holdCheckBox.addEventListener("click", () => {
  //     if (diceOnTable[i] !== diceKept[i]) {
  //       holdCheckBox.classList.add("diceSelected");
  //       console.log(holdCheckBox);
  //       diceKept[i] = diceOnTable[i];
  //       console.log(
  //         "diceKept: " + diceKept + " and you pressed: " + diceOnTable[i]
  //       );
  //     } else {
  //       console.log(holdCheckBox);
  //       holdCheckBox.classList.remove("diceSelected");
  //       diceKept[i] = 0;
  //       console.log(
  //         "diceKept: " + diceKept + " and you deselected: " + diceOnTable[i]
  //       );
  //     }
  //   });
  // }
}

function setAlleFaces(diceOnTable) {
  for (let i = 0; i < 5; i++) {
    document
      .getElementById("die" + i)
      .setAttribute("src", "images/dice-six-faces-" + diceOnTable[i] + ".png");
  }
}

function checkHoldDice(index) {
  let holdCheckBox = document.getElementById("die" + index);
  if (holdCheckBox === diceOnTable[index]) {
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
    handleSelectedScore();
    handleDeselectAllHolds();
    addAnimationToInputField();
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

export const resetCount = () => {
  countNumber = 0;
  checkMaxCount();
  disableFunction();
  return (document.getElementById("rollCount").textContent = countNumber);
};

// Refactor count
const addCount = (number) => {
  getCount() + number;
  checkMaxCount();
  return (document.getElementById("rollCount").textContent = countNumber);
};

export const changeAllSameValue = () => {
  for (let i = 1; i < 7; i++) {
    let inputField = document.getElementById("same-" + i);
    if (inputField.disabled !== true) {
      inputField.value = sameValuePoints(i);
    }
  }
};

export const changeAllKindValue = () => {
  for (let i = 3; i < 5; i++) {
    let kindInputField = document.getElementById("kind-" + i);
    if (kindInputField.disabled !== true) {
      kindInputField.value = calculateKindsValue(i);
    }
  }
};

export const changeAllPairValue = () => {
  for (let i = 1; i < 3; i++) {
    let pairInputField = document.getElementById("pair-" + i);
    if (pairInputField.disabled !== true) {
      pairInputField.value = calculatePairValue(i);
    }
  }
};

export const changeStraights = () => {
  let smallStraightInputField = document.getElementById("smallStraight");
  if (smallStraightInputField.disabled !== true) {
    smallStraightInputField.value = calculateSmallStraightPoints();
  }
  let largeStraightInputField = document.getElementById("largeStraight");
  if (largeStraightInputField.disabled !== true) {
    largeStraightInputField.value = calculateLargeStraightPoints();
  }
};

const checkIfInputFieldIsLocked = (id) => {
  const inputField = document.getElementById(id);
  if (inputField.disabled === true) {
    return true;
  } else {
    return false;
  }
};

const addAnimationToInputField = () => {
  // let allInputFields = [];
  // document.querySelectorAll("input").forEach((element) => {
  //   let id = element.getAttribute("id");
  //   if (
  //     getCount() === 3 &&
  //     id !== "sum" &&
  //     id !== "bonus" &&
  //     id !== "totalSum" &&
  //     element.disabled === false
  //   ) {
  //     allInputFields.push(element);
  //   }
  // });
  // allInputFields.forEach(function (inputField) {
  //   inputField.classList.add("trysomething");
  // });
  // setTimeout(function () {
  //   allInputFields.forEach(function (inputField) {
  //     inputField.classList.remove("diceShake");
  //   });
  // }, 1000);
};

console.log(calculateFullHouse());
console.log(calculatePairValue());
