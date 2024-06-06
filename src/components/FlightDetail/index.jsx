import { Row, Col, Image } from "react-bootstrap";
import exampleAirlineLogo from "../../assets/airlineLogo.png";
import PropTypes from "prop-types";

const DetailFlight = ({
  TitleDetail,
  BookingCode,
  BookingStatus,
  departureAt,
  departureDate,
  departureAirport,
  departureTerminal,
  arrivalAt,
  arrivalDate,
  arrivalAirport,
  arrivalTerminal,
  airlineName,
  airlineSerialNumber,
  seatClass,
  baggage,
  cabinBaggage,
  additionals,
  isPassanger,
  isPrice,
}) => {
  return (
    <>
      <Row>
        <Col md={6} xs={6} className="d-flex align-items-center ">
          <h6 style={{ fontWeight: "bold" }}>{TitleDetail}</h6>
        </Col>
        <Col
          md={6}
          xs={6}
          className="d-flex justify-content-end align-self-center"
        >
          {BookingStatus}
        </Col>
      </Row>
      <Row className="">
        <p>{BookingCode}</p>
      </Row>

      <Row>
        <Col xs={6}>
          <p style={{ fontWeight: "bold" }} className="m-0">
            {departureAt}
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
          <p className="m-0">{departureDate}</p>
          <p style={{ fontWeight: "500" }} className="m-0">
            {departureAirport} - {departureTerminal}
          </p>
          <hr className="solid" />
        </Col>
      </Row>
      <Row>
        <Col md={{}}>
          <p style={{ fontWeight: "bold" }} className="my-0 mx-1 ps-4">
            {airlineName} - {seatClass}
          </p>
          <p style={{ fontWeight: "bold" }} className="my-0 mx-1 ps-4">
            {airlineSerialNumber}
          </p>
          <br></br>
          <p className="my-0" style={{ fontWeight: "bold" }}>
            <Image src={exampleAirlineLogo} className="me-1" />
            Informasi Penerbangan
          </p>
          <p className="my-0 mx-1 ps-4">Baggage {baggage}</p>
          <p className="my-0 mx-1 ps-4">Cabin Baggage {cabinBaggage}</p>
          <p className="my-0 mx-1 ps-4">{additionals}</p>
          <hr className="solid" />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <p style={{ fontWeight: "bold" }} className="m-0">
            {arrivalAt}
          </p>
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <p style={{ fontWeight: "bold" }} className="m-0">
            Kedatangan
          </p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <p className="m-0">{arrivalDate}</p>
          <p style={{ fontWeight: "500" }} className="m-0">
            {arrivalAirport} - {arrivalTerminal}
          </p>
        </Col>
      </Row>
      <Row className="mb-3">{isPassanger && <Passanger />}</Row>
      <Row>{isPrice && <Price />}</Row>
    </>
  );
};

const Passanger = () => {
  return (
    <>
      <hr />
      <p style={{ marginBottom: 0, fontWeight: "bold" }}>Informasi Penumpang</p>
      <p style={{ marginBottom: 0 }}>Penumpang 1: Mr. Harry Potter</p>
      <p style={{ marginBottom: 0 }}>ID: 1234567</p>
      <p style={{ marginBottom: 0 }}>Penumpang 2: Miss Hermione</p>
      <p style={{ marginBottom: 0 }}>ID: 789658</p>
    </>
  );
};

const Price = () => {
  return (
    <>
      <hr />
      <p style={{ marginBottom: 0, fontWeight: "bold" }}>Rincian Harga</p>
      <Row>
        <Col xs={6} md={6}>
          2 Adults
        </Col>
        <Col xs={6} md={6}>
          IDR 9.550.000
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={6}>
          1 Baby
        </Col>
        <Col xs={6} md={6}>
          IDR 0
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6} md={6}>
          Tax
        </Col>
        <Col xs={6} md={6}>
          IDR 300.000
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>Total</Col>
        <Col xs={6} md={6}>
          IDR 9.550.000
        </Col>
      </Row>
    </>
  );
};

DetailFlight.propTypes = {
  text: PropTypes.string,
};

export default DetailFlight;
