import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Canvas from "./Canvas";
import { SquareNode } from "./nodeClasses";

function HuffmanPanel() {
  const nodesList = [new SquareNode(0.5), new SquareNode(0.5)];

  return (
    <Container>
      <Row>
        <Col xs={9}>
          <Canvas nodes={nodesList} />
        </Col>

        <Col xs={2}>
          <div>
            <h2 style={{ margin: "auto", marginBottom: "10px", marginTop: "10px" }}>Enter Symbols</h2>
            <div className="buttons-container">
              <input type="button" value="Submit" />
              <input type="button" value="Clear" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default HuffmanPanel;