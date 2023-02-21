import { loadPlayerList } from "./gameSetup.js";

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
  player = playerObject;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
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
  addToPLayerList(player);
  loadPlayerList();
  closeModal();
});

const addToPLayerList = (newPlayer) => {
  let existingPlayerList = JSON.parse(localStorage.getItem("players")) || [];

  existingPlayerList.push(newPlayer);
  console.log(existingPlayerList);
  localStorage.setItem("players", JSON.stringify(existingPlayerList));
};
