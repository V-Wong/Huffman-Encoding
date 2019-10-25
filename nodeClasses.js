TOP_PADDING = 40;
LEFT_PADDING = 40;
SQUARE_HEIGHT = document.getElementById("canvas").clientHeight/8;
SQUARE_WIDTH = document.getElementById("canvas").clientHeight/8;

class Node {
    constructor(symbol, probability, col, row, parent) {
        this.symbol = symbol;
        this.probability = probability;
        this.col = col;
        this.row = row;
        this.parent = parent;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    }
    get getX() {
        return LEFT_PADDING + this.col * SQUARE_WIDTH * 4;
    }
    get getY() {
        return TOP_PADDING + this.row * SQUARE_HEIGHT * 2;
    }
    drawLink() {
        this.ctx.strokeStyle = "white";
        this.ctx.setLineDash([5, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT/2);
        this.ctx.lineTo(this.parent[0].getX + SQUARE_WIDTH, this.parent[0].getY + SQUARE_HEIGHT/2);
        this.ctx.stroke();
        this.ctx.setLineDash([0]);
    }
}

class SquareNode extends Node {
    draw() {
        this.ctx.fillStyle = "#00897b";
        this.ctx.fillRect(this.getX, this.getY, SQUARE_WIDTH, SQUARE_HEIGHT);

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`${this.probability}`, 
                     this.getX + SQUARE_WIDTH/2 - 25, 
                     this.getY + SQUARE_HEIGHT/2);
    }
}

class CircleNode extends Node {
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.getX + SQUARE_WIDTH/2, this.getY + SQUARE_HEIGHT/2, SQUARE_WIDTH/2, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#00897b";
        this.ctx.fill();

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`${this.probability}`, 
                     this.getX + SQUARE_WIDTH/2 - 25, 
                     this.getY + SQUARE_HEIGHT/2);
    }
    drawLink() {
        this.ctx.strokeStyle = "white";

        this.ctx.beginPath();
        this.ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT/2);
        this.ctx.lineTo(this.parent[0].getX + SQUARE_WIDTH, this.parent[0].getY + SQUARE_HEIGHT/2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT/2);
        this.ctx.lineTo(this.parent[1].getX + SQUARE_WIDTH, this.parent[1].getY + SQUARE_HEIGHT/2);
        this.ctx.stroke();

        this.ctx.font = "30px Arial";
        this.ctx.fillText(0, this.getX - 25, this.getY + 60);
        this.ctx.fillText(1, this.getX - 25, this.getY + 150);
    }
}