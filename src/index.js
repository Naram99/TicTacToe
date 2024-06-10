import { Game } from "./modules/game.js";

const newGameBtn = document.querySelector(".new-game-button");

newGameBtn.addEventListener("click", () => {
    const playerX = document.querySelector("#player-x-name").value;
    const playerO = document.querySelector("#player-o-name").value;
    const bestOf = parseInt(document.querySelector("#best-of").value);

    if(bestOf) {
        const game = new Game(bestOf, playerX, playerO);
    }
})
