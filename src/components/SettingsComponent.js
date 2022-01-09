import React, { useEffect } from "react";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";

const minutes = {
    session: null,
    breakTime: null,
  },
  _ = undefined;

export default function Settings(props) {
  <i class="far fa-arrow-alt-circle-up"></i>;
  const arrowUp = <FontAwesomeIcon icon={faArrowAltCircleUp} size="2x" />;
  const arrowDown = <FontAwesomeIcon icon={faArrowAltCircleDown} size="2x" />;
  let isResetFlag = props.isReset;

  if (minutes.session === null || isResetFlag) {
    minutes.session = props.session;
    minutes.breakTime = props.breakTime;
    isResetFlag = false;
  }

  props.setIsResetFlag(isResetFlag);

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

      if (props.mode === "S") {
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
      props.setChangedFlag(true);
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
      const body = document.body,
        container = document.getElementById("settings-container");

      const containerPortraitClasses = ["flex-column", "align-items-center"],
        containerLandscapeClasses = ["justify-content-evenly"];

      if (body.clientWidth > body.clientHeight) {
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
  });

  return (
    <>
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
    </>
  );
}
