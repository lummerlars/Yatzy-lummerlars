// Fetch button
let rollButton = document.querySelector("button");

// roll and round init
let countNumber = 0; // number of times the player has rolled the dice
let roundNumber = 0; // number of rounds

// Dice info
let diceOnTable = [];
let diceKept = [];

// DOM
let diceArea = document.getElementById("diceArea");
let keepDie = document.getElementById("keptDie"); // Put in an array

// Return the 5 face values of the dice.
function getValues() {}

// Set the 5 face values of the dice.
// Pre: 1 <= values[i] <= 6 for i in [0..4].
// Note: This method is only to be used in tests.

function setValues(values) {}

// Return the number of times the 5 dice has been thrown.
function getThrowCount() {}

// Reset the throw count.
function resetThrowCount() {}

// Roll the 5 dice. Only roll dice that are not hold.
// Note: holdStatus[i] is true, if die no. i is hold (for i in [0..4]).
function throwDice(diceKept) {
  const diceOnTable = [];
  for (let i = 0; i < diceOnTable.length; i++) {
    const die = array[i];
    diceKept.array.forEach((keptDice) => {
      if (die !== keptDice) {
        diceOnTable.push(randomThrow(die));
      }
    });
    countNumber++;
  }
}

// Return random die number between 1-6
function randomThrow(die) {}

// Keep a certain die in array
function keepDie(die) {}

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
function chancePoints() {}

// Return points for yatzy (50 points).
// Return 0, if there aren't 5 dice with the same face value.
function yatzyPoints() {}
