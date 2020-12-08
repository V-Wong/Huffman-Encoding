import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Canvas from "./Canvas";
import { SquareNode } from "./nodeClasses";

function HuffmanPanel() {
  const [nodesList, setNodesList] = useState<Array<SquareNode>>([] as Array<SquareNode>);
  const inputs = [0, 0, 0, 0];

  function handleSubmit() {
    const newNodes = inputs.filter(x => x)
                           .map((e, i) => new SquareNode(i, e, 0, 0));
    setNodesList(newNodes);
  }

  return (
    <Container>
      <Row>
        <Col xs={9} style={{ height: "50vh" }}>
          <Canvas nodes={nodesList} />
        </Col>

        <Col xs={2}>
          <div>
            <h2 style={{ margin: "auto", marginBottom: "10px", marginTop: "10px" }}>Enter Symbols</h2>
            {
              inputs.map((_, i) => {
                const input = <input type="text" onChange={e => inputs[i] = parseFloat(e.target.value)}></input>;
                return input;
              })
            }
            <div className="buttons-container">
              <input type="button" value="Submit" onClick={handleSubmit} />
              <input type="button" value="Clear" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default HuffmanPanel;