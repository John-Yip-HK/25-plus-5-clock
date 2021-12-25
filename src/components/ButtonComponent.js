import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH,
  faPlay,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function ButtonComponent(props) {
  const handleTimer = (event) => {
    const elementWithCaption = event.target.children[1];

    if (elementWithCaption.innerHTML === "Start")
      props.runTimer(elementWithCaption);
    else props.pauseTimer(elementWithCaption);
  };

  const handleReset = () => {
    props.resetTime(document.getElementById("start_stop_caption"));
  };

  return (
    <Container
      id="button-container"
      className="d-flex align-items-center flex-column"
    >
      <Row>
        <Button id="start_stop" onClick={handleTimer}>
          <FontAwesomeIcon icon={faPlay} />{" "}
          <span id="start_stop_caption">Start</span>
        </Button>
      </Row>
      <Row>
        <Button onClick={props.handleShow}>
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
