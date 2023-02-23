import { loadPlayerList } from "./gameSetup.js";
import { initNewGame } from "./gameSetup.js";

let modal = "";
const overlay = document.querySelector(".overlay");
const submitBtn = document.querySelector(".btn-submit");
const endGameBtn = document.querySelector(".btn-endGame");
let errorMessage = document.getElementById("error-message");
let playerName = document.getElementById("playerName");

import Player from "./player.js";
let player = new Player();

export const openModal = (playerObject, src) => {
  modal = document.getElementById(src);
  document.getElementById("inputName").value = "";
  player = playerObject;
  console.log("openModal.score: " + playerObject.score);
  if (src === "endGameModal") {
    let displayScoreP = document.getElementById("displayScore");
    document.getElementById(
      "endGameModalHeader"
    ).textContent = `Congrats ${playerObject.name}! You completed yatzy!`;
    let scoreboard = [...loadPlayerList()];
    console.log("Scoreboard: " + scoreboard.length);
    for (let i = 0; i < scoreboard.length; i++) {
      if (parseInt(player.score) > parseInt(scoreboard[i].score)) {
        console.log("Player.score: " + player.score);
        console.log("scoreboard.i.score: " + scoreboard[i].score);
        console.log("scoreboard.i.name: " + scoreboard[i].name);
        displayScoreP.innerHTML = `${
          i === 0
            ? "You're the best and have beaten "
            : "You completed the game and have beaten "
        } <strong> 
          ${scoreboard[i].name}'s</strong> score on <i>
          ${scoreboard[i].score}
          points</i> with your score on <i>
          ${player.score}
          points</i> and have now made your way to <strong>${++i}${nth(
          i
        )}</strong> place on the scoreboard`;
        break;
      } else {
        displayScoreP.innerHTML = `Unfortunately you didn't beat anyone. You were ${
          scoreboard[i].score - player.score
        } points away from ${scoreboard[i].name} `;
      }
    }
  }
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const nth = (index) => {
  if (index > 3 && index < 21) return "th";
  switch (index % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

submitBtn.addEventListener("click", function () {
  console.log(modal.id);
  let inputFieldName = document.getElementById("inputName");
  if (inputName.value !== "") {
    !errorMessage.classList.contains("hidden") &&
      errorMessage.classList.add("hidden");
    player.setName(inputFieldName.value);
    playerName.textContent = player.getName();
    closeModal();
  } else {
    errorMessage.classList.remove("hidden");
  }
});

endGameBtn.addEventListener("click", function () {
  console.log("endGameBtn: " + player);
  addToPLayerList(player);
  loadPlayerList();
  closeModal();
  initNewGame();
});

const addToPLayerList = (newPlayer) => {
  let existingPlayerList = JSON.parse(localStorage.getItem("players")) || [];
  existingPlayerList.push(newPlayer);
  localStorage.setItem("players", JSON.stringify(existingPlayerList));
};
