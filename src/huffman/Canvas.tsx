import React, { useEffect, useRef } from "react";

import Node, { SquareNode } from "./nodeClasses";
import huffmanEncode from "./huffmanEncode";

function Canvas(props: { nodes: Array<SquareNode> }) {
  const canvasRef = useRef(null);
  const { nodes } = props;

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

      if (nodes.length)
        huffmanEncode(nodes, canvasRef.current);
    }
  }, [canvasRef, nodes]);

  return (
    <canvas ref={canvasRef} style={{ backgroundColor: "black" }} />
  );
}

export default Canvas;