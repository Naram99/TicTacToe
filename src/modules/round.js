import { WinningLine } from "./winLine.js";
import { Announcer } from "./announcer.js";

const winningTrios = [".row-1", ".row-2", ".row-3", ".col-1", ".col-2", ".col-3", ".dia-1", ".dia-2"];

export class Round {
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

    constructor(startingPlayer) {
        document.querySelector(".game-container").innerHTML = Round.template;

        this.winningLine = new WinningLine();
        this.winningLine.remove();

        this.announcer = new Announcer();

        this.activePlayer = startingPlayer;
        this.roundCounter = 1;
    }

    start() {
        return new Promise(resolve => {
            let squares = document.querySelectorAll(".square");

            this.announcer.say("turn", this.activePlayer);

            squares.forEach(square => {
                square.innerHTML = "";
                square.addEventListener("click", () => {
                    square.innerHTML = this.activePlayer;

                    console.log(this.roundCounter);

                    let check = this.winCheck(this.roundCounter);

                    if(check) {
                        this.announcer.say("win round", this.activePlayer);
                        this.winningLine.activate(check);
                        resolve(this.activePlayer);
                    } else if (!check && this.roundCounter === 9){
                        resolve("Tie")
                    } else {
                        this.roundCounter++;
                        if(this.activePlayer === "X") 
                            this.activePlayer = "O";
                        else
                            this.activePlayer = "X";
                        this.announcer.say("turn", this.activePlayer);
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
}