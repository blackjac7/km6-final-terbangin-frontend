import { Row, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import Arrow from "../../assets/Arrow.svg";

const FlightDestination = ({
  departureAt,
  departureDate,
  departureCity,
  flightDuration,
  arrivalAt,
  arrivalDate,
  arrivalCity,
}) => {
  return (
    <Row className="d-flex justify-content-center">
      <Col
        md={3}
        xs={3}
        className="d-flex flex-column align-items-center  justify-content-center"
      >
        <p style={{ fontWeight: "bold", marginBottom: 0 } }>{departureAt}</p>
        <p style={{ marginBottom: 0 }}>{departureDate}</p>
        <p style={{ marginBottom: 0 }}>{departureCity}</p>
      </Col>
      <Col
        md={6}
        xs={4}
        className="d-flex flex-column justify-content-center"
        style={{ textAlign: "center" }}
      >
        <p className="my-0" style={{ marginBottom: 0 }}>
          {flightDuration}
        </p>
        <Image src={Arrow} className="img-fluid" style={{ marginBottom: 0 }} />
        <p className="my-0">Flight Duration</p>
      </Col>
      <Col
        md={3}
        xs={3}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <p style={{ fontWeight: "bold", marginBottom: 0 }}>{arrivalAt}</p>
        {arrivalDate}
        <p style={{ marginBottom: 0 }}>{arrivalCity}</p>
      </Col>
    </Row>
  );
};

FlightDestination.propTypes = {
  text: PropTypes.string,
};

export default FlightDestination;
