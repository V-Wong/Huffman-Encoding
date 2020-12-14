import React from 'react';
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";

import HuffmanPanel from "./components/HuffmanPanel";

import "bootswatch/dist/darkly/bootstrap.min.css";

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Huffman Encoding</title>
        <meta name="description" content="Huffman Encoding tool for visualising the binary tree formed." />
        <meta name="author" content="Vincent Wong" />
        <meta name="keywords" content="Canvas, Huffman Encoding algorithm" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Container fluid>
          <HuffmanPanel />
        </Container>
      </div>
    </>
  );
}

export default App;
