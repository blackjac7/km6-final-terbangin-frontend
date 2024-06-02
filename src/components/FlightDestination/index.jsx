import { Row, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import Arrow from "../../assets/Arrow.svg";

const FlightDestination = () => {
  return (
    <Row className="d-flex justify-content-center">
      <Col
        md={1}
        xs={3}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <p style={{ fontWeight: "bold", marginBottom: 0 }}>07.00</p>
        <p style={{ marginBottom: 0 }}>JKT</p>
      </Col>
      <Col
        md={9}
        xs={4}
        className="d-flex flex-column justify-content-center"
        style={{ textAlign: "center" }}
      >
        <p className="my-0" style={{ marginBottom: 0 }}>
          4h 0m
        </p>
        <Image src={Arrow} className="img-fluid" style={{ marginBottom: 0 }} />
        <p className="my-0">Flight Duration</p>
      </Col>
      <Col
        md={1}
        xs={3}
        className="d-flex flex-column align-items-center  justify-content-center"
      >
        <p style={{ fontWeight: "bold", marginBottom: 0 }}>11.00</p>
        <p style={{ marginBottom: 0 }}>MLB</p>
      </Col>
    </Row>
  );
};

FlightDestination.propTypes = {
  text: PropTypes.string,
};

export default FlightDestination;
