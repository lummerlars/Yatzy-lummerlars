class YatzyDice {
  constructor() {
    this.values = new Array(5).fill(0);
    this.throwCount = 0;
    this.totalThrowCount = 0;
  }

  /**
   * Return the 5 face values of the dice.
   */
  getValues = () => {
    return this.values;
  };

  /**
   * Set the 5 face values of the dice.
   * Pre: 1 <= values[i] <= 6 for i in [0..4]
   */
  setValues(values) {
    this.values = values;
  }

  /**
   * Return the number of times the 5 dice has been thrown.
   */
  getThrowCount() {
    return this.throwCount;
  }

  getTotalThrowCount() {
    return this.totalThrowCount;
  }

  setThrowCount() {
    this.throwCount++;
    this.totalThrowCount++;
  }

  /**
   * Reset the throw count.
   */
  resetThrowCount() {
    this.throwCount = 0;
  }

  /**
   * Roll the 5 dice. Only roll dice that are not hold.
   * Note: holdStatus[i] is true, if die no. i is hold (for i in [0..4]).
   */
  throwDice(holdStatus) {
    for (let i = 0; i < this.values.length; i++) {
      if (!holdStatus[i]) {
        this.values[i] = Math.floor(Math.random() * 6) + 1;
      }
    }
  }

  // -------------------------------------------------------------------------

  /**
   * Return all results possible with the current face values.
   * The order of the results is the same as on the score board.
   */
  getResults() {
    let results = Array(15);
    for (let i = 0; i <= 5; i++) {
      results[i] = this.sameValuePoints(i + 1);
    }
    results[6] = this.onePairPoints();
    results[7] = this.twoPairPoints();
    results[8] = this.threeSamePoints();
    results[9] = this.fourSamePoints();
    results[10] = this.fullHousePoints();
    results[11] = this.smallStraightPoints();
    results[12] = this.largeStraightPoints();
    results[13] = this.chancePoints();
    results[14] = this.yatzyPoints();

    return results;
  }

  // -------------------------------------------------------------------------

  // Return an int[7] containing the frequency of face values.
  // Frequency at index v is the number of dice with the face value v, 1 <= v <= 6.
  // Index 0 is not used.
  frequency() {
    let freq = new Array(7).fill(0);
    for (let value of this.values) {
      freq[value]++;
    }
    return freq;
  }

  /**
   * Return same-value points for the given face value.
   * Returns 0, if no dice has the given face value.
   * Pre: 1 <= value <= 6;
   */
  sameValuePoints(value) {
    let freq = this.frequency();
    return freq[value] * value;
  }

  /**
   * Return points for one pair (for the face value giving the highest points).
   * Return 0, if there aren't 2 dice with the same face value.
   */
  onePairPoints() {
    let freq = this.frequency();
    for (let i = freq.length - 1; i > 0; i--) {
      if (freq[i] > 1) {
        return 2 * i;
      }
    }
    return 0;
  }

  /**
   * Return points for two pairs
   * (for the 2 face values giving the highest points).
   * Return 0, if there aren't 2 dice with the same face value
   * and 2 other dice with the same but different face value.
   */
  twoPairPoints() {
    let freq = this.frequency();
    let firstPair = 0;
    let secondPair = 0;
    let totalPairPoint = 0;
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] > 1) {
        if (firstPair == 0) {
          firstPair = i * 2;
        } else {
          secondPair = i * 2;
        }
      }
    }
    if (secondPair != 0) {
      totalPairPoint = firstPair + secondPair;
    }
    return totalPairPoint;
  }

  /**
   * Return points for 3 of a kind.
   * Return 0, if there aren't 3 dice with the same face value.
   */
  threeSamePoints() {
    let freq = this.frequency();
    let threeKind = 0;
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] >= 3) {
        threeKind = i * 3;
      }
    }
    return threeKind;
  }

  /**
   * Return points for 4 of a kind.
   * Return 0, if there aren't 4 dice with the same face value.
   */
  fourSamePoints() {
    let freq = this.frequency();
    let fourKind = 0;
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] >= 4) {
        fourKind = i * 4;
      }
    }
    return fourKind;
  }

  /**
   * Return points for full house.
   * Return 0, if there aren't 3 dice with the same face value
   * and 2 other dice with the same but different face value.
   */
  fullHousePoints() {
    let freq = this.frequency();
    let pair = 0;
    let threeKind = 0;
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] == 2) {
        pair = i * 2;
      } else if (freq[i] == 3) {
        threeKind = i * 3;
      }
    }
    if (pair != 0 && threeKind != 0) {
      return pair + threeKind;
    }
    return 0;
  }

  /**
   * Return points for small straight.
   * Return 0, if the dice aren't showing 1,2,3,4,5.
   */
  smallStraightPoints() {
    let freq = this.frequency();
    for (let i = 1; i < freq.length - 1; i++) {
      if (freq[i] != 1) {
        return 0;
      }
    }
    return 15;
  }

  /**
   * Return points for large straight.
   * Return 0, if the dice aren't showing 2,3,4,5,6.
   */
  largeStraightPoints() {
    let freq = this.frequency();
    for (let i = 2; i < freq.length; i++) {
      if (freq[i] != 1) {
        return 0;
      }
    }
    return 20;
  }

  /**
   * Return points for chance (the sum of face values).
   */
  chancePoints() {
    let points = 0;
    for (let face of this.values) {
      points += face;
    }
    return points;
  }

  /**
   * Return points for yatzy (50 points).
   * Return 0, if there aren't 5 dice with the same face value.
   */
  yatzyPoints() {
    let freq = this.frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] == 5) {
        return 50;
      }
    }
    return 0;
  }
}

export default YatzyDice;
