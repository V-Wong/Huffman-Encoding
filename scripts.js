SQUARE_HEIGHT = 100;
SQUARE_WIDTH = 100;

let setupCanvas = function() {
    let canvas = document.getElementById("canvas");
    let rect = canvas.getBoundingClientRect();
    let dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
}

class Node {
    constructor(symbol, probability) {
        this.symbol = symbol;
        this.probability = probability;
    }
    get getCtx() {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        return ctx;
    }
}

class SquareNode extends Node {
    draw (col, row) {
        let ctx = this.getCtx;

        ctx.beginPath();
        ctx.rect(col * 10, row * 150, 100, 100);
        ctx.stroke();

        ctx.font = "30px Arial";
        ctx.fillText(`P = ${this.probability}`, 
                     col * 10 + SQUARE_WIDTH/2 - 45, 
                     row * 150 + SQUARE_HEIGHT/2);
    }
}

class CircleNode extends Node {
    draw(col, row) {
        let ctx = this.getCtx;

        ctx.beginPath();
        ctx.arc(col * 50, row * 50, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

let main = function() {
    setupCanvas();

    let nodes = [];

    nodes[0] = new SquareNode("0", 0.1);
    nodes[1] = new SquareNode("1", 0.2);
    nodes[2] = new SquareNode("2", 0.3);
    nodes[3] = new SquareNode("3", 0.4);

    nodes.sort((a, b) => a.probability < b.probability ? 1 : -1);

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].draw(1, i);
    }
}

main();