import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Timer from "./components/TimerComponent";
import Buttons from "./components/ButtonComponent";
import Header from "./components/HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const defaultSession = 25,
    defaultBreak = 5,
    defaultCountDown = [null, null],
    defaultTimerMode = "S";

  const [show, setShow] = useState(false);

  const [session, setSession] = useState(defaultSession);
  const [breakTime, setBreakTime] = useState(defaultBreak);

  const [countDown, setCountDown] = useState(defaultCountDown);

  const [timer, setTimer] = useState(null);
  const [timerMode, setTimerMode] = useState(defaultTimerMode);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setTime = (
    newSession = defaultSession,
    newBreakTime = defaultBreak
  ) => {
    setSession(newSession);
    setBreakTime(newBreakTime);

    let timeDisplay = (newSession < 10 ? "0" : "") + newSession;
    document.getElementById("time-left").innerHTML = `${timeDisplay}:00`;

    timeDisplay = newBreakTime;
    document.getElementById("break-time-span").innerHTML = `${timeDisplay}:00`;
  };

  const resetTime = () => {
    clearTimeout(timer);
    setTimer(null);
    setTimerMode(defaultTimerMode);

    setTime();
    setCountDown(defaultCountDown);

    document.getElementById("time-left").innerHTML = `${session}:00`;
  };

  const runTimer = () => {
    if (countDown.filter((time) => time !== null).length === 0) {
      countDown[0] = session;
      countDown[1] = 0;
    }

    const runCountDown = (timePair) => {
      let minutesDisplay = (timePair[0] < 10 ? "0" : "") + timePair[0];
      let secondsDisplay = (timePair[1] < 10 ? "0" : "") + timePair[1];
      document.getElementById(
        "time-left"
      ).innerHTML = `${minutesDisplay}:${secondsDisplay}`;

      let timeoutFunction;

      if (timePair[1] === 0) {
        if (timePair[0] === 0) {
          const newTimerMode = timerMode === "S" ? "B" : "S";
          setTimerMode(newTimerMode);

          timeoutFunction = () => {
            countDown[0] = newTimerMode === "S" ? session : breakTime;
            countDown[1] = 0;
            document.getElementById("timer-label").innerHTML =
              document.getElementById("timer-label").innerHTML === "Session"
                ? "Break"
                : "Session";
            // Make the alarm ring.
          };
        } else {
          timeoutFunction = () => {
            countDown[0] = countDown[0] - 1;
            countDown[1] = 59;
          };
        }
      } else {
        timeoutFunction = () => (countDown[1] -= 1);
      }

      setTimer(
        setTimeout(() => {
          timeoutFunction();
          runCountDown(countDown);
        }, 1000)
      );
    };

    runCountDown(countDown);
  };

  const pauseTimer = () => {
    clearTimeout(timer);
    setTimer(null);
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
          resetTime={resetTime}
          runTimer={runTimer}
          pauseTimer={pauseTimer}
        />
      </Row>
    </Container>
  );
}

export default App;
