import { getDices } from "./gameRules.js";
import { resetCount } from "./gameRules.js";
import { getCount } from "./gameRules.js";
import { findDuplicates } from "./gameRules.js";
// roll and round init
let totalSum = 0;

// Dice info
let dicesOnTable = [];

export function handleSelectScore() {
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
        resetCount();
      }
    });
  });
}

// Return the score - HELPER
function setTheTotalScoreInputField(preSum) {
  let scoreInputField = document.getElementById("totalSum");
  scoreInputField.value = totalSum += parseInt(preSum);
}

// Return all results possible with the current face values.
// The order of the results is the same as on the score board.
export function getResults() {
  samValues();
  onePairPoints();
  // twoPairPoints();
  // threeSamePoints();
  // fourSamePoints();
  // fullHousePoints();
  // smallStraightPoints();
  // largeStraightPoints();
  // chancePoints();
  // yatzyPoints();
}

function samValues() {
  for (let i = 1; i < 7; i++) {
    let inputField = document.getElementById("same-" + i);
    if (inputField.disabled !== true) {
      inputField.value = sameValuePoints(i);
    }
  }
}

/// Return same-value points for the given face value.
// Returns 0, if no dice has the given face value.
// Pre: 1 <= value <= 6;
function sameValuePoints(number) {
  let score = 0;
  let dicesOnTable = getDices();
  for (let i = 0; i < dicesOnTable.length; i++) {
    if (dicesOnTable[i] === number) {
      score += dicesOnTable[i];
    }
  }
  return score;
}

// Return points for one pair (for the face value giving the highest points).
// Return 0, if there aren't 2 dice with the same face value.
function onePairPoints() {}

// Return points for two pairs
// (for the 2 face values giving the highest points).
// Return 0, if there aren't 2 dice with the same face value
// and 2 other dice with the same but different face value.
function twoPairPoints() {}

// Return points for 3 of a kind.
// Return 0, if there aren't 3 dice with the same face value.
function threeSamePoints() {}

// Return points for 4 of a kind.
// Return 0, if there aren't 4 dice with the same face value.
function fourSamePoints() {}

// Return points for full house.
// Return 0, if there aren't 3 dice with the same face value
// and 2 other dice with the same but different face value.
function fullHousePoints() {}

// Return points for small straight.
// Return 0, if the dice aren't showing 1,2,3,4,5.

function smallStraightPoints() {}

// Return points for large straight.
// Return 0, if the dice aren't showing 2,3,4,5,6.
function largeStraightPoints() {}

// Return points for chance (the sum of face values).
function chancePoints() {
  let score = 0;
  for (let i = 0; i < dicesOnTable.length; i++) {
    score += dicesOnTable[i];
  }
  return score;
}

// Return points for yatzy (50 points).
// Return 0, if there aren't 5 dice with the same face value.
function yatzyPoints() {
  let yatzyInput = document.getElementById("yatchSum");
  let score = 0;
  let sameValue = allSameValue(dicesOnTable);
  if (sameValue) {
    score = 50;
    yatzyInput.value = score;
  }
  return score;
}

function allSameValue(dicesOnTable) {
  if (
    dicesOnTable.every((value, i, dicesOnTable) => value === dicesOnTable[i])
  ) {
    return true;
  } else {
    return false;
  }
}
