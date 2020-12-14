import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, Button, FormControl, Card } from "react-bootstrap";

import Canvas from "./Canvas";
import AlgorithmDescription from "./AlgorithmDescription";
import OtherLinks from "./OtherLinks";
import { SquareNode } from "../huffman/Node";

function HuffmanPanel() {
  const [nodesList, setNodesList] = useState<Array<SquareNode>>([] as Array<SquareNode>);
  const [inputs, _] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [encodings, setEncodings] = useState(["", "", "", "", "", "", "", ""]);
  const [selectedEncoding, setSelectedEncoding] = useState("");

  function handleSubmit() {
    const newNodes = inputs.filter(x => x)
      .map((e, i) => new SquareNode(i, e, 0, 0));
    setNodesList(newNodes);
  };

  useEffect(() => {
    nodesList.forEach((node, index) => encodings[index] = node.encoding);
    setEncodings([...encodings]);
  }, [nodesList]);

  return (
    <Container fluid>
      <Row>
        <Col xs={10}>
          <Canvas nodes={nodesList} encoding={selectedEncoding} />
        </Col>

        <Col xs={2}>
          <AlgorithmDescription/>

          <Card
            className="text-center"
            style={{ marginTop: "2rem" }}
          >
            <Card.Header>Probability Input Panel</Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "1.75rem" }}>
                Enter Symbol Probabilities
              </Card.Title>
              {
                inputs.map((_, i) => (
                  <InputGroup>
                    <InputGroup.Prepend
                      onMouseOver={() => setSelectedEncoding(encodings[i])}
                    >
                      <InputGroup.Text
                        style={{
                          width: "8rem",
                          color: selectedEncoding && selectedEncoding === encodings[i]
                            ? "red" : "white"
                        }}
                      >
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
                  style={{ marginTop: "1vh" }}
                  onClick={e => { e.preventDefault(); handleSubmit() }}
                >
                  Submit
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  block
                  style={{ marginTop: "1vh" }}
                >
                  Clear
                </Button>
              </div>
            </Card.Body>
          </Card>

          <OtherLinks/>
        </Col>
      </Row>
    </Container>
  )
}

export default HuffmanPanel;