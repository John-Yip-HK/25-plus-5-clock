import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Timer from "./components/TimerComponent";
import Buttons from "./components/ButtonComponent";
import Header from "./components/HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="d-flex align-items-center flex-column">
      <Row>
        <Header show={show} handleClose={handleClose} />
      </Row>
      <Row>
        <Timer />
      </Row>
      <Row>
        <Buttons handleShow={handleShow} />
      </Row>
    </Container>
  );
}

export default App;
