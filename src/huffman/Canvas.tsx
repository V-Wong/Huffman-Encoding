import React, { useEffect, useRef } from "react";

import Node from "./nodeClasses";

function Canvas(props: { nodes: Array<Node> }) {
  const canvasRef = useRef(null);
  const { nodes } = props;

  useEffect(() => {
    if (canvasRef?.current) {
      // @ts-ignore
      canvasRef.current.style.width = '100%';
      // @ts-ignore
      canvasRef.current.style.height = '100%';
    }
  }, [canvasRef]);

  return (
    <canvas ref={canvasRef} id="canvas" height={"100%"} width={"100%"} />
  );
}

export default Canvas;