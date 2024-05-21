let winningTrios = [".row-1", ".row-2", ".row-3", ".col-1", ".col-2", ".col-3", ".dia-1", ".dia-2"]

class Game {
    constructor(startingPlayer) {
        this.Xscore = 0;
        this.Oscore = 0;
        this.roundCounter = 1;
        this.activePlayer = startingPlayer;

        this.winningLineCt = document.querySelector(".winning-line-container");
        this.winningLineCt.classList.remove("active")

        this.winningLine = document.querySelector(".winning-line")

        this.announcerUpdate(this.activePlayer);
        
        this.eventListenerCreation(".square");
    }

    eventListenerCreation(selector) {
        let squares = document.querySelectorAll(selector);
        console.log(squares);

        squares.forEach(square => {
            square.addEventListener("click", () => {
                square.innerHTML = this.activePlayer;

                let check = this.winCheck(this.roundCounter);

                if(check) {
                    this.announcerUpdate(this.activePlayer, " won.")
                    this.winningLinePlacement(check);
                    console.log(check);
                } else {
                    this.roundCounter++;
                    //console.log(this.winCheck());
                    if(this.activePlayer === "X") 
                        this.activePlayer = "O";
                    else
                        this.activePlayer = "X";
                    this.announcerUpdate(this.activePlayer)
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

    announcerUpdate(active, text = " turn.") {
        this.announcer = "Player " + active + text;
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
}

let game = new Game("X");