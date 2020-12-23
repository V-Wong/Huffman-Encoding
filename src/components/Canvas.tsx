import React, { useEffect, useRef } from "react";
import {Card} from "react-bootstrap";

import AbstractNode from "../huffman/Node";
import HuffmanEncoder from "../huffman/HuffmanEncoder";

function Canvas(props: { nodes: Array<AbstractNode>, encoding: string }) {
  const canvasRef = useRef(null);
  const { nodes, encoding } = props;

  useEffect(() => {
    if (canvasRef?.current) {
      // @ts-ignore
      canvasRef.current.style.width = '100%';
      // @ts-ignore
      canvasRef.current.style.height = 'max(100%, 80vh)';
      // @ts-ignore
      canvasRef.current.width = canvasRef.current.getBoundingClientRect().width;
      // @ts-ignore
      canvasRef.current.height = canvasRef.current.getBoundingClientRect().height;
    }
  }, []);

  useEffect(() => {
    if (canvasRef?.current) {
      // @ts-ignore
      canvasRef.current.getContext('2d').clearRect(0, 0, 10000, 10000);

      // @ts-ignore
      const encoder = new HuffmanEncoder(canvasRef.current.getContext('2d'));
      
      if (nodes.length) {
        encoder.run(nodes);
        if (encoding) encoder.tracePath(encoding);
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
        <canvas id="canvas" ref={canvasRef} />
      </Card.Body>
    </Card>
  );
}

export default Canvas;