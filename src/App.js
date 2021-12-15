import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Timer from "./components/TimerComponent";
import Buttons from "./components/ButtonComponent";
import Header from "./components/HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const defaultSession = 25,
    defaultBreak = 5;

  const [show, setShow] = useState(false);
  const [session, setSession] = useState(defaultSession);
  const [breakTime, setBreakTime] = useState(defaultBreak);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const increaseTime = (type) => {
    switch (type) {
      case "S":
        if (session < 60) setSession(session + 1);
        break;
      case "B":
        if (breakTime < 60) setBreakTime(breakTime + 1);
        break;
      default:
        break;
    }
  };
  const decreaseTime = (type) => {
    switch (type) {
      case "S":
        if (session > 1) setSession(session - 1);
        break;
      case "B":
        if (breakTime > 1) setBreakTime(breakTime - 1);
        break;
      default:
        break;
    }
  };

  const resetTime = () => {
    setSession(defaultSession);
    setBreakTime(defaultBreak);
  };

  return (
    <Container className="d-flex align-items-center flex-column">
      <Row>
        <Header
          show={show}
          handleClose={handleClose}
          increaseTime={increaseTime}
          decreaseTime={decreaseTime}
          session={session}
          breakTime={breakTime}
        />
      </Row>
      <Row>
        <Timer session={session} breakTime={breakTime} />
      </Row>
      <Row>
        <Buttons handleShow={handleShow} resetTime={resetTime} />
      </Row>
    </Container>
  );
}

export default App;
