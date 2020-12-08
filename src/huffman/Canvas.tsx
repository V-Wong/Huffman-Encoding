import React, { useEffect, useRef } from "react";

import { SquareNode } from "./nodeClasses";
import huffmanEncode, { tracePath } from "./huffmanEncode";

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

    if (canvasRef?.current !== null) {
      for (const node of nodes)
        node.canvas = canvasRef.current;

      if (nodes.length) {
        const root = huffmanEncode(nodes, canvasRef.current);
        if (encoding) tracePath(root, encoding);
      }
    }
  }, [canvasRef, nodes, encoding]);

  return (
    <canvas id="canvas" ref={canvasRef} style={{ backgroundColor: "black" }} />
  );
}

export default Canvas;