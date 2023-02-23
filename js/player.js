class Player {
  constructor() {
    this.id = Date.now();
    this.name = "";
    this.score = 0;
    this.results = new Array(15).fill(0);
    this.totals = new Array(3).fill(0);
  }

  getName = () => {
    return this.name;
  };

  getScore = () => {
    return this.score;
  };

  getResults = () => {
    return this.results;
  };

  getTotals = () => {
    return this.totals;
  };

  getId = () => {
    return this.id;
  };

  setName = (name) => {
    this.name = name;
  };

  setScore = (score) => {
    this.score = score;
  };

  setResults = (resultsArray) => {
    this.results = resultsArray;
  };

  setTotals = (totalsArray) => {
    this.total = totalsArray;
  };
}

export default Player;
