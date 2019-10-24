SQUARE_HEIGHT = 100;
SQUARE_WIDTH = 100;

let setupCanvas = function() {
    let canvas = document.getElementById("canvas");
    let rect = canvas.getBoundingClientRect();
    let dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
}

let round = function(num) {
    return Math.round(num * 100) / 100;
}

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
        ctx.beginPath();
        ctx.moveTo(this.getX, this.getY + SQUARE_HEIGHT/2);
        ctx.lineTo(this.parent[0].getX + SQUARE_WIDTH, this.parent[0].getY + SQUARE_HEIGHT/2);
        ctx.stroke();
    }
}

class SquareNode extends Node {
    draw() {
        let ctx = this.getCtx;

        ctx.beginPath();
        ctx.rect(this.getX, this.getY, 100, 100);
        ctx.stroke();

        ctx.font = "30px Arial";
        ctx.fillText(`P = ${this.probability}`, 
                     this.col * SQUARE_WIDTH * 2, 
                     this.row * 150 + SQUARE_HEIGHT/2);
    }
}

class CircleNode extends Node {
    draw() {
        let ctx = this.getCtx;

        ctx.beginPath();
        ctx.arc(this.getX + 50, this.getY + 50, 50, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.font = "30px Arial";
        ctx.fillText(`P = ${this.probability}`, 
                     this.col * SQUARE_WIDTH * 2, 
                     this.row * 150 + SQUARE_HEIGHT/2);
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

let main = function() {
    setupCanvas();

    let nodes = [];

    nodes[0] = new SquareNode("0", 0.1, 0, 0);
    nodes[1] = new SquareNode("1", 0.2, 0, 1);
    nodes[2] = new SquareNode("2", 0.3, 0, 2);
    nodes[3] = new SquareNode("3", 0.4, 0, 3);

    nodes.sort((a, b) => a.probability < b.probability ? 1 : -1);

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].row = i;
        nodes[i].draw();
    }

    let nodes1 = genNewColumn(nodes);

    for (let i = 0; i < nodes1.length; i++) {
        nodes1[i].row = i;
        nodes1[i].col = 1;
        nodes1[i].draw();
        nodes1[i].drawLink();
    }
}


let genNewColumn = function(nodes) {
    let newNodes = []

    let minNode1 = nodes[nodes.length - 1];
    let minNode2 = nodes[nodes.length - 2];

    for (let i = 0; i < nodes.length - 2; i++) {
        newNodes[i] = new SquareNode(nodes[i].symbol, nodes[i].probability, 
                                     i, i, [nodes[i]]);
    }

    newNodes[newNodes.length] = new CircleNode(minNode1.symbol + minNode2.symbol, 
                                               round(minNode1.probability + minNode2.probability),
                                               newNodes.length, newNodes.length, [minNode1, minNode2]);

    newNodes.sort((a, b) => a.probability < b.probability ? 1 : -1);

    return newNodes;
}

main();