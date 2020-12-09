import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, InputGroup,  Button, FormControl } from "react-bootstrap";

import Canvas from "./Canvas";
import { SquareNode } from "./nodeClasses";

function HuffmanPanel() {
  const [nodesList, setNodesList] = useState<Array<SquareNode>>([] as Array<SquareNode>);
  const [inputs, _] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [encodings, setEncodings] = useState(["", "", "", "", "", "", "", ""]);
  const [selectedEncoding, setSelectedEncoding] = useState("");

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
        <Col xs={10} style={{ height: "75vh" }}>
          <Canvas nodes={nodesList} encoding={selectedEncoding} />
        </Col>

        <Col xs={2}>
          <h2 style={{ margin: "auto", marginBottom: "10px", marginTop: "10px" }}>Enter Symbols</h2>
          {
            inputs.map((_, i) => (
              <InputGroup>
                <InputGroup.Prepend
                  onMouseOver={() => setSelectedEncoding(encodings[i])}
                >
                  <InputGroup.Text style={{width: "8rem"}}>
                    Encoding: {encodings[i]}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  onChange={e => inputs[i] = parseFloat(e.target.value)}
                />
              </InputGroup>
            ))
          }
          <div className="buttons-container">
            <Button
              variant="success"
              size="lg"
              block
              style={{marginTop: "1vh"}}
              onClick={e => { e.preventDefault(); handleSubmit() }}
            >
              Submit
            </Button>
            <Button
              variant="danger"
              size="lg"
              block
              style={{marginTop: "1vh"}}
            >
              Clear
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default HuffmanPanel;