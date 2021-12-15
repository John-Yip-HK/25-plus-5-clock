import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TimerComponent(props) {
  return (
    <Container id="timer">
      <Row>
        <Col id="timer-label">Session</Col>
      </Row>
      <Row>
        <Col>
          <h1 id="time-left">{props.session}:00</h1>
        </Col>
      </Row>
      <Row>
        <Col id="break-time">
          Break: <span id="break-time-span">{props.breakTime}:00</span>
        </Col>
      </Row>
    </Container>
  );
}
