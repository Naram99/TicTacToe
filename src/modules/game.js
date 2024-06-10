import { Round } from "./round.js";

export class Game {
    static scoreboardTemplate = `
        <div class="scoreboard">
            <div class="scoreboard-player player-x">X</div>
            <div class="Xscore"></div>
            <div class="dash">-</div>
            <div class="Oscore"></div>
            <div class="scoreboard-player player-o">O</div>
        </div>
        <div class="best-of-display"></div>
    `;

    /**
     * 
     * @param {number} bestOf a körök maximális száma
     * @param {string} playerX X játékos neve
     * @param {string} playerO O játékos neve
     */
    constructor(bestOf, playerX, playerO) {
        this.maxNumOfGames = bestOf;
        this.end = false;

        this.startingPlayer = "X";

        this.playerXName = playerX;
        this.Xscore = 0;


        this.playerOName = playerO;
        this.Oscore = 0;

        this.buttonSetup();

        this.scoreBoardSetup(".game-container", this.maxNumOfGames, this.playerXName, this.playerOName);
        this.scoreBoardUpdate();

        this.roundStart(this.startingPlayer);
        
    }

    scoreBoardSetup(previousElementSelector, bestOf, playerXName, playerOName) {
        this.scoreboard = document.createElement("div");
        this.scoreboard.classList.add("scoreboard-container");
        this.scoreboard.innerHTML = Game.scoreboardTemplate;

        document.querySelector(previousElementSelector).insertAdjacentElement("beforebegin", this.scoreboard);

        this.scoreboard.querySelector(".player-x").innerHTML = playerXName + " (X)";
        this.scoreboard.querySelector(".player-o").innerHTML = playerOName + " (O)";
        this.scoreboard.querySelector(".best-of-display").innerHTML = "Best of " + bestOf;
    }

    scoreBoardUpdate() {
        this.scoreboard.querySelector(".Xscore").innerHTML = this.Xscore;
        this.scoreboard.querySelector(".Oscore").innerHTML = this.Oscore;
    }

    buttonSetup() {
        document.querySelector(".new-game-button").classList.remove("active");
        document.querySelector(".next-round-button").addEventListener("click", () => {
            this.roundStart(this.startingPlayer);
        })
    }

    /**
     * 
     * @param {string} startingPlayer a kezdőjátékos
     * elindítja a kört, és megvárja a végeredményt
     * utána frissíti az eredményjelzőt és aktiválja az új meccs gombokat
     */
    async roundStart(startingPlayer) {
        document.querySelector(".next-round-button").classList.remove("active");

        let round = new Round(startingPlayer);
        this.roundResult = await round.start();

        
        switch (this.roundResult) {
            case "X":
                this.Xscore++;
                break;
                
            case "O":
                this.Oscore++;
                break;
                
            default:
                break;
        }
            
        this.scoreBoardUpdate();
        this.end = this.matchEndCheck();

        console.log(this.end);
        
        if(!this.end) {
            this.prepareNextRound();
            document.querySelector(".next-round-button").classList.add("active");
        }
        if(this.end) {
            document.querySelector(".new-game-button").classList.add("active");
            round.announcer.say("win game", this.end)

            document.querySelector(".new-game-button").addEventListener("click", () => {
                location.reload();
            })
        }
    }

    /**
     * megcseréli a kezdőjátékosokat
     */
    prepareNextRound() {
        switch (this.startingPlayer) {
            case "X":
                this.startingPlayer = "O";
                break;

            case "O":
                this.startingPlayer = "X";
                break;
        }
    }

    /**
     * az eredményből kiszámolja, hogy vége van-e a meccsnek
     * @returns a meccs eredményét adja vissza
     */
    matchEndCheck() {
        if(this.Xscore === Math.floor((this.maxNumOfGames / 2) + 1))
            return "X";
        if(this.Oscore === Math.floor((this.maxNumOfGames / 2) + 1))
            return "O";
        if(this.Xscore + this.Oscore === this.maxNumOfGames)
            return "Tie";
        return false;
    }
}



