import React, { useEffect } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";

const minutes = {
  session: null,
  breakTime: null,
};

export default function Header(props) {
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

      const lenDispElements = document.querySelectorAll("h2.time-window-value");

      if (details.idPrefix === "session") minutes.session = tempTime;
      else minutes.breakTime = tempTime;

      lenDispElements[0].innerHTML = minutes.session;
      lenDispElements[1].innerHTML = minutes.breakTime;

      const [newMainMin, newAuxMin] = [
        props.mode === "S" ? minutes.session : minutes.breakTime,
        props.mode === "S" ? minutes.breakTime : minutes.session,
      ];

      props.adjustTime(newMainMin, newAuxMin, 0, props.mode);
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
          <Col>
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
        container = document.getElementById("header-container"),
        headingRow = container.firstElementChild;

      const containerClasses = ["d-flex", "flex-column", "align-items-center"];

      if (body.clientWidth > body.clientHeight) {
        container.classList.remove(...containerClasses);
        container.classList.add("d-grid");
        headingRow.classList.add("landscape");
      } else {
        headingRow.classList.remove("landscape");
        container.classList.remove("d-grid");
        container.classList.add(...containerClasses);
      }
    }

    window.onload = changeContainerElementArrangement();
    window.addEventListener("resize", changeContainerElementArrangement);

    return () => {
      window.removeEventListener("resize", changeContainerElementArrangement);
    };
  });

  return (
    <Col id="header-container">
      <Row>
        <Col>
          <h2 id="heading">25 + 5 Clock</h2>
        </Col>
      </Row>
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
    </Col>
  );
}
