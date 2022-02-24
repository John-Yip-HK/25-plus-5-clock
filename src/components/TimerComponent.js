import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TimerState } from "../context/Context";

export default function TimerComponent() {
  const {
    state: { mainMinutes, auxiliaryMinutes, seconds, mode },
  } = TimerState();

  const twoPlaceTime = (time) => (time < 10 ? "0" : "") + time;

  const timerLabel = mode === "S" ? "Session" : "Break";
  const auxTimerLabel = mode === "S" ? "Break" : "Session";
  let timeLeft = `${twoPlaceTime(mainMinutes)}:${twoPlaceTime(seconds)}`;

  return (
    <Row>
      <Col id="timer" className="d-flex flex-column justify-content-center">
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
            <span id="auxiliary-time-span">{auxiliaryMinutes}:00</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
