import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TimerComponent(props) {
  const twoPlaceTime = (time) => (time < 10 ? "0" : "") + time;

  const twoPlaceSeconds = twoPlaceTime(props.seconds);
  const twoPlaceMainMinutes = twoPlaceTime(props.mainMinutes);

  return (
    <Container id="timer">
      <Row>
        <Col id="timer-label">Session</Col>
      </Row>
      <Row>
        <Col>
          <h1 id="time-left">
            {twoPlaceMainMinutes}:{twoPlaceSeconds}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col id="auxiliary-time">
          <span id="auxiliary-time-label">Break</span>:&nbsp;
          <span id="auxiliary-time-span">{props.auxiliaryMinutes}:00</span>
        </Col>
      </Row>
    </Container>
  );
}
