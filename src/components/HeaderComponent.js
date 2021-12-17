import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Header(props) {
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
                {tempTime}
              </h2>
            </div>
          </Col>
        </Row>
        <Row className="adjust-button">
          <Col>
            <Button
              id={`${details["id-prefix"]}-decrement`}
              onClick={decreaseTime}
            >
              down
            </Button>
          </Col>
          <Col>
            <Button
              id={`${details["id-prefix"]}-increment`}
              onClick={increaseTime}
            >
              up
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  const handleConfirm = () => {
    const [newSession, newBreakTime] = Array.from(
      document.querySelectorAll(".time-window-value")
    ).map((element) => +element.innerHTML);

    props.setTime(newSession, newBreakTime);

    props.handleClose();
  };

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
            {TimeWindow({
              title: "Session Length",
              "id-prefix": "session",
              time: props.session,
            })}
            {TimeWindow({
              title: "Break Length",
              "id-prefix": "break",
              time: props.breakTime,
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </>
  );
}
