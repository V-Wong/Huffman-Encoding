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

let setEncodingText = function(symbol) {
    let container = document.getElementById(`symbol${symbol}`).parentElement;

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

generateInputFields(8);
setEncodingText(0);

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    main(getInput());
});
