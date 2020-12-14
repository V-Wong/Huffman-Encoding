import React from 'react';
import { Container } from "react-bootstrap";

import HuffmanPanel from "./huffman/HuffmanPanel";

import "bootswatch/dist/darkly/bootstrap.min.css";

function App() {
  return (
    <div style={{minHeight: "100vh", display: "flex", alignItems: "center"}}>
      <Container fluid>
        <HuffmanPanel />
      </Container>
    </div>
  );
}

export default App;
