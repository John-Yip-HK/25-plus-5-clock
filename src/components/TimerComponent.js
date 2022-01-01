import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TimerComponent(props) {
  const twoPlaceTime = (time) => (time < 10 ? "0" : "") + time;

  const timerLabel = props.mode === "S" ? "Session" : "Break";
  const auxTimerLabel = props.mode === "S" ? "Break" : "Session";
  let timeLeft = `${twoPlaceTime(props.mainMinutes)}:${twoPlaceTime(
    props.seconds
  )}`;

  return (
    <Container id="timer">
      <Row>
        <Col id="timer-label">{timerLabel}</Col>
      </Row>
      <Row>
        <Col>
          <h1 id="time-left">{timeLeft}</h1>
        </Col>
      </Row>
      <Row>
        <Col id="auxiliary-time">
          <span id="auxiliary-time-label">{auxTimerLabel}</span>:&nbsp;
          <span id="auxiliary-time-span">{props.auxiliaryMinutes}:00</span>
        </Col>
      </Row>
    </Container>
  );
}
