import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary border-bottom">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="src\assets\Logo\svg\logo-no-background.svg" height={75} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ borderRadius: "10px 0px 0px 10px" }}
            />
            <button
              style={{
                border: "1px solid #DEE2E6",
                borderRadius: "0px 10px 10px 0px",
              }}
            >
              <img src="src\assets\Cards\b_search.png" alt="" />
            </button>
          </Form>
          <Button
            className="d-flex ms-auto"
            style={{
              backgroundColor: "#7126b5",
              borderColor: "#7126b5",
            }}
            as={Link}
            to="/login"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <img src="src\assets\fi_log-in.png" className="me-2" />
              Masuk
            </span>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
