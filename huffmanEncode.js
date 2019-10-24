let huffmanEncode = function(nodes) {
    let columns = [nodes];
    let newNodes = nodes;

    let i = 0;
    while (newNodes.length > 1) {
        for (let j = 0; j < newNodes.length; j++) {
            newNodes[j].row = j;
            newNodes[j].col = i;
            newNodes[j].draw();
            if (newNodes[j].parent != undefined) {
                newNodes[j].drawLink();
            }
        }
        i++;
        newNodes = genNewColumn(newNodes);
        columns.push(newNodes);
    }

    newNodes[0].row = 0;
    newNodes[0].col = columns.length - 1;
    newNodes[0].draw();
    newNodes[0].drawLink();

    return columns;
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

    newNodes.sort((a, b) => a.probability <= b.probability ? 1 : -1);

    return newNodes;
}