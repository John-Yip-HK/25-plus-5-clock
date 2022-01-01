import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  const arrowUp = <FontAwesomeIcon icon={faArrowAltCircleUp} size="2x" />;
  const arrowDown = <FontAwesomeIcon icon={faArrowAltCircleDown} size="2x" />;

  const TimeWindow = (details) => {
    let tempTime = details.time;

    const increaseTime = () => {
      if (tempTime < 60) {
        tempTime += 1;
        document.getElementById(`${details["id-prefix"]}-length`).innerHTML =
          tempTime;
      }
    };
    const decreaseTime = () => {
      if (tempTime > 1) {
        tempTime -= 1;
        document.getElementById(`${details["id-prefix"]}-length`).innerHTML =
          tempTime;
      }
    };

    return (
      <Container className={`${details["id-prefix"]}-wrapper`}>
        <Row>
          <Col>
            <h2 id={`${details["id-prefix"]}-label`}>{details.title}</h2>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          <Col>
            <Button
              id={`${details["id-prefix"]}-decrement`}
              onClick={decreaseTime}
            >
              {arrowDown}
            </Button>
          </Col>
          <Col>
            <div className="time-window">
              <h2
                className="time-window-value"
                id={`${details["id-prefix"]}-length`}
              >
                {tempTime}
              </h2>
            </div>
          </Col>
          <Col>
            <Button
              id={`${details["id-prefix"]}-increment`}
              onClick={increaseTime}
            >
              {arrowUp}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Container className="d-flex align-items-center flex-column">
      <Row>
        <Col>
          <h2 id="heading">25 + 5 Clock</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {TimeWindow({
            title: "Session Length",
            "id-prefix": "session",
            time: props.session,
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          {TimeWindow({
            title: "Break Length",
            "id-prefix": "break",
            time: props.breakTime,
          })}
        </Col>
      </Row>
    </Container>
  );
}
