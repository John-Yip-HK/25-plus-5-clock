import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedoAlt } from "@fortawesome/free-solid-svg-icons";

export default function ButtonComponent(props) {
  const [startStopIcon, setStartStopIcon] = useState(faPlay);

  const handleTimer = (event) => {
    const elementWithCaption = event.target.children[1];

    if (elementWithCaption.innerHTML === "Start") {
      props.runTimer();
      elementWithCaption.innerHTML = "Pause";
      setStartStopIcon(faPause);
    } else {
      props.pauseTimer();
      elementWithCaption.innerHTML = "Start";
      setStartStopIcon(faPlay);
    }
  };

  const handleReset = () => {
    const elementWithCaption = document.getElementById("start_stop_caption");

    props.resetTime();
    setStartStopIcon(faPlay);
    elementWithCaption.innerHTML = "Start";
  };

  useEffect(() => {
    function changeContainerElementArrangement() {
      const body = document.body,
        btnContainer = document.getElementById("button-container"),
        btnContainerParent = btnContainer.parentElement;

      const btnPortraitClasses = ["flex-column", "align-items-center"],
        btnLandscapeClasses = ["flex-row", "justify-content-evenly"];

      let width = 70;

      if (body.clientWidth > body.clientHeight) {
        btnContainer.classList.remove(...btnPortraitClasses);
        btnContainer.classList.add(...btnLandscapeClasses);
        btnContainerParent.style.setProperty("width", `${width}vw`);
      } else {
        btnContainerParent.style.removeProperty("width");
        btnContainer.classList.remove(...btnLandscapeClasses);
        btnContainer.classList.add(...btnPortraitClasses);
      }
    }

    window.onload = changeContainerElementArrangement();
    window.addEventListener("resize", changeContainerElementArrangement);

    return () => {
      window.removeEventListener("resize", changeContainerElementArrangement);
    };
  });

  return (
    <Col id="button-container" className="d-flex">
      <Row>
        <Col>
          <Button id="start_stop" onClick={handleTimer}>
            <FontAwesomeIcon icon={startStopIcon} />{" "}
            <span id="start_stop_caption">Start</span>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button id="reset" variant="danger" onClick={handleReset}>
            <FontAwesomeIcon icon={faRedoAlt} /> Reset
          </Button>
        </Col>
      </Row>
    </Col>
  );
}
