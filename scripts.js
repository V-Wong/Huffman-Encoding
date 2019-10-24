SQUARE_HEIGHT = 100;
SQUARE_WIDTH = 100;

let main = function() {
    setupCanvas();

    let nodes = [];

    nodes[0] = new SquareNode("0", 0.1, 0, 0);
    nodes[1] = new SquareNode("1", 0.2, 0, 1);
    nodes[2] = new SquareNode("2", 0.3, 0, 2);
    nodes[3] = new SquareNode("3", 0.4, 0, 3);

    nodes.sort((a, b) => a.probability < b.probability ? 1 : -1);

    huffmanEncode(nodes);
}

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

main();