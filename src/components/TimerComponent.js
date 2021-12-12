import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TimerComponent() {
  return (
    <Container id="timer">
      <Row>
        <Col id="timer-label">Session</Col>
      </Row>
      <Row>
        <Col>
          <h1 id="time-left">25:00</h1>
        </Col>
      </Row>
      <Row>
        <Col id="break-time">
          Break: <span id="break-time-span">5:00</span>
        </Col>
      </Row>
    </Container>
  );
}
