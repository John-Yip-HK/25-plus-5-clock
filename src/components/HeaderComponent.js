import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Header(props) {
  return (
    <>
      <Col>
        <h2 id="heading">25 + 5 Clock</h2>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Session Length</h2>
            <h2>Break Length</h2>
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
