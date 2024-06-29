import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Row, Col, Button, Container, Accordion, Modal } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// hard data
import PaymentData from "../../dumpData/payment.json";

import BookingCode from "../../components/BookingWithCode";
import HeaderShadow from "../../components/HeaderShadow";
import DetailFlight from "../../components/FlightDetail";
import PassangerDetail from "../../components/PassangerDetail";
import Price from "../../components/PriceDetail/Price";

import { useState, useEffect } from "react";

const Payment = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* Header */}
            <HeaderShadow>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    className="pt-4"
                    aria-label="breadcrumb"
                    style={{
                        fontWeight: "700",
                        fontSize: "23px",
                        color: "black",
                    }}
                >
                    <Link underline="hover" key="1" color="inherit" href="#">
                        Isi Data Diri
                    </Link>
                    ,
                    <Link
                        underline="hover"
                        key="2"
                        color="inherit"
                        href="/payment"
                    >
                        Bayar
                    </Link>
                    ,
                    <Link
                        underline="hover"
                        key="3"
                        color="inherit"
                        style={{ fontWeight: 300 }}
                    >
                        Selesai
                    </Link>
                    ,
                </Breadcrumbs>

                {/* Midtrans or Internal timer */}
                <Row className="my-4 g-2">
                    <Col md={12} className="d-flex">
                        <Button
                            variant="danger"
                            className="flex-fill"
                            size="lg"
                        >
                            Selesaikan Pembayaran sampai 10 Maret 2023 12:00
                        </Button>
                    </Col>
                </Row>
            </HeaderShadow>

            {/* Main Content */}
            <Container className="my-3">
                <Row className="mx-sm-4">
                    {/* Detail Booking */}
                    <Col
                        md={5}
                        xs={12}
                        // its just for aesthetically purpose
                        className={
                            isMobile ? "pb-3 d-flex" : "px-4 order-md-1 "
                        }
                    >
                        {/* If mobile breakout is true, booking detail can be show by click the button, else show on the right side page */}
                        {isMobile ? <DetailBookingMobile /> : <BookingDetail />}
                    </Col>
                    {/* Embed for Midtrans */}
                    <Col md={7} xs={12}>
                        <h4>Isi Data Pembayaran </h4>
                        <PaymentEmbedMidtrans />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

// average fetching data here
const BookingDetail = () => {
    return (
        <Container className="pb-5">
            {/* Flight Information */}
            {/* <DetailFlight
        TitleDetail={"Detail Pesanan"}
        BookingCode={`Booking Code: ${PaymentData.bookingCode}`}
        departureAt={PaymentData.departureAt}
        departureDate={PaymentData.arrivalDate}
        departureAirport={PaymentData.departureAirport}
        departureTerminal={PaymentData.departureTerminal}
        arrivalAt={PaymentData.arrivalAt}
        arrivalDate={PaymentData.arrivalDate}
        arrivalAirport={PaymentData.arrivalAirport}
        arrivalTerminal={PaymentData.arrivalTerminal}
        airlineName={PaymentData.airlineName}
        seatClass={PaymentData.seatClass}
        airlineSerialNumber={PaymentData.airlineSerialNumber}
        baggage={PaymentData.baggage}
        cabinBaggage={PaymentData.cabinBaggage}
        additionals={PaymentData.additionals}
      /> 
            Passanger Information 
            {div>
        <hr />
        <p style={{ marginBottom: 0, fontWeight: "bold" }}>
          Informasi Penumpang
        </p>
        {PaymentData.passanger.map((passenger, index) => (
          <PassangerDetail
            key={index}
            index={index}
            passangerName={passenger.name}
            passangerId={passenger.id}
          />
        ))}
      </div> 
            {/* Price Information, confused for implement hard data xD  */}
            <PriceDetail />
            
        </Container>
    );
};

const DetailBookingMobile = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                className="flex-fill"
                variant="primary"
                onClick={handleShow}
            >
                Detail Flight
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <BookingDetail />
                <Container>
                    <hr />
                    <Row className="pb-3 d-flex justify-content-between">
                        <Col xs={12} className="d-flex">
                            <Button
                                className="flex-fill"
                                variant="secondary"
                                onClick={() => handleClose(false)}
                            >
                                Close
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </>
    );
};

const PaymentEmbedMidtrans = () => {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Gopay</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Virtual Accounts</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Credit Card</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default Payment;
