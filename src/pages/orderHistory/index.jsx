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

import {
  getHistoryCardDetails,
  getHistoryCards,
} from "../../redux/actions/history";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";

const OrderHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const dispatch = useDispatch();
  const { historycards, historycard } = useSelector((state) => state.history);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // this function is for toggle active status history list, for purple border purpose
  const handleDetailClick = (booking) => {
    if (historycard[0]?.bookingId === booking) {
      console.log("masuk a");
      setShowDetail(!showDetail);
    } else {
      // setSelectedBooking(booking);
      setShowDetail(true);
      console.log("masuk b");
      dispatch(getHistoryCardDetails(booking));
    }

    if (isMobile) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    dispatch(getHistoryCards());
  }, []);

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
              selectedBooking={historycard}
              historycards={historycards}
            />
          </Col>
          {/* If mobile breakpoint is false, the detail history will show on right side page */}
          {showDetail && !isMobile && selectedBooking && (
            <Col md={5} className="px-4">
              <HistoryDetail booking={historycard} />
            </Col>
          )}
        </Row>
      </Container>

      {/* If mobile breakpoint is true, the detail history will show by modal */}
      {isMobile && selectedBooking && (
        <HistoryDetailMobile
          setShowModal={setShowModal}
          showModal={showModal}
          booking={historycard}
        />
      )}
    </>
  );
};

const HistoryDestination = ({
  onDetailClick,
  isActive,
  setIsActive,
  historycards,
}) => {
  return (
    <>
      {historycards.map((booking) => {
        return (
          <Button
            key={booking?.bookingId}
            className="mb-3"
            variant="custom"
            onMouseDown={() =>
              setIsActive((active) =>
                active === booking?.bookingId ? null : booking?.bookingId
              )
            }
            onClick={() => onDetailClick(booking?.bookingId)}
            style={{
              border: isActive === booking?.bookingId ? "2px solid purple" : "",
              boxShadow: "1px 0 5px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.50rem",
            }}
          >
            <Row>
              {/* Section for render booking status */}
              <Col md={12} className="d-flex justify-content-start py-2">
                <StatusPayment
                  bookingStatus={booking?.Booking?.Payment?.status}
                />
              </Col>
              <Col md={12}>
                {/* Section for render history destination or history list */}
                {booking && (
                  <FlightDestination
                    departureTime={moment
                      .tz(
                        booking?.Seat?.Flight?.departureAt,
                        booking?.Seat?.Flight?.StartAirport?.timezone
                      )
                      .format("HH:mm")}
                    departureDate={moment
                      .tz(
                        booking?.Seat?.Flight?.departureAt,
                        booking?.Seat?.Flight?.StartAirport?.timezone
                      )
                      .format("DD MMMM yyyy")}
                    departureCity={booking?.Seat?.Flight?.StartAirport?.city}
                    flightDuration={booking?.Seat?.Flight?.duration}
                    arrivalCity={booking?.Seat?.Flight?.EndAirport?.city}
                    arrivalTime={moment
                      .tz(
                        booking?.Seat?.Flight?.arrivalAt,
                        booking?.Seat?.Flight?.StartAirport?.timezone
                      )
                      .clone()
                      .tz(booking?.Seat?.Flight?.EndAirport?.timezone)
                      .format("HH:mm")}
                    arrivalDate={moment
                      .tz(
                        booking?.Seat?.Flight?.arrivalAt,
                        booking?.Seat?.Flight?.StartAirport?.timezone
                      )
                      .clone()
                      .tz(booking?.Seat?.Flight?.EndAirport?.timezone)
                      .format("DD MMMM yyyy")}
                  />
                )}
                <hr className="solid" />
              </Col>
              <Row style={{ textAlign: "left" }}>
                <Col md={4}>
                  <p style={{ margin: 0, fontWeight: "700" }}>Booking Code:</p>
                  <p>{booking?.bookingId}</p>
                </Col>
                <Col md={4}>
                  <p style={{ margin: 0, fontWeight: "700" }}>Class:</p>
                  <p>{booking?.Seat?.airlineClass}</p>
                </Col>
                <Col md={4} className="">
                  <p style={{ margin: 0, fontWeight: "700" }}>Total Payment:</p>
                  <p>Rp {booking?.Booking?.Payment?.totalPrice}</p>
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
        BookingCode={`Booking Code: ${booking[0]?.bookingId}`}
        BookingStatus={
          <StatusPayment bookingStatus={booking[0]?.Booking?.Payment?.status} />
        }
        departureTime={moment
          .tz(
            booking[0]?.Seat?.Flight?.departureAt,
            booking[0]?.Seat?.Flight?.StartAirport?.timezone
          )
          .format("HH:mm")}
        departureDate={moment
          .tz(
            booking[0]?.Seat?.Flight?.departureAt,
            booking[0]?.Seat?.Flight?.StartAirport?.timezone
          )
          .format("DD MMMM yyyy")}
        departureAirport={booking[0]?.Seat?.Flight?.StartAirport?.name}
        departureTerminal={booking[0]?.Seat?.Flight?.StartAirport?.terminal}
        arrivalTime={moment
          .tz(
            booking[0]?.Seat?.Flight?.arrivalAt,
            booking[0]?.Seat?.Flight?.StartAirport?.timezone
          )
          .clone()
          .tz(booking[0]?.Seat?.Flight?.EndAirport?.timezone)
          .format("HH:mm")}
        arrivalDate={moment
          .tz(
            booking[0]?.Seat?.Flight?.arrivalAt,
            booking[0]?.Seat?.Flight?.StartAirport?.timezone
          )
          .clone()
          .tz(booking[0]?.Seat?.Flight?.EndAirport?.timezone)
          .format("DD MMMM yyyy")}
        arrivalAirport={booking[0]?.Seat?.Flight?.EndAirport?.name}
        arrivalTerminal={booking[0]?.Seat?.Flight?.EndAirport?.terminal}
        airlineName={booking[0]?.Seat?.Flight?.Airline?.name}
        seatClass={booking[0]?.Seat?.airlineClass}
        flightCode={booking[0]?.Seat?.Flight?.flightCode}
        baggage={booking[0]?.Seat?.Flight?.Airline?.baggage}
        cabinBaggage={booking[0]?.Seat?.Flight?.Airline?.cabinBaggage}
        additionals={booking[0]?.Seat?.Flight?.Airline?.additionals}
      />

      {/* Passanger Information */}
      {/* <div>
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
      </div> */}
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
