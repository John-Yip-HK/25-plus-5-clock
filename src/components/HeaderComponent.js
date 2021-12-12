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
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </>
  );
}
