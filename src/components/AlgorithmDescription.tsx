import React from "react";
import { Card, Button } from "react-bootstrap";

function AlgorithmDescription() {
  return (
    <Card
      className="text-center"
    >
      <Card.Header style={{ fontSize: "1.25rem" }}>Algorithm Description</Card.Header>
      <Card.Body>
        <Card.Title style={{ fontSize: "1.75rem" }}>Huffman Encoding</Card.Title>
        <Card.Text style={{ fontSize: "1.2rem" }}>
          <p>The Huffman Encoding algorithm is an encoding algorithm for lossless data compression.</p>
          <p>It is a variable length code where symbols of higher probability and given shorter lengths.</p>
        </Card.Text>
        <Button variant="primary" onClick={() => window.open("https://en.wikipedia.org/wiki/Huffman_coding")}>
          Read More
      </Button>
      </Card.Body>
    </Card>
  );
};

export default AlgorithmDescription;