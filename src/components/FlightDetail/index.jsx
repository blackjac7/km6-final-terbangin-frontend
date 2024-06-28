import { Row, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";

const DetailFlight = ({
    TitleDetail,
    BookingCode,
    BookingStatus,
    departureTime,
    departureDate,
    departureAirport,
    departureTerminal,
    arrivalTime,
    arrivalDate,
    arrivalAirport,
    arrivalTerminal,
    airlineName,
    airlineLogo,
    flightCode,
    seatClass,
    baggage,
    cabinBaggage,
    additionals,
}) => {
    return (
        <>
            <Row>
                <Col
                    md={6}
                    xs={6}
                    className="d-flex align-items-center w-100"
                    style={{ textAlign: "center" }}
                >
                    <h6
                        style={{
                            fontWeight: "bold",
                            color: "#7126b5",
                        }}
                    >
                        {TitleDetail}
                    </h6>
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
                        {departureTime}
                    </p>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                    <p
                        style={{ fontWeight: "600", color: "#8e6fdd" }}
                        className="m-0"
                    >
                        Keberangkatan
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="m-0">
                        {
                            (departureDate = new Date(
                                departureDate
                            ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }))
                        }
                    </p>
                    <p style={{ fontWeight: "500" }} className="m-0">
                        {departureAirport}
                    </p>
                    <p className="m-0">{departureTerminal}</p>
                    <hr className="solid" />
                </Col>
            </Row>
            <Row>
                <Col md={{}}>
                    <p
                        style={{ fontWeight: "bold" }}
                        className="my-0 mx-1 ps-5"
                    >
                        {airlineName} - {seatClass}
                    </p>
                    <p
                        style={{ fontWeight: "bold" }}
                        className="my-0 mx-1 ps-5"
                    >
                        {flightCode}
                    </p>
                    <br />
                    <p className="my-0" style={{ fontWeight: "bold" }}>
                        <Image
                            src={airlineLogo}
                            className="me-1"
                            style={{ maxWidth: "50px" }}
                        />
                        Informasi Penerbangan
                    </p>
                    <p className="my-0 mx-1 ps-5">Baggage {baggage} kg</p>
                    <p className="my-0 mx-1 ps-5">
                        Cabin baggage {cabinBaggage} kg
                    </p>
                    <p className="my-0 mx-1 ps-5">{additionals}</p>
                    <hr className="solid" />
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <p style={{ fontWeight: "bold" }} className="m-0">
                        {arrivalTime}
                    </p>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                    <p
                        style={{ fontWeight: "600", color: "#8e6fdd" }}
                        className="m-0"
                    >
                        Kedatangan
                    </p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <p className="m-0">
                        {
                            (arrivalDate = new Date(
                                arrivalDate
                            ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }))
                        }
                    </p>
                    <p style={{ fontWeight: "500" }} className="m-0">
                        {arrivalAirport}
                    </p>
                    <p className="m-0">{arrivalTerminal}</p>
                </Col>
            </Row>
        </>
    );
};

DetailFlight.propTypes = {
    text: PropTypes.string,
};

export default DetailFlight;
