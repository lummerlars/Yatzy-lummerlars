import { getDices } from "./gameRules.js";
import { changeAllSameValue } from "./gameRules.js";
import { changeAllKindValue } from "./gameRules.js";
import { changeAllPairValue } from "./gameRules.js";
import { changeStraights } from "./gameRules.js";
// roll and round init

// Dice info
let dice = [];

// Return all results possible with the current face values.
// The order of the results is the same as on the score board.
export function getResults() {
  changeAllSameValue();
  changeAllKindValue();
  changeAllPairValue();
  changeStraights();
  // fullHousePoints();
  // smallStraightPoints();
  // largeStraightPoints();
  // chancePoints();
  // yatzyPoints();
}

/// Return same-value points for the given face value.
// Returns 0, if no dice has the given face value.
// Pre: 1 <= value <= 6;
export const sameValuePoints = (number) => {
  let score = 0;
  let dicesOnTable = getDices();
  for (let i = 0; i < dicesOnTable.length; i++) {
    if (dicesOnTable[i] === number) {
      score += dicesOnTable[i];
    }
  }
  return score;
};

export const calculateKindsValue = (numberOfKinds) => {
  const resultArray = [...getDices()].sort((a, b) => b - a);
  let highestSum = 0;
  for (let i = 6; i >= 0; i--) {
    let count = 0;
    for (let j = 0; j < resultArray.length; j++) {
      if (highestSum === 0) {
        if (i == resultArray[j]) {
          count++;
          if (count === numberOfKinds) {
            highestSum = resultArray[j] * numberOfKinds;
            break;
          }
        }
      } else {
        break;
      }
    }
  }
  return highestSum;
};

export const calculatePairValue = (numberOfPair) => {
  const resultArray = [...getDices()].sort((a, b) => b - a);
  let firstPairValue = 0;
  let secondPairValue = 0;
  let totalValue = 0;
  for (let i = 0; i < resultArray.length - 1; i++) {
    for (let j = i + 1; j < resultArray.length; j++) {
      if (resultArray[i] === resultArray[j]) {
        if (firstPairValue == 0) {
          firstPairValue = resultArray[i];
          console.log("Firstpair: " + firstPairValue);
          totalValue = firstPairValue * 2;
        } else if (
          secondPairValue == 0 &&
          numberOfPair > 1 &&
          resultArray[i] !== firstPairValue
        ) {
          secondPairValue = resultArray[i];
          console.log("SecondPair: " + secondPairValue);
          totalValue += secondPairValue * 2;
        } else {
          break;
        }
      }
    }
  }
  return (numberOfPair == 2) & (secondPairValue === 0) ? 0 : totalValue;
};

// Return points for full house.
// Return 0, if there aren't 3 dice with the same face value
// and 2 other dice with the same but different face value.
export const calculateFullHouse = () => {
  // MANGLER!!!!
  const resultArray = [...getDices()].sort((a, b) => a - b);
  const array = [3, 3, 3, 2, 2];
  let totalSum = 0;
  for (let i = 0; i < array.length - 1; i++) {}
  return totalSum;
};

// Return points for small straight.
// Return 0, if the dice aren't showing 1,2,3,4,5.

export const calculateSmallStraightPoints = () => {
  const resultArray = [...getDices()].sort((a, b) => a - b);
  let totalSum = 0;
  for (let i = 0; i < resultArray.length; i++) {
    if (resultArray[i] === i + 1) {
      totalSum += resultArray[i];
    } else {
      break;
    }
  }
  return totalSum !== 15 ? 0 : totalSum;
};

// Return points for large straight.
// Return 0, if the dice aren't showing 2,3,4,5,6.
export const calculateLargeStraightPoints = () => {
  const resultArray = [...getDices()].sort((a, b) => a - b);
  let startValue = 2;
  let totalSum = 0;
  for (let i = 0; i < resultArray.length; i++) {
    if (resultArray[i] === startValue) {
      totalSum += resultArray[i];
      startValue++;
    } else {
      break;
    }
  }
  return totalSum !== 20 ? 0 : totalSum;
};

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
