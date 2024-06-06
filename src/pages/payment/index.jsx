import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Row, Col, Button, Container } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HeaderShadow from "../../components/HeaderShadow";

import flightData from "../../dumpData/flight.json";

import DetailFlight from "../../components/FlightDetail";

const Payment = () => {
  return (
    <>
      <HeaderShadow>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
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
          <Col md={7}>
            <h4>Isi Data Pembayaran </h4>
          </Col>
          <Col md={5} className="px-4">
            <BookingDetail />
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
export default Payment;
