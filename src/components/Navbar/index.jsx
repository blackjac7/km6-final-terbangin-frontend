import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/Logo/svg/logo-no-background.svg";
import search from "../../assets/Cards/b_search.png";
import login from "../../assets/fi_log-in.png";

function NavScrollExample() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary border-bottom"
      style={{
        boxShadow: " 1px 0 10px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={logo} height={30} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex ">
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
              <img src={search} alt="" />
            </button>
          </Form>
          <Button
            className="d-flex ms-auto mt-2 "
            style={{
              backgroundColor: "#7126b5",
              borderColor: "#7126b5",
            }}
            as={Link}
            to="/login"
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <img src={login} className="me-2" />
              Masuk
            </span>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
