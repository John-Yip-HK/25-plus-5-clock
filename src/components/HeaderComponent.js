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

      if (details["id-prefix"] === "session") minutes.session = tempTime;
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
      <Col className={`${details["id-prefix"]}-wrapper`}>
        <Row>
          <Col>
            <h2 id={`${details["id-prefix"]}-label`}>{details.title}</h2>
          </Col>
        </Row>
        <Row className="adjust-row d-flex align-items-center">
          <Col>
            <Button
              size="sm"
              id={`${details["id-prefix"]}-decrement`}
              onClick={() => setMinute("DOWN")}
            >
              {arrowDown}
            </Button>
          </Col>
          <Col>
            <h2
              className="time-window-value"
              id={`${details["id-prefix"]}-length`}
            >
              {tempTime}
            </h2>
          </Col>
          <Col>
            <Button
              size="sm"
              id={`${details["id-prefix"]}-increment`}
              onClick={() => setMinute("UP")}
            >
              {arrowUp}
            </Button>
          </Col>
        </Row>
      </Col>
    );
  };

  useEffect(() => {
    function changeContainerElementArrangement() {
      const container = document.getElementById("header-container"),
        body = document.body;

      if (body.clientWidth > body.clientHeight) {
        container.classList.remove("flex-column", "align-items-center");
        container.classList.add("flex-row", "justify-content-center");
      } else {
        container.classList.remove("flex-row", "justify-content-center");
        container.classList.add("flex-column", "align-items-center");
      }
    }

    window.onload = changeContainerElementArrangement();
    window.addEventListener("resize", changeContainerElementArrangement);

    return () => {
      window.removeEventListener("resize", changeContainerElementArrangement);
    };
  });

  return (
    <Col id="header-container" className="d-flex">
      <Row>
        <Col>
          <h2 id="heading">25 + 5 Clock</h2>
        </Col>
      </Row>
      <Row>
        {TimeWindow({
          title: "Session Length",
          "id-prefix": "session",
          time: minutes.session,
        })}
      </Row>
      <Row>
        {TimeWindow({
          title: "Break Length",
          "id-prefix": "break",
          time: minutes.breakTime,
        })}
      </Row>
    </Col>
  );
}
