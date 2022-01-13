import React, { useState, useEffect } from "react";

import { Container, Row } from "react-bootstrap";
import Timer from "./components/TimerComponent";
import Buttons from "./components/ButtonComponent";
import Header from "./components/HeaderComponent";
import Settings from "./components/SettingsComponent";

import useBreakpoint from "bootstrap-5-breakpoint-react-hook";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const breakpoint = useBreakpoint();

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
  const [changedDuringPause, setChangedFlag] = useState(false);

  const [isReset, setIsResetFlag] = useState(false);

  const adjustTime = (
    mainMinutes = currTimerState.mainMinutes,
    auxiliaryMinutes = currTimerState.auxiliaryMinutes,
    seconds = currTimerState.seconds,
    mode = currTimerState.mode
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

    adjustTime(
      defaults.mainMinutes,
      defaults.auxiliaryMinutes,
      defaults.seconds,
      defaults.mode
    );
    setInitMinutes(defaults.initMinutes);

    setChangedFlag(false);
    setIsResetFlag(true);

    Array.from(document.querySelectorAll(".adjust-row button")).forEach(
      (button) => button.removeAttribute("disabled")
    );

    document.getElementById("timer").classList.remove("run");

    const beepAudio = document.getElementById("beep");
    beepAudio.pause();
    beepAudio.currentTime = 0;
  };

  const runTimer = () => {
    let changedFlag = changedDuringPause;

    if (initMinutes[0] === null || initMinutes[1] === null || changedFlag) {
      initMinutes[0] = currTimerState.mainMinutes;
      initMinutes[1] = currTimerState.auxiliaryMinutes;
      changedFlag = false;
    }

    setChangedFlag(changedFlag);

    Array.from(document.querySelectorAll(".adjust-row button")).forEach(
      (button) => button.setAttribute("disabled", "")
    );

    document.getElementById("timer").classList.add("run");

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

    Array.from(document.querySelectorAll(".adjust-row button")).forEach(
      (button) => button.removeAttribute("disabled")
    );

    document.getElementById("timer").classList.remove("run");
  };

  useEffect(() => {
    const body = document.body,
      toggler = document.getElementById("theme-toggler"),
      darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    function changeContainerElementArrangement() {
      if (
        body.clientWidth > body.clientHeight &&
        ["xs", "sm"].includes(breakpoint)
      ) {
        body.style.setProperty("margin", "1rem 0");
      } else {
        body.style.removeProperty("margin");
      }
    }

    function checkSystemTheme() {
      if (darkThemeMq.matches) {
        // Theme set to dark.
        toggler.checked = true;
      } else {
        // Theme set to light.
        toggler.checked = false;
      }
    }

    function changeTheme() {
      if (toggler.checked) body.classList.add("dark");
      else body.classList.remove("dark");
    }

    function onloadEvents() {
      changeContainerElementArrangement();
      checkSystemTheme();
      changeTheme();
    }

    window.onload = onloadEvents();

    window.addEventListener("resize", changeContainerElementArrangement);
    darkThemeMq.addEventListener("change", checkSystemTheme);
    toggler.addEventListener("click", changeTheme);
    toggler.addEventListener("change", changeTheme);

    return () => {
      toggler.removeEventListener("change", changeTheme);
      toggler.removeEventListener("click", changeTheme);
      darkThemeMq.removeEventListener("change", checkSystemTheme);
      window.removeEventListener("resize", changeContainerElementArrangement);
    };
  });

  return (
    <Container className="d-flex align-items-center flex-column">
      <Row>
        <Header />
      </Row>
      <Row>
        <Timer
          mainMinutes={currTimerState.mainMinutes}
          auxiliaryMinutes={currTimerState.auxiliaryMinutes}
          seconds={currTimerState.seconds}
          mode={currTimerState.mode}
        />
      </Row>
      <Row id="settings-container">
        <Settings
          adjustTime={adjustTime}
          setChangedFlag={setChangedFlag}
          session={currTimerState.mainMinutes}
          isReset={isReset}
          setIsResetFlag={setIsResetFlag}
          breakTime={currTimerState.auxiliaryMinutes}
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
