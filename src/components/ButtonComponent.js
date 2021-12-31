import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH,
  faPlay,
  faPause,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";

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

  const handleReset = (event) => {
    const elementWithCaption =
      event.target.parentElement.parentElement.children[0].children[0]
        .children[1];

    props.resetTime(document.getElementById("start_stop_caption"));
    setStartStopIcon(faPlay);
    elementWithCaption.innerHTML = "Start";
  };

  return (
    <Container
      id="button-container"
      className="d-flex align-items-center flex-column"
    >
      <Row>
        <Button id="start_stop" onClick={handleTimer}>
          <FontAwesomeIcon icon={startStopIcon} />{" "}
          <span id="start_stop_caption">Start</span>
        </Button>
      </Row>
      <Row>
        <Button id="settings" onClick={props.handleShow}>
          <FontAwesomeIcon icon={faSlidersH} /> Settings
        </Button>
      </Row>
      <Row>
        <Button id="reset" onClick={handleReset}>
          <FontAwesomeIcon icon={faRedoAlt} /> Reset
        </Button>
      </Row>
    </Container>
  );
}
