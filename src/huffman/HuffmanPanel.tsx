import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, Button, FormControl, Card } from "react-bootstrap";

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
        <Col xs={10}>
          <Canvas nodes={nodesList} encoding={selectedEncoding} />
        </Col>

        <Col xs={2}>
          <Card
            className="text-center"
          >
            <Card.Header>Algorithm Description</Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "1.75rem" }}>Huffman Encoding</Card.Title>
              <Card.Text style={{fontSize: "1.1rem"}}>
                <p>The Huffman Encoding algorithm is an encoding algorithm for lossless data compression.</p>
                <p>It is a variable length code where symbols of higher probability and given shorter lengths.</p>
              </Card.Text>
              <Button variant="primary" onClick={() => window.open("https://en.wikipedia.org/wiki/Huffman_coding")}>
                Read More
              </Button>
            </Card.Body>
          </Card>

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

          <Card
            className="text-center"
            style={{ marginTop: "2rem" }}
          >
            <Card.Header>Useful Links</Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "1.75rem" }}>
                Checkout My Other Works
              </Card.Title>
              <Card.Link href="https://github.com/V-Wong/Huffman-Encoding">Source Code</Card.Link>
              <Card.Link href="https://vwong.dev/">My Portfolio</Card.Link>
              <Card.Link href="https://github.com/V-Wong">My GitHub</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default HuffmanPanel;