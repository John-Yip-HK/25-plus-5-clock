import { useRef } from "react";
import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Form from "react-bootstrap/Form";
import "./toggle-button.scss";

export default function Header() {
  const watchDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const toggler = useRef();

  const changeTheme = (event) => {
    const body = document.body;

    if (event.target.checked) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  };

  useEffect(() => {
    const toggleChangeTheme = () => {
      const { current } = toggler;

      if (watchDarkTheme.matches) {
        if (!current.checked) current.click();
      } else {
        if (current.checked) current.click();
      }
    };
    window.onload = toggleChangeTheme();
    watchDarkTheme.addEventListener("change", toggleChangeTheme);

    return () =>
      watchDarkTheme.removeEventListener("change", toggleChangeTheme);
  }, []);

  return (
    <Col id="header-container">
      <Row>
        <Col>
          <label className="switch">
            <input
              type="checkbox"
              id="theme-toggler"
              onClick={changeTheme}
              ref={toggler}
            />
            <span className="slider round"></span>
          </label>

          {/* <Form>
            <Form.Check
              type="switch"
              id="theme-toggler"
              className="switch"
              onClick={changeTheme}
              ref={toggler}
              label="🌞/🌛"
            />
          </Form> */}
        </Col>
      </Row>
    </Col>
  );
}
