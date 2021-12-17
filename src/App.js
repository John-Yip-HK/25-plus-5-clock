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
  const [countDown, setCountDown] = useState([null, null]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setTime = (session = defaultSession, breakTime = defaultBreak) => {
    setSession(session);
    setBreakTime(breakTime);
  };

  const handleTimer = () => {
    const element = document.getElementById("start_stop");

    const runTimer = () => {
      if (countDown[0] === null) {
        setCountDown([session, breakTime]);
      }
    };

    const pauseTimer = () => {};

    if (element.innerHTML === "Start") runTimer();
    else pauseTimer();

    element.innerHTML = element.innerHTML === "Start" ? "Pause" : "Start";
  };

  return (
    <Container className="d-flex align-items-center flex-column">
      <Row>
        <Header
          show={show}
          handleClose={handleClose}
          setTime={setTime}
          session={session}
          breakTime={breakTime}
        />
      </Row>
      <Row>
        <Timer session={session} breakTime={breakTime} />
      </Row>
      <Row>
        <Buttons
          handleShow={handleShow}
          resetTime={setTime}
          handleTimer={handleTimer}
        />
      </Row>
    </Container>
  );
}

export default App;
