import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "../toggle-button.scss";

export default function Header() {
  return (
    <Col id="header-container">
      <Row>
        <Col>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </Col>
      </Row>
    </Col>
  );
}
