import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import "../toggle-button.scss";

export default function Header() {
  return (
    <Col id="header-container">
      <Row>
        <Col>
          <label className="switch">
            <input type="checkbox" id="theme-toggler" />
            <span className="slider round"></span>
          </label>
        </Col>
        {/* <Col>
          <Form.Check type="switch" id="custom-switch" label="Dark Mode" />
        </Col> */}
      </Row>
    </Col>
  );
}
