import { useRef } from "react";
import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../toggle-button.scss";

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
    const changeTheme = () => {
      const { current } = toggler;

      if (watchDarkTheme.matches) {
        if (!current.checked) current.click();
      } else {
        if (current.checked) current.click();
      }
    };
    window.onload = changeTheme();
    watchDarkTheme.addEventListener("change", changeTheme);

    return () => watchDarkTheme.removeEventListener("change", changeTheme);
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
        </Col>
      </Row>
    </Col>
  );
}
