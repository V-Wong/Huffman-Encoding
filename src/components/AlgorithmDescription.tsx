import React from "react";
import { Card, Button } from "react-bootstrap";

function AlgorithmDescription() {
  return (
    <Card
      className="text-center"
    >
      <Card.Header style={{fontSize: "1.5rem"}}>Algorithm Description</Card.Header>
      <Card.Body>
        <Card.Title style={{ fontSize: "2.5rem" }}>Huffman Encoding</Card.Title>
        <Card.Text style={{ fontSize: "1.5rem" }}>
          <p>The Huffman Encoding algorithm is an encoding algorithm for lossless data compression. It is a variable length code where symbols of higher probability (more frequently occuring) are given shorter lengths.</p>
        </Card.Text>
        <Button variant="primary" style={{fontSize: "1.5rem"}} onClick={() => window.open("https://en.wikipedia.org/wiki/Huffman_coding")}>
          Read More
      </Button>
      </Card.Body>
    </Card>
  );
};

export default AlgorithmDescription;