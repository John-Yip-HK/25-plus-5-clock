import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Timer from "./components/TimerComponent";
import Buttons from "./components/ButtonComponent";
import Header from "./components/HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const defaults = {
    sessionMinutes: 25,
    breakMinutes: 5,
    seconds: 0,
    timerMode: "S",
  };

  for (let defaultKey in defaults) {
    Object.defineProperty(defaults, defaultKey, {
      writeable: false,
      eumerable: true,
      configurable: false,
    });
  }

  const [show, setShow] = useState(false);

  const [mainMinutes, setMainMinutes] = useState(defaults.sessionMinutes);
  const [auxiliaryMinutes, setAuxiliaryMinutes] = useState(
    defaults.breakMinutes
  );
  const [seconds, setSeconds] = useState(defaults.seconds);

  const [timer, setTimer] = useState(null);
  const [timerMode, setTimerMode] = useState(defaults.timerMode);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const adjustTime = (
    newMainMinutes = mainMinutes,
    newAuxiliaryMinutes = auxiliaryMinutes,
    newSeconds = seconds
  ) => {
    setMainMinutes(newMainMinutes);
    setAuxiliaryMinutes(newAuxiliaryMinutes);
    setSeconds(newSeconds);
  };

  const getLabels = () => [
    document.getElementById("timer-label"),
    document.getElementById("auxiliary-time-label"),
  ];

  const resetTime = () => {
    clearTimeout(timer);
    setTimer(null);
    setTimerMode(defaults.timerMode);

    adjustTime(
      defaults.sessionMinutes,
      defaults.breakMinutes,
      defaults.seconds
    );

    document.getElementById("settings").removeAttribute("disabled");

    const [timerLabel, auxTimeLabel] = getLabels();
    timerLabel.innerHTML = "Session";
    auxTimeLabel.innerHTML = "Break";
  };

  const runTimer = () => {
    document.getElementById("settings").setAttribute("disabled", "");
    const [timerLabel, auxTimeLabel] = getLabels();
    const [initialMainMin, initialAuxMin] = [mainMinutes, auxiliaryMinutes];

    function countDown(mainMin, auxMin, sec, mode) {
      if (mainMin === 0 && sec === 0) {
        mode = mode === "S" ? "B" : "S";

        if (mode === "B") {
          mainMin = initialAuxMin;
          auxMin = initialMainMin;
        } else {
          mainMin = initialMainMin;
          auxMin = initialAuxMin;
        }
      } else if (sec === 0) {
        --mainMin;
        sec = 59;
      } else {
        --sec;
      }

      setTimer(
        setTimeout(
          (newMainMin, newAuxMin, newSec) => {
            adjustTime(newMainMin, newAuxMin, newSec);

            if (mode === "B") {
              timerLabel.innerHTML = "Break";
              auxTimeLabel.innerHTML = "Session";
            } else {
              timerLabel.innerHTML = "Session";
              auxTimeLabel.innerHTML = "Break";
            }

            countDown(newMainMin, newAuxMin, newSec, mode);
          },
          1000,
          mainMin,
          auxMin,
          sec
        )
      );
    }

    countDown(mainMinutes, auxiliaryMinutes, seconds, timerMode);

    // function countDown() {
    //   console.log(`${mainMinutes}:${seconds}`);

    //   let [mainMin, auxMin, sec] = [mainMinutes, auxiliaryMinutes, seconds];
    //   if (mainMin === 0 && sec === 0) {
    //     setTimerMode(timerMode === "S" ? "B" : "S");

    //     const newAuxMin = mainMin;
    //     mainMin = auxMin;
    //     auxMin = newAuxMin;
    //   } else if (sec === 0) {
    //     --mainMin;
    //     sec = 59;
    //   } else {
    //     --sec;
    //   }

    //   setTimer(
    //     setTimeout(
    //       (mainMin, auxMin, sec) => {
    //         adjustTime(mainMin, auxMin, sec);
    //         countDown();
    //       },
    //       1000,
    //       mainMin,
    //       auxMin,
    //       sec
    //     )
    //   );
    // }

    // countDown();
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
          adjustTime={adjustTime}
          session={mainMinutes}
          breakTime={auxiliaryMinutes}
        />
      </Row>
      <Row>
        <Timer
          mainMinutes={mainMinutes}
          auxiliaryMinutes={auxiliaryMinutes}
          seconds={seconds}
        />
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
