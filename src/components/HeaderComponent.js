import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function TimeWindow({ details }) {
  return (
    <Container className={`${details["id-prefix"]}-wrapper`}>
      <Row>
        <Col>
          <h1 id={`${details["id-prefix"]}-label`}>{details.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="time-window">
            <h2
              className="time-window-value"
              id={`${details["id-prefix"]}-length`}
            >
              {details.time}
            </h2>
          </div>
        </Col>
      </Row>
      <Row className="adjust-button">
        <Col>
          <Button
            id={`${details["id-prefix"]}-increment`}
            onClick={() => details.timeUp(details.type)}
          >
            up
          </Button>
        </Col>
        <Col>
          <Button
            id={`${details["id-prefix"]}-decrement`}
            onClick={() => details.timeDown(details.type)}
          >
            down
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default function Header(props) {
  return (
    <>
      <Col>
        <h2 id="heading">25 + 5 Clock</h2>
        <Modal
          show={props.show}
          onHide={props.handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h2>Session Length</h2>
            <h2>Break Length</h2> */}
            <TimeWindow
              details={{
                title: "Session Length",
                "id-prefix": "session",
                time: props.session,
                type: "S",
                timeUp: props.increaseTime,
                timeDown: props.decreaseTime,
              }}
              timeUp={props.increaseTime}
            />
            <TimeWindow
              details={{
                title: "Break Length",
                "id-prefix": "break",
                time: props.breakTime,
                type: "B",
                timeUp: props.increaseTime,
                timeDown: props.decreaseTime,
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </>
  );
}
