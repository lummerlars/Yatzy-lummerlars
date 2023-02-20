import YatzyDice from "./YatzyDice.js";

let dice = new YatzyDice();

const rollButton = document.getElementById("rollDice");

rollButton.onclick = () => {
  rollTheDice();
  dice.throwCount = 0;
};

const getHeldDie = () => {
  let heldDie = Array(5);
  for (let i = 0; i < 5; i++) {}
};

const rollTheDice = () => {
  dice.throwDice(getHeldDie);
  for (let i = 0; i < 5; i++) {
    if (dice.throwCount === 1) {
    }
  }
};
