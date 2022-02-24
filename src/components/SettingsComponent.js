import React, { useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { TimerState } from "../context/Context";

const minutes = {
    session: null,
    breakTime: null,
  },
  _ = undefined;

export default function Settings(props) {
  const {
    state: { mainMinutes, auxiliaryMinutes, mode },
    runningState: { isReset },
    runningDispatch,
  } = TimerState();
  const settingContainer = useRef();

  const arrowUp = <FontAwesomeIcon icon={faArrowUp} size="2x" />;
  const arrowDown = <FontAwesomeIcon icon={faArrowDown} size="2x" />;

  if (minutes.session === null || isReset) {
    minutes.session = mainMinutes;
    minutes.breakTime = auxiliaryMinutes;
    setTimeout(() => {
      runningDispatch({
        type: "SET_RESET_FLAG",
        payload: false,
      });
    }, 0);
  }

  const TimeWindow = (details) => {
    let tempTime = details.time;

    const setMinute = (OP) => {
      if (OP === "UP" && tempTime < 60) ++tempTime;
      else if (OP === "DOWN" && tempTime > 1) --tempTime;

      if (details.idPrefix === "session") {
        minutes.session = tempTime;
      } else {
        minutes.breakTime = tempTime;
      }

      let newMainMin,
        newAuxMin,
        newSeconds = 0;

      if (mode === "S") {
        newMainMin = minutes.session;
        newAuxMin = minutes.breakTime;

        if (details.idPrefix === "session") {
          newAuxMin = _;
        } else {
          newMainMin = _;
          newSeconds = _;
        }
      } else {
        newMainMin = minutes.breakTime;
        newAuxMin = minutes.session;

        if (details.idPrefix === "break") {
          newAuxMin = _;
        } else {
          newMainMin = _;
          newSeconds = _;
        }
      }

      props.adjustTime(newMainMin, newAuxMin, newSeconds);
      runningDispatch({
        type: "SET_CHANGED_FLAG",
        payload: true,
      });
    };

    return (
      <Col className={`${details.idPrefix}-wrapper`}>
        <Row>
          <Col>
            <h2 id={`${details.idPrefix}-label`}>{details.title}</h2>
          </Col>
        </Row>
        <Row className="adjust-row d-flex align-items-center">
          <Col>
            <Button
              size="sm"
              id={`${details.idPrefix}-decrement`}
              onClick={() => setMinute("DOWN")}
            >
              {arrowDown}
            </Button>
          </Col>
          <Col className="time-window-value-col">
            <h2 className="time-window-value" id={`${details.idPrefix}-length`}>
              {tempTime}
            </h2>
          </Col>
          <Col>
            <Button
              size="sm"
              id={`${details.idPrefix}-increment`}
              onClick={() => setMinute("UP")}
            >
              {arrowUp}
            </Button>
          </Col>
        </Row>
      </Col>
    );
  };

  function TimerWindowParams(title, idPrefix, minutes) {
    this.title = title;
    this.idPrefix = idPrefix;
    this.time = minutes;
  }

  useEffect(() => {
    function changeContainerElementArrangement() {
      const { current: container } = settingContainer;

      const containerPortraitClasses = ["flex-column", "align-items-center"],
        containerLandscapeClasses = ["justify-content-evenly"];

      if (window.innerWidth > window.innerHeight) {
        container.classList.remove(...containerPortraitClasses);
        container.classList.add(...containerLandscapeClasses);
        Array.from(container.children).forEach((row) =>
          row.style.setProperty("width", "fit-content")
        );
      } else {
        Array.from(container.children).forEach((row) =>
          row.style.removeProperty("width")
        );
        container.classList.remove(...containerLandscapeClasses);
        container.classList.add(...containerPortraitClasses);
      }
    }

    window.onload = changeContainerElementArrangement();
    window.addEventListener("resize", changeContainerElementArrangement);

    return () => {
      window.removeEventListener("resize", changeContainerElementArrangement);
    };
  }, []);

  return (
    <Row id="settings-container" ref={settingContainer}>
      <Row>
        {TimeWindow(
          new TimerWindowParams("Session Length", "session", minutes.session)
        )}
      </Row>
      <Row>
        {TimeWindow(
          new TimerWindowParams("Break Length", "break", minutes.breakTime)
        )}
      </Row>
    </Row>
  );
}
