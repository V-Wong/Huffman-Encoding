TOLERANCE = 0.00001
SUBMITTED = false;

let main = function() {
    setupCanvas();

    generateInputFields(8);

    document.getElementById("submit").addEventListener("click", (event) => {
        event.preventDefault();
        let nodes = getInput();
        if (nodes.length > 1) {
            if (Math.abs(sumProbabilities(nodes) - 1) < TOLERANCE) {
                nodes.sort((a, b) => a.probability <= b.probability ? 1 : -1);

                huffmanEncode(nodes);
                writeSymbols(nodes);
                writeEncoding(nodes);
            
                SUBMITTED = true;
            } else {
                window.alert("Please ensure probablities sum to 1");
            }
        } else {
            window.alert("Please input at least 2 symbols");
        }
    });

    let encodingLabels = document.getElementsByClassName("encoding-text");
    for (let element of encodingLabels) {
        element.addEventListener("mouseover", () => {
            let nodes = getInput();
            if (SUBMITTED) {
                setupCanvas();
                nodes.sort((a, b) => a.probability <= b.probability ? 1 : -1);

                let root = huffmanEncode(nodes);
                writeSymbols(nodes);
                writeEncoding(nodes);
            
                tracePath(root, element.innerText.replace("Encoding: ", ""));
                element.style.color = "red";
                
                for (let otherElement of encodingLabels) {
                    if (otherElement !== element) {
                        otherElement.style.color = "white";
                    }
                }
            }
        });
    }

    document.getElementById("clear").addEventListener("click", (event) => {
        event.preventDefault();
        clearInput();
    })
}

let setupCanvas = function() {
    let canvas = document.getElementById("canvas");
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
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
    submitButton.classList.add("buttons");
    submitButton.type = "button";
    submitButton.id = "submit";
    submitButton.value = "Submit";
    submitButton.style.backgroundColor = "#4CAF50";

    let clearButton = document.createElement("input");
    clearButton.classList.add("controls");
    clearButton.classList.add("buttons");
    clearButton.type = "button";
    clearButton.id = "clear";
    clearButton.value = "Clear";
    clearButton.style.marginLeft = "1%";

    document.getElementById("control-panel").appendChild(submitButton);
    document.getElementById("control-panel").appendChild(clearButton);
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

let clearInput = function() {
    let inputs = document.getElementsByClassName("code-input");

    for (let input of inputs) {
        input.value = "";
    }
}

let writeSymbols = function(nodes) {
    for (let node of nodes) {
        console.log(node);
        node.writeSymbol();
    }
}

let writeEncoding = function(nodes) {
    console.log(nodes);

    for (let node of nodes) {
        let element = document.getElementsByClassName("encoding-text")[node.symbol];
        element.innerText = `Encoding: ${node.encoding}`;
    }
}

main();
