class Game {
    static scoreboardTemplate = `
        <div class="scoreboard">
            <div class="scoreboard-player player-x">X</div>
            <div class="Xscore"></div>
            <div class="dash">-</div>
            <div class="Oscore"></div>
            <div class="scoreboard-player player-o">O</div>
        </div>
    `;

    constructor(bestOf) {
        this.Xscore = 0;
        this.Oscore = 0;

        
        this.newGameBtn = document.querySelector(".new-game-button");
        this.newGameBtn.addEventListener("click", () => {
            this.playerXName = document.querySelector("#player-x-name").value;
            this.playerOName = document.querySelector("#player-o-name").value;
            
            this.scoreBoardSetup(".game-container", this.playerXName, this.playerOName);
            this.scoreBoardUpdate();

            this.roundStart();
        })
    }

    scoreBoardSetup(previousElementSelector, playerXName, playerOName) {
        this.scoreboard = document.createElement("div");
        this.scoreboard.classList.add("scoreboard-container");
        this.scoreboard.innerHTML = Game.scoreboardTemplate;

        document.querySelector(previousElementSelector).insertAdjacentElement("beforebegin", this.scoreboard);

        this.scoreboard.querySelector(".player-x").innerHTML = playerXName + " (X)";
        this.scoreboard.querySelector(".player-o").innerHTML = playerOName + " (O)";
    }

    scoreBoardUpdate() {
        this.scoreboard.querySelector(".Xscore").innerHTML = this.Xscore;
        this.scoreboard.querySelector(".Oscore").innerHTML = this.Oscore;
    }

    async roundStart() {
        let round = new Round();
        let roundResult = await round.start();
        console.log(roundResult);
    }
}

class Round {
    static template = `
        <div class="game">
            <div class="row">
                <div class="square col-1 row-1 dia-1"></div>
                <div class="square col-2 row-1"></div>
                <div class="square col-3 row-1 dia-2"></div>
            </div>
            <div class="row">
                <div class="square col-1 row-2"></div>
                <div class="square col-2 row-2 dia-1 dia-2"></div>
                <div class="square col-3 row-2"></div>
            </div>
            <div class="row">
                <div class="square col-1 row-3 dia-2"></div>
                <div class="square col-2 row-3"></div>
                <div class="square col-3 row-3 dia-1"></div>
            </div>
        </div>
        <div class="winning-line-container">
            <div class="winning-line"></div>
        </div>
    `;

    constructor() {
        document.querySelector(".game-container").innerHTML = Round.template;
        this.activePlayer = "X";
        this.roundCounter = 1;
    }

    start() {
        return new Promise(resolve => {
            let squares = document.querySelectorAll(".square");

            squares.forEach(square => {
                square.innerHTML = "";
                square.addEventListener("click", () => {
                    square.innerHTML = this.activePlayer;

                    console.log(this.roundCounter);

                    let check = this.winCheck(this.roundCounter);

                    if(check) {
                        //this.announcerUpdate(this.activePlayer, "won")
                        //this.winningLinePlacement(check);
                        resolve(this.activePlayer);
                    } else if (!check && this.roundCounter === 9){
                        resolve("Tie")
                    } else {
                        this.roundCounter++;
                        if(this.activePlayer === "X") 
                            this.activePlayer = "O";
                        else
                            this.activePlayer = "X";
                        //this.announcerUpdate(this.activePlayer, "turn");
                    }

                }, {once: true});
            });
        })
    }

    winCheck(roundCounter) {
        if(roundCounter > 4) {
            for(let trio of winningTrios) {
                let checkedSquares = document.querySelectorAll(trio);
                if(checkedSquares[0].innerHTML === checkedSquares[1].innerHTML 
                    && checkedSquares[0].innerHTML === checkedSquares[2].innerHTML
                    && checkedSquares[0].innerHTML !== "")
                    return trio;
            }
        }
        return false;
    }

    announcerUpdate(active, text) {
        switch (text) {
            case "turn":
                this.announcer = "Player " + active + " " + text + ".";
                break;

            case "won":
                this.announcer = "Player " + active + " " + text + ".";
                break;

            case "Tie":
                this.announcer = text + ".";
                break;
        
            default:
                break;
        }
        
        document.querySelector(".announcer").innerHTML = this.announcer;
    }
}

let winningTrios = [".row-1", ".row-2", ".row-3", ".col-1", ".col-2", ".col-3", ".dia-1", ".dia-2"];

let game = new Game(5);

