import React from "react";
import { Card, Button } from "react-bootstrap";

function AlgorithmDescription() {
  return (
    <Card
      className="text-center"
    >
      <Card.Header>Algorithm Description</Card.Header>
      <Card.Body>
        <Card.Title>Huffman Encoding</Card.Title>
        <Card.Text>
          <p>The Huffman Encoding algorithm is an encoding algorithm for lossless data compression.
          It is a variable length code where symbols of higher probability are given shorter lengths.</p>
        </Card.Text>
        <Button variant="primary" onClick={() => window.open("https://en.wikipedia.org/wiki/Huffman_coding")}>
          Read More
      </Button>
      </Card.Body>
    </Card>
  );
};

export default AlgorithmDescription;