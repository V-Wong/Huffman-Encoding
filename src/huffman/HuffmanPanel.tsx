import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Canvas from "./Canvas";
import { SquareNode } from "./nodeClasses";

function HuffmanPanel() {
  const nodesList = [new SquareNode("1", 0.4, 0, 0), new SquareNode("2", 0.3, 0, 0), new SquareNode("3", 0.3, 0, 0)];
  
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