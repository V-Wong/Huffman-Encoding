import React, { useEffect, useRef } from "react";
import {Card} from "react-bootstrap";

import { SquareNode } from "../huffman/Node";
import huffmanEncode, { tracePath } from "../huffman/huffmanEncode";

function Canvas(props: { nodes: Array<SquareNode>, encoding: string }) {
  const canvasRef = useRef(null);
  const { nodes, encoding } = props;

  useEffect(() => {
    if (canvasRef?.current) {
      // @ts-ignore
      canvasRef.current.style.width = '100%';
      // @ts-ignore
      canvasRef.current.style.height = '100%';
      // @ts-ignore
      canvasRef.current.width = canvasRef.current.getBoundingClientRect().width;
      // @ts-ignore
      canvasRef.current.height = canvasRef.current.getBoundingClientRect().height;
    }
  }, []);

  useEffect(() => {
    if (canvasRef?.current) {
      for (const node of nodes)
        node.canvas = canvasRef.current;

      // @ts-ignore
      canvasRef.current.getContext('2d').clearRect(0, 0, 10000, 10000);

      if (nodes.length) {
        const root = huffmanEncode(nodes, canvasRef.current);
        if (encoding) tracePath(root, encoding);

        for (const node of nodes)
          node.writeSymbol();
      }
    }
  }, [canvasRef, nodes, encoding]);

  return (
    <Card 
      className="text-center" 
      style={{height: "100%"}}
    >
      <Card.Header>Rendered Huffman Tree</Card.Header>
      <Card.Body>
        <canvas id="canvas" ref={canvasRef} style={{ backgroundColor: "black" }} />
      </Card.Body>
    </Card>
  );
}

export default Canvas;