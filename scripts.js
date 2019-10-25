let main = function(nodes) {
    setupCanvas();

    console.log(nodes);

    nodes.sort((a, b) => a.probability <= b.probability ? 1 : -1);

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

let getInput = function() {
    let inputs = document.getElementsByClassName("code-input");

    let returnInput = [];

    for (let input of inputs) {
        if (input.value) {
            returnInput.push(new SquareNode("0", parseFloat(input.value), 0, 0));
        }
    }

    return returnInput;
}

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    main(getInput());
});
