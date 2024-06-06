import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";

// Import data sementara
import flightData from "../../dumpData/flight.json";
import bookingData from "../../dumpData/booking.json";

import HeaderShadow from "../../components/HeaderShadow";
import BackButton from "../../components/BackButton";
import DetailFlight from "../../components/FlightDetail";
import FlightDestination from "../../components/FlightDestination";

const OrderHistory = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const handleDetailClick = (booking) => {
    if (selectedBooking?.id === booking.id) {
      setShowDetail(!showDetail);
    } else {
      setSelectedBooking(booking);
      setShowDetail(true);
    }

    if (isMobile) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <HeaderShadow>
        <h4 style={{ fontWeight: 700 }}>Riwayat Pemesanan</h4>
        <Row className="my-4 g-2">
          <Col xs={12} md={10} className="d-flex">
            <BackButton ButtonText={"Beranda"} />
          </Col>
          <Col xs={12} md={2} className="d-flex">
            <Button
              variant="outline-primary"
              style={{ borderRadius: 14 }}
              className="flex-fill"
            >
              Filter
            </Button>
          </Col>
        </Row>
      </HeaderShadow>
      {/* Month for make section history per-month */}
      <Container className="my-3">
        <Row className="mx-sm-4">
          <h5>Maret 2024</h5>
        </Row>
      </Container>

      {/* Main Content */}
      <Container>
        <Row className="mx-sm-4">
          <Col md={7}>
            <HistoryDestination
              onDetailClick={handleDetailClick}
              isActive={isActive}
              setIsActive={setIsActive}
              selectedBooking={selectedBooking}
            />
          </Col>
          {showDetail && !isMobile && selectedBooking && (
            <Col md={5} className="px-4">
              <HistoryDetail booking={selectedBooking} />
            </Col>
          )}
        </Row>
      </Container>

      {/* If mobile breakpoint is true, then show modal */}
      {isMobile && selectedBooking && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Body>
            <HistoryDetail booking={selectedBooking} />
          </Modal.Body>
          <Container>
            <hr />
            <Row className="pb-3 d-flex justify-content-between">
              <Col xs={6} className="d-flex">
                <Button className="flex-fill" variant="primary">
                  Cetak Tiket
                </Button>
              </Col>
              <Col xs={6} className="d-flex">
                <Button
                  className="flex-fill"
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal>
      )}
    </>
  );
};

const HistoryDestination = ({ onDetailClick, isActive, setIsActive }) => {
  return (
    <>
      {bookingData.map((booking) => {
        const flight = flightData.find((f) => f.id === booking.flightId);
        return (
          <Button
            key={booking.id}
            className="mb-3"
            variant="custom"
            onMouseDown={() =>
              setIsActive((active) =>
                active === booking.id ? null : booking.id
              )
            }
            onClick={() => onDetailClick(booking)}
            style={{
              border: isActive === booking.id ? "2px solid purple" : "",
              boxShadow: "1px 0 5px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.50rem",
            }}
          >
            <Row>
              <Col md={12} className="d-flex justify-content-start py-2">
                <StatusPayment booking={booking} />
              </Col>
              <Col md={12}>
                {/* fetching data here */}
                {flight && (
                  <FlightDestination
                    departureAt={flight.departureAt}
                    departureDate={flight.departureDate}
                    departureCity={flight.departureCity}
                    flightDuration={flight.flightDuration}
                    arrivalCity={flight.arrivalCity}
                    arrivalDate={flight.arrivalDate}
                    arrivalAt={flight.arrivalAt}
                  />
                )}
                <hr className="solid" />
              </Col>
              <Row style={{ textAlign: "left" }}>
                <Col md={4}>
                  <p style={{ margin: 0, fontWeight: "700" }}>Booking Code:</p>
                  <p>{booking.id}</p>
                </Col>
                <Col md={4}>
                  <p style={{ margin: 0, fontWeight: "700" }}>Class:</p>
                  <p>{flight.seatClass}</p>
                </Col>
                <Col md={4} className="">
                  <p style={{ margin: 0, fontWeight: "700" }}>Total Payment:</p>
                  <p>IDR 9.850.000</p>
                </Col>
              </Row>
            </Row>
          </Button>
        );
      })}
    </>
  );
};

const StatusPayment = ({ booking }) => {
  return (
    <p
      style={{
        backgroundColor: (() => {
          switch (booking.status) {
            case "Issued":
              return "green";
            case "Canceled":
              return "red";
            default:
              return "grey";
          }
        })(),
        color: "white",
        borderRadius: 10,
        margin: 0,
        padding: "0.375rem 0.75rem",
        lineHeight: 1.5,
        textAlign: "center",
      }}
    >
      {booking.status}
    </p>
  );
};

const HistoryDetail = ({ booking }) => {
  const flight = flightData.find((f) => f.id === booking.flightId);
  return (
    <Container className="pb-5">
      {/* fetching data here */}

      <DetailFlight
        TitleDetail={"Detail Pesanan"}
        BookingCode={`Booking Code: ${booking.id}`}
        BookingStatus={<StatusPayment booking={booking} />}
        departureAt={flight.departureAt}
        departureDate={flight.arrivalDate}
        departureAirport={flight.departureAirport}
        departureTerminal={flight.departureTerminal}
        arrivalAt={flight.arrivalAt}
        arrivalDate={flight.arrivalDate}
        arrivalAirport={flight.arrivalAirport}
        arrivalTerminal={flight.arrivalTerminal}
        airlineName={flight.airlineName}
        seatClass={flight.seatClass}
        airlineSerialNumber={flight.airlineSerialNumber}
        baggage={flight.baggage}
        cabinBaggage={flight.cabinBaggage}
        additionals={flight.additionals}
        isPassanger={true}
        isPrice={true}
      />
    </Container>
  );
};

export default OrderHistory;
