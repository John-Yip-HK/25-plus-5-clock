import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  return (
    <Container className="d-flex align-items-center flex-column">
      <Row>
        <Col>
          <h2 id="heading">25 + 5 Clock</h2>
        </Col>
      </Row>
      <Row>
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
      </Row>
      <Row>
        <Container
          id="button-container"
          className="d-flex align-items-center flex-column"
        >
          <Row>
            <Button id="start_stop">Start</Button>
          </Row>
          <Row>
            <Button>Settings</Button>
          </Row>
          <Row>
            <Button id="reset">Reset Timer</Button>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default App;
