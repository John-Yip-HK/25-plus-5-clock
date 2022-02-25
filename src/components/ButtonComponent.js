import React, { useState, useEffect, useRef } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedoAlt } from "@fortawesome/free-solid-svg-icons";

import { TimerState } from "../context/Context";

export default function ButtonComponent(props) {
  const [startStopIcon, setStartStopIcon] = useState(faPlay);
  const btnContainer = useRef();
  const startStopCaption = useRef();
  const { started, setStarted } = TimerState();

  const handleTimer = (event) => {
    const elementWithCaption = event.target.children[1];

    if (elementWithCaption.innerHTML === "Start") {
      if (!started) {
        const audio = document.getElementById("beep");
        audio.play().then(() => {
          props.resetAudio();
          audio.muted = false;
          audio.volume = 0.5;
        });

        setStarted(true);
      }

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
    const { current: elementWithCaption } = startStopCaption;

    props.resetTime();
    setStartStopIcon(faPlay);
    elementWithCaption.innerHTML = "Start";
  };

  useEffect(() => {
    function changeContainerElementArrangement() {
      const { current: btnCol } = btnContainer,
        btnColParent = btnCol.parentElement;

      const btnPortraitClasses = ["flex-column", "align-items-center"],
        btnLandscapeClasses = ["flex-row", "justify-content-evenly"];

      let width = 70;

      if (window.innerWidth > window.innerHeight) {
        btnCol.classList.remove(...btnPortraitClasses);
        btnCol.classList.add(...btnLandscapeClasses);
        btnColParent.style.setProperty("width", `${width}vw`);
      } else {
        btnColParent.style.removeProperty("width");
        btnCol.classList.remove(...btnLandscapeClasses);
        btnCol.classList.add(...btnPortraitClasses);
      }
    }

    window.onload = changeContainerElementArrangement();
    window.addEventListener("resize", changeContainerElementArrangement);

    return () => {
      window.removeEventListener("resize", changeContainerElementArrangement);
    };
  }, []);

  return (
    <Row>
      <Col id="button-container" className="d-flex" ref={btnContainer}>
        <Row>
          <Button id="start_stop" variant="outline-dark" onClick={handleTimer}>
            <FontAwesomeIcon icon={startStopIcon} />{" "}
            <span id="start_stop_caption" ref={startStopCaption}>
              Start
            </span>
          </Button>
        </Row>
        <Row>
          <Button id="reset" variant="outline-danger" onClick={handleReset}>
            <FontAwesomeIcon icon={faRedoAlt} /> Reset
          </Button>
        </Row>
      </Col>
    </Row>
  );
}
