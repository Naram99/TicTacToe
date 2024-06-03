let winningTrios = [".row-1", ".row-2", ".row-3", ".col-1", ".col-2", ".col-3", ".dia-1", ".dia-2"];

let Xscore = 0;
let Oscore = 0;

class Game {
    constructor(startingPlayer) {
        this.roundCounter = 1;
        this.activePlayer = startingPlayer;

        this.winningLineCt = document.querySelector(".winning-line-container");
        this.winningLineCt.classList.remove("active");

        this.winningLine = document.querySelector(".winning-line");

        document.querySelector(".new-game-button").classList.remove("active");

        this.announcerUpdate(this.activePlayer, "turn");
        
        this.eventListenerCreation(".square");
    }

    eventListenerCreation(selector) {
        let squares = document.querySelectorAll(selector);

        squares.forEach(square => {
            square.innerHTML = "";
            square.addEventListener("click", () => {
                square.innerHTML = this.activePlayer;

                console.log(this.roundCounter);

                let check = this.winCheck(this.roundCounter);

                if(check) {
                    this.announcerUpdate(this.activePlayer, "won")
                    this.winningLinePlacement(check);
                    this.gameEnd(this.activePlayer);
                } else if (!check && this.roundCounter === 9){
                    this.gameEnd("Tie");
                } else {
                    this.roundCounter++;
                    if(this.activePlayer === "X") 
                        this.activePlayer = "O";
                    else
                        this.activePlayer = "X";
                    this.announcerUpdate(this.activePlayer, "turn");
                }

            }, {once: true});
        });
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

    winningLinePlacement(line) {
        this.winningLineCt.classList.add("active");
        switch (line) {
            case ".dia-1":
                this.winningLine.style.transform = "rotate(45deg)";
                break;

            case ".dia-2":
                this.winningLine.style.transform = "rotate(135deg)";
                break;
                
            case ".col-1":
                this.winningLine.style.transform = "translateX(-205px) rotate(90deg)";
                break;

            case ".col-2":
                this.winningLine.style.transform = "rotate(90deg)";
                break;

            case ".col-3":
                this.winningLine.style.transform = "translateX(205px) rotate(90deg)";
                break;

            case ".row-1":
                this.winningLine.style.transform = "translateY(-205px)";
                break;

            case ".row-3":
                this.winningLine.style.transform = "translateY(205px)";
                break;
        
            default:
                break;
        }
    }

    gameEnd(result) {
        switch (result) {

            case "X":
                this.announcerUpdate(result, "won");
                Xscore++;
                document.querySelector(".Xscore").innerHTML = Xscore;
                break;

            case "O":
                this.announcerUpdate(result, "won");
                Oscore++;
                document.querySelector(".Oscore").innerHTML = Oscore;
                break;
        
            default:
                this.announcerUpdate("", "Tie");
                break;
        }
        document.querySelector(".new-game-button").classList.add("active");
    }

}

let game = new Game("X");

const newGameBtn = document.querySelector(".new-game-button");

newGameBtn.addEventListener("click", () => {
    if(game.activePlayer === "X")
        game = new Game("O");
    else
        game = new Game("X");
})