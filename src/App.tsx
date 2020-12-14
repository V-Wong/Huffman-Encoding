import React from 'react';
import { Container } from "react-bootstrap";

import HuffmanPanel from "./huffman/HuffmanPanel";

import "bootswatch/dist/darkly/bootstrap.min.css";

function App() {
  return (
    <>
      <Container fluid style={{ marginTop: "1vh" }}>
        <HuffmanPanel />
      </Container>
    </>
  );
}

export default App;
