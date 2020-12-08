import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Canvas from "./Canvas";
import { SquareNode } from "./nodeClasses";

function HuffmanPanel() {
  const [nodesList, setNodesList] = useState<Array<SquareNode>>([] as Array<SquareNode>);
  const [inputs, _] = useState([0, 0, 0, 0]);
  const [encodings, setEncodings] = useState(["", "", "", ""]);

  function handleSubmit() {
    const newNodes = inputs.filter(x => x)
      .map((e, i) => new SquareNode(i, e, 0, 0));
    setNodesList(newNodes);
  }

  useEffect(() => {
    nodesList.forEach((node, index) => encodings[index] = node.encoding);
    setEncodings([...encodings]);
  }, [nodesList]);

  return (
    <Container fluid>
      <Row>
        <Col xs={9} style={{ height: "50vh" }}>
          <Canvas nodes={nodesList} />
        </Col>

        <Col xs={3}>
          <h2 style={{ margin: "auto", marginBottom: "10px", marginTop: "10px" }}>Enter Symbols</h2>
          {
            inputs.map((_, i) => (
              <>
                <p>Encoding: {encodings[i]}</p>
                <input type="text" onChange={e => inputs[i] = parseFloat(e.target.value)}></input>
              </>
            ))
          }
          <div className="buttons-container">
            <input type="button" value="Submit" onClick={e => { e.preventDefault(); handleSubmit() }} />
            <input type="button" value="Clear" />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default HuffmanPanel;