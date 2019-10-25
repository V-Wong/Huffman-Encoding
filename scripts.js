let main = function(nodes) {
    setupCanvas();

    console.log(nodes);

    nodes.sort((a, b) => a.probability <= b.probability ? 1 : -1);

    let newNodes = huffmanEncode(nodes);

    let root = newNodes[newNodes.length - 1][0];
    dfTraversal(root, "");
    writeEncoding(nodes);
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

let sumProbabilities = function(array) {
    let sum = 0;

    for (let element of array) {
        sum += element.probability;
    }

    return sum;
}

let generateInputFields = function(num) {
    for (let i = 0; i < num; i++) {
        let container = document.createElement("div");
        container.classList.add("controls");

        let input = document.createElement("input");
        input.type = "text";
        input.id = `symbol${i}`;
        input.classList.add("code-input");
        input.placeholder = `Probability for symbol ${i}`
        container.appendChild(input);

        let text = document.createElement("p");
        text.innerText = "Encoding: ";
        text.classList.add("encoding-text")
        container.appendChild(text);

        document.getElementById("control-panel").appendChild(container);
    }

    let submitButton = document.createElement("input");
    submitButton.classList.add("controls");
    submitButton.type = "button";
    submitButton.id = "submit";
    submitButton.value = "Submit";

    document.getElementById("control-panel").appendChild(submitButton);
}

let getInput = function() {
    let inputs = document.getElementsByClassName("code-input");

    let returnInput = [];

    let i = 0;
    for (let input of inputs) {
        if (input.value) {
            returnInput.push(new SquareNode(i, parseFloat(input.value), 0, 0));
        }
        i++;
    }

    return returnInput;
}

let writeEncoding = function(nodes) {
    console.log(nodes);

    for (let node of nodes) {
        let element = document.getElementsByClassName("encoding-text")[node.symbol];
        element.innerText = `Encoding: ${node.encoding}`;
    }
}

generateInputFields(8);

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    let nodes = getInput();
    if (sumProbabilities(nodes) === 1) {
        main(nodes);
    } else {
        window.alert("Please ensure probablities sum to 1");
    }
});
