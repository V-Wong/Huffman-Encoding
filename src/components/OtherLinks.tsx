import React from "react";
import { Card } from "react-bootstrap";

function OtherLinks() {
  return (
    <Card
      className="text-center"
      style={{ marginTop: "1rem" }}
    >
      <Card.Header>Useful Links</Card.Header>
      <Card.Body>
        <Card.Title>
          Checkout My Other Works
      </Card.Title>
        <Card.Link href="https://github.com/V-Wong/Huffman-Encoding">Source Code</Card.Link>
        <Card.Link href="https://vwong.dev/">My Portfolio</Card.Link>
        <Card.Link href="https://github.com/V-Wong">My GitHub</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default OtherLinks;