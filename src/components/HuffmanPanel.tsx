import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, Button, FormControl, Card } from "react-bootstrap";

import Canvas from "./Canvas";
import AlgorithmDescription from "./AlgorithmDescription";
import OtherLinks from "./OtherLinks";
import AbstractNode, { SquareNode } from "../huffman/Node";

function HuffmanPanel() {
  const [nodesList, setNodesList] = useState<Array<AbstractNode>>([] as Array<AbstractNode>);
  const [inputs, _] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [encodings, setEncodings] = useState(["", "", "", "", "", "", "", ""]);
  const [selectedEncoding, setSelectedEncoding] = useState("");

  function handleSubmit() {
    if (inputs.filter(x => x !== 0).length < 2) {
      window.alert("Please input at least 2 symbols");
      return;
    } else if (Math.abs(inputs.reduce((a, b) => a + b) - 1) >= 0.00001) {
      window.alert("Please ensure probabilities sum to 1");
      return;
    }

    const newNodes = inputs.map((e, i) => new SquareNode(i, e, 0, 0));
    setNodesList(newNodes);
  };

  useEffect(() => {
    nodesList.forEach((node, index) => node.probability !== 0
                      ? encodings[index] = node.encoding : encodings[index] = "");
    setEncodings([...encodings]);
  }, [nodesList]);

  return (
    <Container fluid>
      <Row>
        <Col xs={9}>
          <Canvas nodes={nodesList.filter(node => node.probability !== 0)} encoding={selectedEncoding} />
        </Col>

        <Col xs={3}>
          <AlgorithmDescription />

          <Card
            className="text-center"
            style={{ marginTop: "1rem" }}
          >
            <Card.Header >
              Probability Input Panel
            </Card.Header> 
            <Card.Body>
              <Card.Title>
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
                          width: "10rem",
                          color: selectedEncoding && selectedEncoding === encodings[i]
                            ? "red" : "white"
                        }}
                      >
                        Encoding: {encodings[i]}
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      onChange={e => !e.target.value ? inputs[i] = 0 : inputs[i] = parseFloat(e.target.value)}
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
                  onClick={handleSubmit}
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

          <OtherLinks />
        </Col>
      </Row>
    </Container>
  )
}

export default HuffmanPanel;