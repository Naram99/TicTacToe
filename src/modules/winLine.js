export class WinningLine {
    constructor() {
        this.winningLineCt = document.querySelector(".winning-line-container");
        this.winningLine = document.querySelector(".winning-line")
    }

    activate(winningSelector) {
        this.winningLineCt.classList.add("active");
        switch (winningSelector) {
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

    remove() {
        this.winningLineCt.classList.remove("active");
    }
}