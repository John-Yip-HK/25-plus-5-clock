import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Timer from "./components/TimerComponent";
import Buttons from "./components/ButtonComponent";
import Header from "./components/HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const defaults = {
    mainMinutes: 25,
    auxiliaryMinutes: 5,
    seconds: 0,
    mode: "S",
    initMinutes: [null, null],
  };

  for (let defaultKey in defaults) {
    Object.defineProperty(defaults, defaultKey, {
      writeable: false,
      eumerable: true,
      configurable: false,
    });
  }

  const [currTimerState, setCurrTimerState] = useState({
    mainMinutes: defaults.mainMinutes,
    auxiliaryMinutes: defaults.auxiliaryMinutes,
    seconds: defaults.seconds,
    mode: defaults.mode,
  });

  const [timer, setTimer] = useState(null);

  const [initMinutes, setInitMinutes] = useState(defaults.initMinutes);

  const adjustTime = (
    mainMinutes = defaults.mainMinutes,
    auxiliaryMinutes = defaults.auxiliaryMinutes,
    seconds = defaults.seconds,
    mode = defaults.mode
  ) => {
    setCurrTimerState({
      mainMinutes: mainMinutes,
      auxiliaryMinutes: auxiliaryMinutes,
      seconds: seconds,
      mode: mode,
    });
  };

  const resetTime = () => {
    clearTimeout(timer);
    setTimer(null);

    adjustTime();
    setInitMinutes(defaults.initMinutes);

    document.getElementById("settings").removeAttribute("disabled");

    const beepAudio = document.getElementById("beep");
    beepAudio.pause();
    beepAudio.currentTime = 0;
  };

  const runTimer = () => {
    document.getElementById("settings").setAttribute("disabled", "");
    initMinutes[0] =
      initMinutes[0] === null ? currTimerState.mainMinutes : initMinutes[0];
    initMinutes[1] =
      initMinutes[1] === null
        ? currTimerState.auxiliaryMinutes
        : initMinutes[1];

    function countDown(mainMin, auxMin, sec, mode) {
      if (mainMin === 0 && sec === 0) {
        mode = mode === "S" ? "B" : "S";

        if (mode === "B") {
          mainMin = initMinutes[1];
          auxMin = initMinutes[0];
        } else {
          mainMin = initMinutes[0];
          auxMin = initMinutes[1];
        }

        const beepAudio = document.getElementById("beep");
        beepAudio.currentTime = 0;
        beepAudio.play();
      } else if (sec === 0) {
        --mainMin;
        sec = 59;
      } else {
        --sec;
      }

      setTimer(
        setTimeout(() => {
          adjustTime(mainMin, auxMin, sec, mode);
          countDown(mainMin, auxMin, sec, mode);
        }, 1000)
      );
    }

    countDown(
      currTimerState.mainMinutes,
      currTimerState.auxiliaryMinutes,
      currTimerState.seconds,
      currTimerState.mode
    );
  };

  const pauseTimer = () => {
    clearTimeout(timer);
    setTimer(null);
  };

  return (
    <Container className="d-flex align-items-center flex-column">
      <Row>
        <Header
          adjustTime={adjustTime}
          session={currTimerState.mainMinutes}
          breakTime={currTimerState.auxiliaryMinutes}
        />
      </Row>
      <Row>
        <Timer
          mainMinutes={currTimerState.mainMinutes}
          auxiliaryMinutes={currTimerState.auxiliaryMinutes}
          seconds={currTimerState.seconds}
          mode={currTimerState.mode}
        />
      </Row>
      <Row>
        <Buttons
          resetTime={resetTime}
          runTimer={runTimer}
          pauseTimer={pauseTimer}
        />
      </Row>
      <Row className="display-none">
        <audio
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          id="beep"
        ></audio>
      </Row>
    </Container>
  );
}

export default App;
