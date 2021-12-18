import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default function ButtonComponent(props) {
  const handleTimer = (event) => {
    const element = event.target;

    if (element.innerHTML === "Start") props.runTimer(element);
    else props.pauseTimer(element);
  };

  return (
    <Container
      id="button-container"
      className="d-flex align-items-center flex-column"
    >
      <Row>
        <Button id="start_stop" onClick={handleTimer}>
          Start
        </Button>
      </Row>
      <Row>
        <Button onClick={props.handleShow}>Settings</Button>
      </Row>
      <Row>
        <Button id="reset" onClick={props.resetTime}>
          Reset Timer
        </Button>
      </Row>
    </Container>
  );
}
