import AbstractNode, { SquareNode, CircleNode } from "./Node";

// Huffman Encoding Algorithm
class HuffmanEncode {
    ctx: any;
    root: AbstractNode | null;

    constructor(ctx: any) {
        this.ctx = ctx;
        this.root = null;
    }

    run(nodes: Array<AbstractNode>) {
        nodes.sort((a, b) => a.probability <= b.probability ? 1 : -1);

        for (const node of nodes)
          node.writeSymbol(this.ctx);
        
        let levels = [nodes];
        let newLevel = nodes;

        for (let col = 0; newLevel.length > 1; col++) {
            for (let row = 0; row < newLevel.length; row++) {
                newLevel[row].row = row;
                newLevel[row].col = col;
                newLevel[row].draw(this.ctx);
                if (newLevel[row].hasParent()) {
                    newLevel[row].drawLink(this.ctx);
                }
            }
            newLevel = this.genNewLevel(newLevel);
            levels.push(newLevel);
        }
    
        newLevel[0].row = 0;
        newLevel[0].col = levels.length - 1;
        newLevel[0].draw(this.ctx);
        newLevel[0].drawLink(this.ctx);
    
        this.root = levels[levels.length - 1][0];
        this.dfTraversal(this.root, "");
    }

    circleAboveSquares(nodes: Array<AbstractNode>) {
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
    
    genNewLevel(nodes: Array<AbstractNode>) {
        let newLevel = []
    
        // Get the two smallest nodes by probability.
        let minNode1 = nodes[nodes.length - 1];
        let minNode2 = nodes[nodes.length - 2];

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
        newLevel = this.circleAboveSquares(newLevel);
    
        return newLevel;
    }

    dfTraversal(root: AbstractNode, encoding: string) {
        if (root == null || !root || !root.hasParent()) {
            root.encoding = encoding;
        } else if (root.type === "SquareNode") {
            this.dfTraversal(root.parents[0], encoding);
        } else {
            this.dfTraversal(root.parents[0], encoding + "0");
            this.dfTraversal(root.parents[1], encoding + "1");
        }
    }
    
    tracePath(encoding: string) {
        let root = this.root;

        if (root) {
            let i = 0;
            while (root.hasParent()) {
                if (root.parents.length === 2) {
                    root.tracePath(this.ctx, Number(encoding[i]));
                    root = root.parents[Number(encoding[i])];
                    i++;
                } else {
                    root.tracePath(this.ctx, 0);
                    root = root.parents[0];
                }
            }
        }
    }
    
    untracePath(root: AbstractNode | null) {
        if (!root) {
            return;
        } else {
            if (root.hasParent()) {
                root.drawLink(this.ctx);
                this.untracePath(root.parents[0]);
                this.untracePath(root.parents[1]);
            }
        }
    }
}


function round(num: number) {
    return Math.round(num * 100) / 100;
}

export default HuffmanEncode;