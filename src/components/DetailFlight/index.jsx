import { Container, Row, Col, Image } from "react-bootstrap";
import exampleAirlineLogo from "../../assets/airlineLogo.png";
import PropTypes from "prop-types";

const DetailFlight = () => {
  return (
    <Container>
      <Row>
        <h6 style={{ fontWeight: "bold" }}>Detail Penerbangan</h6>
      </Row>
      <Row>
        <Col xs={6}>
          <p style={{ fontWeight: "bold" }} className="m-0">
            07.00
          </p>
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <p style={{ fontWeight: "bold" }} className="m-0">
            Keberangkatan
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="m-0">3 Maret 2023</p>
          <p style={{ fontWeight: "500" }} className="m-0">
            Soekarno Hatta - Terminal 1A Domestik
          </p>
          <hr className="solid"></hr>
        </Col>
      </Row>
      <Row>
        <Col md={{}}>
          <p style={{ fontWeight: "bold" }} className="my-0 mx-1 ps-4">
            Jet Air - Economy
          </p>
          <p style={{ fontWeight: "bold" }} className="my-0 mx-1 ps-4">
            JT - 203
          </p>
          <br></br>
          <p className="my-0" style={{ fontWeight: "bold" }}>
            <Image src={exampleAirlineLogo} className="me-1" />
            Informasi
          </p>
          <p className="my-0 mx-1 ps-4">Baggage 20kg</p>
          <p className="my-0 mx-1 ps-4">Cabin baggage 7 kg</p>
          <p className="my-0 mx-1 ps-4">In Flight Entertainment</p>
          <hr className="solid"></hr>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <p style={{ fontWeight: "bold" }} className="m-0">
            07.00
          </p>
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <p style={{ fontWeight: "bold" }} className="m-0">
            Kedatangan
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="m-0">3 Maret 2023</p>
          <p style={{ fontWeight: "500" }} className="m-0">
            Melbourne International Airport
          </p>
        </Col>
      </Row>
    </Container>
  );
};

DetailFlight.propTypes = {
  text: PropTypes.string,
};

export default DetailFlight;
