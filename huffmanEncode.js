// Huffman Encoding Algorithm
let huffmanEncode = function(nodes) {
    // First takes a sorted list of nodes by probability.

    // Each level (column) of the Huffman tree.
    // The first level is all the nodes.
    // The last level would be the root node only.
    let levels = [nodes];

    // newLevel holds the new levels
    let newLevel = nodes;

    // Progressively generate new levels (Huffman levels)
    // until we get a level with only a single node.
    let i = 0;
    while (newLevel.length > 1) {
        for (let j = 0; j < newLevel.length; j++) {
            newLevel[j].row = j;
            newLevel[j].col = i;
            newLevel[j].draw();
            if (newLevel[j].parent != undefined) {
                newLevel[j].drawLink();
            }
        }
        i++;
        newLevel = genNewLevel(newLevel);
        levels.push(newLevel);
    }
    
    // Draw the root node
    newLevel[0].row = 0;
    newLevel[0].col = levels.length - 1;
    newLevel[0].draw();
    newLevel[0].drawLink();

    // Perform a depth first travel from root node to leaf nodes.
    // Progressively build up the encoding and store them in leaf nodes.
    let root = levels[levels.length - 1][0];
    dfTraversal(root, "");

    return root;
}

// For nodes of equal probability, store the circle node
// above the square node if necessary.
let circleAboveSquares = function(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length - 1; j++) {
            if (nodes[j].probability == nodes[j + 1].probability
                    && nodes[j + 1].constructor.name == "CircleNode") {
                let temp = nodes[j];
                nodes[j] = nodes[j + 1];
                nodes[j + 1] = temp;
            }
        }
    }

    return nodes;
}

let genNewLevel = function(nodes) {
    let newLevel = []

    // Get the two smallest nodes by probability.
    let minNode1 = nodes[nodes.length - 1];
    let minNode2 = nodes[nodes.length - 2];

    // Copy all the nodes from the previous level
    // excluding the two min nodes.
    for (let i = 0; i < nodes.length - 2; i++) {
        newLevel[i] = new SquareNode(nodes[i].symbol, nodes[i].probability, 
                                     i, i, [nodes[i]]);
    }

    // Create a circle node which is the combination of the two min nodes.
    newLevel[newLevel.length] = new CircleNode(minNode1.symbol + minNode2.symbol, 
                                               round(minNode1.probability + minNode2.probability),
                                               newLevel.length, newLevel.length, [minNode2, minNode1]);


    // Sort the new level, then place circle node above square nodes.
    newLevel.sort((a, b) => a.probability <= b.probability ? 1 : -1);
    newLevel = circleAboveSquares(newLevel);

    return newLevel;
}

// Recursive depth first traversal.
// We want to trace all paths from root node to leaf nodes.
// We start with an empty encoding string
// and build it up by appending 1 or 0 
// when recursing on any circle node.
let dfTraversal = function(root, encoding) {
    if (!root.parent || !root) {
        root.encoding = encoding;
    } else if (root.constructor.name == "SquareNode") {
        dfTraversal(root.parent[0], encoding);
    } else {
        dfTraversal(root.parent[0], encoding + "0");
        dfTraversal(root.parent[1], encoding + "1");
    }
}

let tracePath = function(root, encoding) {
    let i = 0;
    while (root.parent) {
        if (root.parent.length == 2) {
            console.log(encoding[i]);
            root.tracePath(encoding[i]);
            root = root.parent[encoding[i]];
            i++;
        } else {
            root.tracePath(0);
            root = root.parent[0];
        }
    }
}