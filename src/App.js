import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';

function App() {
  return (
    <Container>
      <Row>
        <Col><h3>25 + 5 Clock</h3></Col>
      </Row>
      <Row>
        <Container>
          <Row>
            <Col>Session</Col>
          </Row>
          <Row>
            <Col><h2>25:00</h2></Col>
          </Row>
          <Row>
            <Col>Break: 5:00</Col>
          </Row>
        </Container>
      </Row>
      <Row>
        <Button>Start</Button>
      </Row>
      <Row>
        <Button>Settings</Button>
      </Row>
      <Row>
        <Button>Reset Timer</Button>
      </Row>
    </Container>
  );
}

export default App;
