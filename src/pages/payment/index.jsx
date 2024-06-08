import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Row, Col, Button, Container, Accordion, Modal } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HeaderShadow from "../../components/HeaderShadow";

import flightData from "../../dumpData/flight.json";

import DetailFlight from "../../components/FlightDetail";
import { useState, useEffect } from "react";

const Payment = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value based on the current window size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <HeaderShadow>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          className="pt-4"
          aria-label="breadcrumb"
          style={{ fontWeight: "700", fontSize: "23px", color: "black" }}
        >
          <Link underline="hover" key="1" color="inherit" href="/">
            Isi Data Diri
          </Link>
          ,
          <Link underline="hover" key="2" color="inherit">
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
        <Row className="my-4 g-2">
          <Col md={12} className="d-flex">
            <Button variant="danger" className="flex-fill" size="lg">
              Selesaikan Pembayaran sampai 10 Maret 2023 12:00
            </Button>
          </Col>
        </Row>
      </HeaderShadow>
      <Container className="my-3">
        <Row className="mx-sm-4">
          <Col
            md={5}
            xs={12}
            className={isMobile ? "pb-3 d-flex" : "px-4 order-md-1 "}
          >
            {isMobile ? <DetailBookingMobile /> : <BookingDetail />}
          </Col>
          <Col md={7} xs={12} className="">
            <h4>Isi Data Pembayaran </h4>
            <PaymentEmbedMidtrans />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const BookingDetail = () => {
  return (
    <Container className="pb-5">
      <DetailFlight
        TitleDetail={"Detail Pesanan"}
        BookingCode={`Booking Code: bookingCode1`}
        departureAt={flightData[1].departureAt}
        departureDate={flightData[1].arrivalDate}
        departureAirport={flightData[1].departureAirport}
        departureTerminal={flightData[1].departureTerminal}
        arrivalAt={flightData[1].arrivalAt}
        arrivalDate={flightData[1].arrivalDate}
        arrivalAirport={flightData[1].arrivalAirport}
        arrivalTerminal={flightData[1].arrivalTerminal}
        airlineName={flightData[1].airlineName}
        seatClass={flightData[1].seatClass}
        airlineSerialNumber={flightData[1].airlineSerialNumber}
        baggage={flightData[1].baggage}
        cabinBaggage={flightData[1].cabinBaggage}
        additionals={flightData[1].additionals}
        isPassanger={true}
        isPrice={true}
      />
    </Container>
  );
};

const DetailBookingMobile = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="flex-fill" variant="primary" onClick={handleShow}>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Virtual Accounts</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Credit Card</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Payment;
