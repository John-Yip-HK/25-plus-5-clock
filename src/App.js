import React, { useState, useEffect } from "react";

import { Container, Row } from "react-bootstrap";
import Timer from "./components/TimerComponent";
import Buttons from "./components/ButtonComponent";
import Header from "./components/HeaderComponent";
import Settings from "./components/SettingsComponent";

import useBreakpoint from "bootstrap-5-breakpoint-react-hook";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { TimerState, defaults } from "./context/Context";

function App() {
  const breakpoint = useBreakpoint();

  const {
    state,
    dispatch,
    runningState: { changedDuringPause },
    runningDispatch,
  } = TimerState();

  const [beepAudio, setBeepAudio] = useState(null);

  const adjustTime = (
    mainMinutes = state.mainMinutes,
    auxiliaryMinutes = state.auxiliaryMinutes,
    seconds = state.seconds,
    mode = state.mode
  ) => {
    dispatch({
      type: "SET_TIMER_TIME",
      payload: {
        mainMinutes,
        auxiliaryMinutes,
        seconds,
        mode,
      },
    });
  };

  const resetTime = () => {
    clearTimeout(state.timer);

    dispatch({
      type: "RESET",
    });

    runningDispatch({
      type: "SET_CHANGED_FLAG",
      payload: false,
    });
    runningDispatch({
      type: "SET_RESET_FLAG",
      payload: true,
    });

    Array.from(document.querySelectorAll(".adjust-row button")).forEach(
      (button) => button.removeAttribute("disabled")
    );

    document.getElementById("timer").classList.remove("run");

    beepAudio.pause();
    beepAudio.currentTime = 0;
  };

  const runTimer = () => {
    if (
      state.initMinutes.some((minute) => minute === null) ||
      changedDuringPause
    ) {
      dispatch({
        type: "SET_INIT_MINUTE",
        payload: [state.mainMinutes, state.auxiliaryMinutes],
      });
      runningDispatch({
        type: "SET_CHANGED_FLAG",
        payload: false,
      });
    }

    Array.from(document.querySelectorAll(".adjust-row button")).forEach(
      (button) => button.setAttribute("disabled", "")
    );

    document.getElementById("timer").classList.add("run");

    function countDown(mainMin, auxMin, sec, mode) {
      if (mainMin === 0 && sec === 0) {
        mode = mode === "S" ? "B" : "S";

        if (mode === "B") {
          mainMin = state.initMinutes[1];
          auxMin = state.initMinutes[0];
        } else {
          mainMin = state.initMinutes[0];
          auxMin = state.initMinutes[1];
        }

        beepAudio.currentTime = 0;
        beepAudio.play();
      } else if (sec === 0) {
        --mainMin;
        sec = 59;
      } else {
        --sec;
      }

      dispatch({
        type: "SET_TIMER",
        payload: setTimeout(() => {
          adjustTime(mainMin, auxMin, sec, mode);
          countDown(mainMin, auxMin, sec, mode);
        }, 1000),
      });
    }

    countDown(
      state.mainMinutes,
      state.auxiliaryMinutes,
      state.seconds,
      state.mode
    );
  };

  const pauseTimer = () => {
    clearTimeout(state.timer);
    dispatch({
      type: "SET_TIMER",
      payload: defaults.timer,
    });

    Array.from(document.querySelectorAll(".adjust-row button")).forEach(
      (button) => button.removeAttribute("disabled")
    );

    document.getElementById("timer").classList.remove("run");

    beepAudio.pause();
    beepAudio.currentTime = 0;
  };

  useEffect(() => {
    const body = document.body,
      toggler = document.getElementById("theme-toggler"),
      startStopBtn = document.getElementById("start_stop");

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

    function changeTheme() {
      if (toggler.checked) {
        body.classList.add("dark");

        startStopBtn.classList.remove("btn-outline-dark");
        startStopBtn.classList.add("btn-outline-light");
      } else {
        body.classList.remove("dark");

        startStopBtn.classList.remove("btn-outline-light");
        startStopBtn.classList.add("btn-outline-dark");
      }
    }

    function onloadEvents() {
      startStopBtn.classList.remove("btn-primary");
      changeContainerElementArrangement();
      changeTheme();

      setBeepAudio(document.getElementById("beep"));
    }

    window.onload = onloadEvents();

    window.addEventListener("resize", changeContainerElementArrangement);
    toggler.addEventListener("click", changeTheme);

    return () => {
      toggler.removeEventListener("click", changeTheme);
      window.removeEventListener("resize", changeContainerElementArrangement);
    };
  });

  return (
    <Container className="d-flex align-items-center flex-column">
      <Row>
        <Header />
      </Row>
      <Row>
        <Timer />
      </Row>
      <Row id="settings-container">
        <Settings adjustTime={adjustTime} />
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
