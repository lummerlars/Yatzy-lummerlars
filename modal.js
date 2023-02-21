// import Player from "./player";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const submitBtn = document.querySelector(".btn-submit");
let errorMessage = document.getElementById("error-message");
let playerName = document.getElementById("playerName");

import Player from "./player.js";
let player = new Player();

export const openModal = (playerObject) => {
  player = playerObject;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// openModalBtn.addEventListener("click", function () {
//   openModal();
// });

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

submitBtn.addEventListener("click", function () {
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
