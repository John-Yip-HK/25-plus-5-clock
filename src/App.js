import React, { useState, useEffect, useRef } from "react";

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

  const beepAudio = useRef();

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

  const resetAudio = () => {
    beepAudio.current.pause();
    beepAudio.current.currentTime = 0;
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
    resetAudio();
  };

  const runTimer = () => {
    if (
      state.initMinutes.some((minute) => minute === null) ||
      changedDuringPause
    ) {
      state.initMinutes[0] = state.mainMinutes;
      state.initMinutes[1] = state.auxiliaryMinutes;
      runningDispatch({
        type: "SET_CHANGED_FLAG",
        payload: false,
      });
    }

    beepAudio.current.volume = 0.5;
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

        beepAudio.current.currentTime = 0;
        beepAudio.current.play();
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
    resetAudio();
  };

  useEffect(() => {
    function changeContainerElementArrangement() {
      const body = document.body;

      if (
        body.clientWidth > body.clientHeight &&
        ["xs", "sm"].includes(breakpoint)
      ) {
        body.style.setProperty("margin", "1rem 0");
      } else {
        body.style.removeProperty("margin");
      }
    }

    window.addEventListener("resize", changeContainerElementArrangement);

    return () => {
      window.removeEventListener("resize", changeContainerElementArrangement);
    };
  }, [document.body.clientWidth]);

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
          ref={beepAudio}
        ></audio>
      </Row>
    </Container>
  );
}

export default App;
