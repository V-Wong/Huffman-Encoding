class Node {
    constructor(symbol, probability, col, row, parent) {
        this.symbol = symbol;
        this.probability = probability;
        this.col = col;
        this.row = row;
        this.parent = parent;
    }
    get getX() {
        return this.col * SQUARE_WIDTH * 2;
    }
    get getY() {
        return this.row * 150;
    }
    get getCtx() {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        return ctx;
    }
    drawLink() {
        let ctx = this.getCtx;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT/2);
        ctx.lineTo(this.parent[0].getX + SQUARE_WIDTH, this.parent[0].getY + SQUARE_HEIGHT/2);
        ctx.stroke();
        ctx.setLineDash([0]);
    }
}

class SquareNode extends Node {
    draw() {
        let ctx = this.getCtx;

        ctx.beginPath();
        ctx.rect(this.getX, this.getY, 100, 100);
        ctx.stroke();

        ctx.font = "30px Arial";
        ctx.fillText(`${this.probability}`, 
                     this.getX + SQUARE_WIDTH/2 - 25, 
                     this.getY + SQUARE_HEIGHT/2);
    }
}

class CircleNode extends Node {
    draw() {
        let ctx = this.getCtx;

        ctx.beginPath();
        ctx.arc(this.getX + 50, this.getY + 50, 50, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.font = "30px Arial";
        ctx.fillText(`${this.probability}`, 
                     this.getX + SQUARE_WIDTH/2 - 25, 
                     this.getY + SQUARE_HEIGHT/2);
    }
    drawLink() {
        let ctx = this.getCtx;
        ctx.beginPath();
        ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT/2);
        ctx.lineTo(this.parent[0].getX + SQUARE_WIDTH, this.parent[0].getY + SQUARE_HEIGHT/2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT/2);
        ctx.lineTo(this.parent[1].getX + SQUARE_WIDTH, this.parent[1].getY + SQUARE_HEIGHT/2);
        ctx.stroke();
    }
}