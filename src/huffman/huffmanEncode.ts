import AbstractNode, { SquareNode, CircleNode } from "./Node";

// Huffman Encoding Algorithm
function huffmanEncode(nodes: Array<AbstractNode>, canvas: any) {
    nodes.sort((a, b) => a.probability <= b.probability ? 1 : -1);

    // First takes a sorted list of nodes by probability.

    // Each level (column) of the Huffman tree.
    // The first level is all the nodes.
    // The last level would be the root node only.
    let levels = [nodes];

    // newLevel holds the new levels
    let newLevel = nodes;

    // Progressively generate new levels (Huffman levels)
    // until we get a level with only a single node.

    for (let col = 0; newLevel.length > 1; col++) {
        for (let row = 0; row < newLevel.length; row++) {
            newLevel[row].row = row;
            newLevel[row].col = col;
            newLevel[row].canvas = canvas;
            newLevel[row].draw();
            if (newLevel[row].parent !== undefined) {
                newLevel[row].drawLink();
            }
        }
        newLevel = genNewLevel(newLevel);
        levels.push(newLevel);
    }

    // Draw the root node
    newLevel[0].row = 0;
    newLevel[0].col = levels.length - 1;
    newLevel[0].canvas = canvas;
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
function circleAboveSquares(nodes: Array<AbstractNode>) {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length - 1; j++) {
            if (nodes[j].probability === nodes[j + 1].probability
                && nodes[j + 1].type === "CircleNode") {
                let temp = nodes[j];
                nodes[j] = nodes[j + 1];
                nodes[j + 1] = temp;
            }
        }
    }

    return nodes;
}

function genNewLevel(nodes: Array<AbstractNode>) {
    let newLevel = []

    // Get the two smallest nodes by probability.
    let minNode1 = nodes[nodes.length - 1];
    let minNode2 = nodes[nodes.length - 2];

    // Copy all the nodes from the previous level
    // excluding the two min nodes.
    for (let i = 0; i < nodes.length - 2; i++) {
        newLevel.push(new SquareNode(nodes[i].symbol,
            nodes[i].probability, i, i, [nodes[i]]));
    }

    // Create a circle node which is the combination of the two min nodes.
    newLevel.push(new CircleNode(minNode1.symbol + minNode2.symbol,
        round(minNode1.probability + minNode2.probability),
        newLevel.length, newLevel.length, [minNode2, minNode1]));

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
function dfTraversal(root: AbstractNode, encoding: string) {
    if (root == null || !root || !root.parent) {
        root.encoding = encoding;
    } else if (root.type === "SquareNode") {
        dfTraversal(root.parent[0], encoding);
    } else {
        dfTraversal(root.parent[0], encoding + "0");
        dfTraversal(root.parent[1], encoding + "1");
    }
}

function tracePath(root: AbstractNode, encoding: string) {
    let i = 0;
    while (root.parent) {
        if (root.parent.length === 2) {
            root.tracePath(encoding[i]);
            root = root.parent[encoding[i]];
            i++;
        } else {
            root.tracePath(0);
            root = root.parent[0];
        }
    }
}

function untracePath(root: AbstractNode | null) {
    if (!root) {
        return;
    } else {
        if (root.parent) {
            root.drawLink();
            untracePath(root.parent[0]);
            untracePath(root.parent[1]);
        }
    }
}

function round(num: number) {
    return Math.round(num * 100) / 100;
}

export default huffmanEncode;
export { tracePath, untracePath };