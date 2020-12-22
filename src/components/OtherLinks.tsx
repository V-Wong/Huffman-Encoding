import React from "react";
import { Card } from "react-bootstrap";

function OtherLinks() {
  return (
    <Card
      className="text-center"
      style={{ marginTop: "2rem" }}
    >
      <Card.Header style={{ fontSize: "1.25rem" }}>Useful Links</Card.Header>
      <Card.Body>
        <Card.Title style={{ fontSize: "1.75rem" }}>
          Checkout My Other Works
      </Card.Title>
        <Card.Link style={{ fontSize: "1.2rem" }} href="https://github.com/V-Wong/Huffman-Encoding">Source Code</Card.Link>
        <Card.Link style={{ fontSize: "1.2rem" }} href="https://vwong.dev/">My Portfolio</Card.Link>
        <Card.Link style={{ fontSize: "1.2rem" }} href="https://github.com/V-Wong">My GitHub</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default OtherLinks;