// Fetch button
let rollButton = document.getElementById("rollDice");

rollButton.onclick = () => {
  console.log(throwDice());
};

// roll and round init
let countNumber = 0; // number of times the player has rolled the dice
let roundNumber = 0; // number of rounds

// Dice info
let diceOnTable = [];
let diceKept = [0, 0, 0, 0, 0];

// DOM
let diceArea = document.getElementById("diceArea").children;

// Constant
holdDie(diceOnTable);

// Roll the 5 dice. Only roll dice that are not hold.
// Note: holdStatus[i] is true, if die no. i is hold (for i in [0..4]).
function throwDice() {
  if (countNumber < 3) {
    let dice = [];
    // Mangler HoldStatus[]
    for (let i = 0; i < 5; i++) {
      console.log("HOKUS: " + checkHoldDice(i));
      if (!checkHoldDice(i)) {
        dice[i] = Math.floor(Math.random() * 6) + 1;
      } else {
        dice[i] = diceOnTable[i];
      }
    }
    setAlleFaces(dice);
    countNumber++;
    setCount();
    disableFunction();
    return (diceOnTable = dice);
  }
}

function holdDie() {
  for (let i = 0; i < 5; i++) {
    let holdCheckBox = document.getElementById("holdDie" + i);
    holdCheckBox.addEventListener("change", () => {
      if (holdCheckBox.checked) {
        console.log("Checked " + diceOnTable[i]);
        diceKept[i] = diceOnTable[i];
      } else {
        console.log("Unchecked " + diceOnTable[i]);
        diceKept[i] = 0;
      }
      console.log(diceKept);
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

// Return the number of times the 5 dice has been thrown.
function getThrowCount() {}

// Reset the throw count.
function resetThrowCount() {
  countNumber = 0;
}

// Return all results possible with the current face values.
// The order of the results is the same as on the score board.
// Note: This is an optional method. Comment this method out,
// if you don't want use it.
function getResults() {}

// Return an int[7] containing the frequency of face values.
// Frequency at index v is the number of dice with the face value v, 1 <= v <= 6.
// Index 0 is not used.
// Note: This method can be used in several of the following methods.
function frequency() {}

/// Return same-value points for the given face value.
// Returns 0, if no dice has the given face value.
// Pre: 1 <= value <= 6;
function sameValuePoints(value) {}

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
  for (let i = 0; i < diceOnTable.length; i++) {
    score += diceOnTable[i];
  }
  return score;
}

// Return points for yatzy (50 points).
// Return 0, if there aren't 5 dice with the same face value.
function yatzyPoints() {
  let score = 0;
  let sameValue = allSameValue(diceOnTable);
  if (sameValue) {
    score = 50;
  }
  return score;
}

function allSameValue(diceOnTable) {
  if (diceOnTable.every((value, i, diceOnTable) => value === diceOnTable[i])) {
    return true;
  } else {
    return false;
  }
}

// Check if count is 3
function checkMaxCount() {
  if (countNumber == 3) {
    document.getElementById("rollDice").disabled = true;
    disableFunction();
  }
}

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
}

// Refactor count
function setCount() {
  checkMaxCount();
  return (document.getElementById("rollCount").textContent = countNumber);
}
