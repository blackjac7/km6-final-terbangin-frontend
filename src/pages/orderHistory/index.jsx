import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";

// hard data
import bookingData from "../../dumpData/booking.json";

import HeaderShadow from "../../components/HeaderShadow";
import BackButton from "../../components/BackButton";
import DetailFlight from "../../components/FlightDetail";
import FlightDestination from "../../components/FlightDestination";
import PassangerDetail from "../../components/PassangerDetail";
import PriceDetail from "../../components/PriceDetail";

const OrderHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // this function is for toggle active status history list, for purple border purpose
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
      {/* Header */}
      <HeaderShadow>
        <h4 className="pt-4" style={{ fontWeight: 700 }}>
          Riwayat Pemesanan
        </h4>
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
          {/* If mobile breakpoint is false, the detail history will show on right side page */}
          {showDetail && !isMobile && selectedBooking && (
            <Col md={5} className="px-4">
              <HistoryDetail booking={selectedBooking} />
            </Col>
          )}
        </Row>
      </Container>

      {/* If mobile breakpoint is true, the detail history will show by modal */}
      {isMobile && selectedBooking && (
        <HistoryDetailMobile
          setShowModal={setShowModal}
          showModal={showModal}
          booking={selectedBooking}
        />
      )}
    </>
  );
};

const HistoryDestination = ({ onDetailClick, isActive, setIsActive }) => {
  return (
    <>
      {bookingData.map((booking) => {
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
              {/* Section for render booking status */}
              <Col md={12} className="d-flex justify-content-start py-2">
                <StatusPayment bookingStatus={booking.status} />
              </Col>
              <Col md={12}>
                {/* Section for render history destination or history list */}
                {booking && (
                  <FlightDestination
                    departureAt={booking.departureAt}
                    departureDate={booking.departureDate}
                    departureCity={booking.departureCity}
                    flightDuration={booking.flightDuration}
                    arrivalCity={booking.arrivalCity}
                    arrivalDate={booking.arrivalDate}
                    arrivalAt={booking.arrivalAt}
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
                  <p>{booking.seatClass}</p>
                </Col>
                <Col md={4} className="">
                  <p style={{ margin: 0, fontWeight: "700" }}>Total Payment:</p>
                  <p>{booking.totalPrice}</p>
                </Col>
              </Row>
            </Row>
          </Button>
        );
      })}
    </>
  );
};

const StatusPayment = ({ bookingStatus }) => {
  // Color block for payment status
  // green for payment confirmed
  // red for canceled
  // grey for unpaid / waiting payment
  return (
    <p
      style={{
        backgroundColor: (() => {
          switch (bookingStatus) {
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
      {bookingStatus}
    </p>
  );
};

// average fetching data here
const HistoryDetail = ({ booking }) => {
  return (
    <Container className="pb-5">
      <DetailFlight
        TitleDetail={"Detail Pesanan"}
        BookingCode={`Booking Code: ${booking.id}`}
        BookingStatus={<StatusPayment bookingStatus={booking.status} />}
        departureAt={booking.departureAt}
        departureDate={booking.arrivalDate}
        departureAirport={booking.departureAirport}
        departureTerminal={booking.departureTerminal}
        arrivalAt={booking.arrivalAt}
        arrivalDate={booking.arrivalDate}
        arrivalAirport={booking.arrivalAirport}
        arrivalTerminal={booking.arrivalTerminal}
        airlineName={booking.airlineName}
        seatClass={booking.seatClass}
        airlineSerialNumber={booking.airlineSerialNumber}
        baggage={booking.baggage}
        cabinBaggage={booking.cabinBaggage}
        additionals={booking.additionals}
      />

      {/* Passanger Information */}
      <div>
        <hr />
        <p style={{ marginBottom: 0, fontWeight: "bold" }}>
          Informasi Penumpang
        </p>
        {booking.passanger.map((passenger, index) => (
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
      <Row className="pt-3 d-flex justify-content-between">
        <Col xs={12} className="d-flex">
          <Button className="flex-fill" type="button" variant="primary">
            Cetak Tiket
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const HistoryDetailMobile = ({ showModal, setShowModal, booking }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <HistoryDetail booking={booking} />
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
  );
};

export default OrderHistory;
