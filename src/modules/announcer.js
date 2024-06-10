export class Announcer {
    constructor() {
        this.announcer = document.querySelector(".announcer");
    }

    say(event, player = "") {
        switch (event) {
            case "turn":
                this.text = "Player " + player + " turn.";
                break;

            case "win round":
                this.text = "Player " + player + " won this round."
                break;

            case "win game":
                this.text = "Player " + player + " won the game.";
                if(player === "Tie")
                    this.text = "Tie."
                break;
        
            default:
                this.text = "Tie.";
                break;
        }

        this.announcer.innerHTML = this.text;
    }
}