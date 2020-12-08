import React from 'react';
import {Container} from "react-bootstrap";

import NavBar from "./components/NavBar";
import HuffmanPanel from "./huffman/HuffmanPanel";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavBar/>
      <Container fluid style={{marginTop: "1vh"}}>
        <HuffmanPanel />
      </Container>
    </>
  );
}

export default App;
