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
        return this.col * SQUARE_WIDTH * 2;
    }
    get getY() {
        return this.row * 150;
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
        this.ctx.fillRect(this.getX, this.getY, 100, 100);

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
        this.ctx.arc(this.getX + 50, this.getY + 50, 50, 0, 2 * Math.PI);
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
    }
}