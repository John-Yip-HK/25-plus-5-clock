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
  },
  _ = undefined;

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

      if (details["id-prefix"] === "session") {
        minutes.session = tempTime;
      } else {
        minutes.breakTime = tempTime;
      }

      /**
       * When timer is paused:
       * If props.mode === "S",
       *  If session is changed,
       *    Change the main minute only.
       *  Else,
       *    Change the auxiliary minute only.
       * Else,
       *   If break is changed,
       *    Change the main minute only.
       *  Else,
       *    Change the auxiliary minute only.
       */

      let newMainMin,
        newAuxMin,
        newSeconds = 0;

      if (props.mode === "S") {
        newMainMin = minutes.session;
        newAuxMin = minutes.breakTime;

        if (details["id-prefix"] === "session") {
          newAuxMin = _;
        } else {
          newMainMin = _;
          newSeconds = _;
        }
      } else {
        newMainMin = minutes.breakTime;
        newAuxMin = minutes.session;

        if (details["id-prefix"] === "break") {
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
      const body = document.body,
        container = document.getElementById("header-container"),
        headingRow = container.firstElementChild;

      if (body.clientWidth > body.clientHeight) {
        container.classList.remove(
          "d-flex",
          "flex-column",
          "align-items-center"
        );
        container.classList.add("d-grid");
        headingRow.classList.add("landscape");
      } else {
        headingRow.classList.remove("landscape");
        container.classList.remove("d-grid");
        container.classList.add("d-flex", "flex-column", "align-items-center");
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
