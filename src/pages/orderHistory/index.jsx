import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Modal, Card } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import HeaderShadow from "../../components/HeaderShadow";
import BackButton from "../../components/BackButton";
import DetailFlight from "../../components/FlightDetail";
import FlightDestination from "../../components/FlightDestination";
import Price from "../../components/PriceDetail/Price";

import {
  getHistoryCardDetails,
  getHistoryCards,
} from "../../redux/actions/history";
import { getProfile } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import TotalPrice from "../../components/PriceDetail/TotalPrice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getFlightById } from "../../redux/actions/flight";
import FlightDestinationReturn from "../../components/FlightDestination/return";
const OrderHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [detailHistory, setDetailHistory] = useState([]);

  const dispatch = useDispatch();
  const { historycards, historycard } = useSelector((state) => state.history);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // this function is for toggle active status history list, for purple border purpose
  const handleDetailClick = async (booking) => {
    await dispatch(getHistoryCardDetails(booking));
    if (historycard[0]?.bookingId === booking) {
      console.log("masuk a");

      setShowDetail(!showDetail);
    } else {
      setSelectedBooking(booking);
      setShowDetail(true);
      console.log("masuk b");
      dispatch(getHistoryCardDetails(booking));
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the scroll smooth
    });
    if (isMobile) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    dispatch(getProfile()).then(() => {
      dispatch(getHistoryCards());
    });
  }, [dispatch]);

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

      {/* Main Content */}
      <Container className="my-4">
        <Row>
          <Col md={7}>
            <HistoryDestination
              onDetailClick={handleDetailClick}
              isActive={isActive}
              setIsActive={setIsActive}
              selectedBooking={selectedBooking}
              historycards={historycards}
            />
          </Col>
          {/* If mobile breakpoint is false, the detail history will show on right side page */}
          {showDetail && !isMobile && selectedBooking && (
            <Col md={5}>
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
  const dispatch = useDispatch();
  const [returnFlights, setReturnFlights] = useState({});

  const formattedPrice = (price) => {
    return price?.toLocaleString("id-ID");
  };

  useEffect(() => {
    const loadReturnFlights = async () => {
      const flights = {};
      for (const booking of historycards) {
        if (booking?.Booking?.roundtripFlightId) {
          const dataFlightReturn = await dispatch(
            getFlightById(booking?.Booking?.roundtripFlightId)
          );
          flights[booking?.bookingId] = dataFlightReturn[0];
        }
      }
      setReturnFlights(flights);
      console.log("Return Flights: ", flights);
    };

    loadReturnFlights();
  }, [dispatch, historycards]);
  return (
    <>
      {historycards.map((booking) => {
        const hasRoundtrip = booking?.Booking?.roundtripFlightId !== null;

        return (
          <Card
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
              boxShadow: "1px 0 5px 2px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.50rem",
            }}
          >
            <Card.Body>
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
                  {hasRoundtrip && returnFlights[booking.bookingId] && (
                    <>
                      <hr className="solid" />
                      <FlightDestinationReturn
                        departureTime={moment
                          .tz(
                            returnFlights[booking.bookingId]?.departureAt,
                            returnFlights[booking.bookingId]?.StartAirport
                              ?.timezone
                          )
                          .format("HH:mm")}
                        departureDate={moment
                          .tz(
                            returnFlights[booking.bookingId]?.departureAt,
                            returnFlights[booking.bookingId]?.StartAirport
                              ?.timezone
                          )
                          .format("DD MMMM yyyy")}
                        departureCity={
                          returnFlights[booking.bookingId]?.StartAirport?.city
                        }
                        flightDuration={
                          returnFlights[booking.bookingId]?.duration
                        }
                        arrivalCity={
                          returnFlights[booking.bookingId]?.EndAirport?.city
                        }
                        arrivalTime={moment
                          .tz(
                            returnFlights[booking.bookingId]?.arrivalAt,
                            returnFlights[booking.bookingId]?.StartAirport
                              ?.timezone
                          )
                          .clone()
                          .tz(
                            returnFlights[booking.bookingId]?.EndAirport
                              ?.timezone
                          )
                          .format("HH:mm")}
                        arrivalDate={moment
                          .tz(
                            returnFlights[booking.bookingId]?.arrivalAt,
                            returnFlights[booking.bookingId]?.StartAirport
                              ?.timezone
                          )
                          .clone()
                          .tz(
                            returnFlights[booking.bookingId]?.EndAirport
                              ?.timezone
                          )
                          .format("DD MMMM yyyy")}
                      />
                    </>
                  )}
                  <hr className="solid" />
                </Col>
                <Row style={{ textAlign: "left" }}>
                  <Col md={4}>
                    <p style={{ margin: 0, fontWeight: "700" }}>
                      Booking Code:
                    </p>
                    <p>{booking?.Booking?.bookingCode}</p>
                  </Col>
                  <Col md={4}>
                    <p style={{ margin: 0, fontWeight: "700" }}>Class:</p>
                    {booking?.Seat?.airlineClass === "FIRST_CLASS" ? (
                      <p>FirstClass</p>
                    ) : (
                      booking?.Seat?.airlineClass
                    )}
                  </Col>
                  <Col md={4} className="">
                    <p style={{ margin: 0, fontWeight: "700" }}>
                      Total Payment:
                    </p>
                    <p>
                      Rp {formattedPrice(booking?.Booking?.Payment?.totalPrice)}
                    </p>
                  </Col>
                </Row>
              </Row>
            </Card.Body>
          </Card>
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
            case "ISSUED":
              return "green";
            case "CANCELLED":
              return "grey";
            default:
              return "red";
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
  const navigate = useNavigate();
  const [departureTotalPrice, setDepartureTotalPrice] = useState(0);
  const [returnTotalPrice, setReturnTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [baby, setBaby] = useState(0);
  const [seatType, setSeatType] = useState("");
  const [seatSelectedDeparture, setSeatSelectedDeparture] = useState([]);
  const [seatSelectedReturn, setSeatSelectedReturn] = useState([]);
  const [bookingIdResult, setBookingIdResult] = useState("");
  console.log(booking);

  const handleLanjutBayar = (e) => {
    e.preventDefault();

    const price = totalPrice ? totalPrice : departureTotalPrice;

    navigate("/payment", {
      state: {
        price: price,
        seatSelectedDeparture: seatSelectedDeparture,
        seatSelectedReturn: seatSelectedReturn,
        bookingIdResult: bookingIdResult,
      },
    });
    console.log("To Payment Page: ", {
      price: price,
      seatSelectedDeparture: seatSelectedDeparture,
      seatSelectedReturn: seatSelectedReturn,
      bookingIdResult: bookingIdResult,
    });
    toast.info("Silahkan Bayar.");
  };
  useEffect(() => {
    setBookingIdResult(booking[0]?.Booking?.id);
    const seatMap = {};

    booking.forEach((item) => {
      const flightId = item.Seat?.flightId;
      if (!seatMap[flightId]) {
        seatMap[flightId] = [];
      }

      seatMap[flightId].push({
        seatId: item.Seat?.id,
      });
    });
    // console.log("Seat Map: ", seatMap);
    // console.log(
    //     "Seat Map Departure: ",
    //     seatMap[booking[1]?.Seat?.Flight?.id]
    // );
    setSeatSelectedDeparture(seatMap[booking[1]?.Seat?.Flight?.id]);
    // console.log(
    //     "Seat Map Return: ",
    //     seatMap[booking[0].Booking?.roundtripFlightId]
    // );
    setSeatSelectedReturn(seatMap[booking[0].Booking?.roundtripFlightId]);
  }, [booking]);

  useEffect(() => {
    if (booking[0]?.Seat?.airlineClass === "ECONOMY") {
      setSeatType("Economy");
    } else if (booking[0]?.Seat?.airlineClass === "BUSINESS") {
      setSeatType("Bussines");
    } else if (booking[0]?.Seat?.airlineClass === "FIRST_CLASS") {
      setSeatType("FirstClass");
    }

    const uniqueBookings = [];
    const passangersId = new Set();

    booking.forEach((item) => {
      if (!passangersId.has(item.Passanger?.id)) {
        passangersId.add(item.Passanger?.id);
        uniqueBookings.push(item);
      }
    });

    const adults = uniqueBookings.filter(
      (item) => item.Passanger?.type === "ADULT"
    ).length;
    setAdult(adults);

    const childs = uniqueBookings.filter(
      (item) => item.Passanger?.type === "CHILD"
    ).length;
    setChild(childs);

    const babies = uniqueBookings.filter(
      (item) => item.Passanger?.type === "BABY"
    ).length;
    setBaby(babies);
  }, [booking]);

  const handlePrintTicket = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Ticket Information", 105, 20, null, null, "center");

    // Draw a line below the title
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Booking Code
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Booking Code:", 20, 35);
    doc.setFont("helvetica", "normal");
    doc.text(`${booking[0]?.Booking?.bookingCode}`, 60, 35);

    // Flight details
    doc.setFont("helvetica", "bold");
    doc.text("Flight Details", 20, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`From: ${booking[1]?.Seat?.Flight?.StartAirport?.name}`, 20, 55);
    doc.text(`To: ${booking[1]?.Seat?.Flight?.EndAirport?.name}`, 20, 65);
    doc.text(`Flight: ${booking[1]?.Seat?.Flight?.flightCode}`, 20, 75);

    // Departure and arrival times
    doc.text(
      `Departure Time: ${moment
        .tz(
          booking[1]?.Seat?.Flight?.departureAt,
          booking[1]?.Seat?.Flight?.StartAirport?.timezone
        )
        .format("HH:mm DD MMMM yyyy")}`,
      20,
      85
    );
    doc.text(
      `Arrival Time: ${moment
        .tz(
          booking[1]?.Seat?.Flight?.arrivalAt,
          booking[1]?.Seat?.Flight?.EndAirport?.timezone
        )
        .format("HH:mm DD MMMM yyyy")}`,
      20,
      95
    );

    // Seat class
    doc.setFont("helvetica", "bold");
    doc.text("Seat Class:", 20, 105);
    doc.setFont("helvetica", "normal");
    doc.text(seatType, 60, 105);

    // Passenger info
    doc.setFont("helvetica", "bold");
    doc.text("Passenger Info", 20, 115);
    doc.setFont("helvetica", "normal");
    doc.text(`Adults: ${adult}`, 20, 125);
    doc.text(`Children: ${child}`, 20, 135);
    doc.text(`Babies: ${baby}`, 20, 145);

    // Total price
    doc.setFont("helvetica", "bold");
    doc.text("Total Price:", 20, 155);
    doc.setFont("helvetica", "normal");
    doc.text(`IDR ${totalPrice}`, 60, 155);

    // Draw a box around the details
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, 30, 190, 130);

    // Save the PDF
    doc.save(`ticket_${booking[0]?.Booking?.bookingCode}.pdf`);
  };

  return (
    <Card
      style={{
        boxShadow: "1px 0 5px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.50rem",
      }}
    >
      <Card.Body>
        {!booking[0]?.Booking?.roundtripFlightId ? (
          <>
            <DetailFlight
              TitleDetail={"Jadwal Berangkat"}
              BookingCode={`Booking Code: ${booking[0]?.Booking?.bookingCode}`}
              BookingStatus={
                <StatusPayment
                  bookingStatus={booking[0]?.Booking?.Payment?.status}
                />
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
              departureTerminal={
                booking[0]?.Seat?.Flight?.StartAirport?.terminal
              }
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
              airlineLogo={booking[0]?.Seat?.Flight?.Airline?.picture}
              seatClass={seatType}
              flightCode={booking[0]?.Seat?.Flight?.flightCode}
              baggage={booking[0]?.Seat?.Flight?.Airline?.baggage}
              cabinBaggage={booking[0]?.Seat?.Flight?.Airline?.cabinBaggage}
              additionals={booking[0]?.Seat?.Flight?.Airline?.additionals}
              booking={booking}
            />
            <Price
              adult={adult}
              child={child}
              baby={baby}
              flightPrice={booking[0]?.Seat?.Flight[`price${seatType}`]}
              setTotalPrice={setDepartureTotalPrice}
            />
          </>
        ) : (
          <>
            <DetailFlight
              TitleDetail={"Jadwal Berangkat"}
              BookingCode={`Booking Code: ${booking[1]?.Booking?.bookingCode}`}
              BookingStatus={
                <StatusPayment
                  bookingStatus={booking[1]?.Booking?.Payment?.status}
                />
              }
              departureTime={moment
                .tz(
                  booking[1]?.Seat?.Flight?.departureAt,
                  booking[1]?.Seat?.Flight?.StartAirport?.timezone
                )
                .format("HH:mm")}
              departureDate={moment
                .tz(
                  booking[1]?.Seat?.Flight?.departureAt,
                  booking[1]?.Seat?.Flight?.StartAirport?.timezone
                )
                .format("DD MMMM yyyy")}
              departureAirport={booking[1]?.Seat?.Flight?.StartAirport?.name}
              departureTerminal={
                booking[1]?.Seat?.Flight?.StartAirport?.terminal
              }
              arrivalTime={moment
                .tz(
                  booking[1]?.Seat?.Flight?.arrivalAt,
                  booking[1]?.Seat?.Flight?.StartAirport?.timezone
                )
                .clone()
                .tz(booking[1]?.Seat?.Flight?.EndAirport?.timezone)
                .format("HH:mm")}
              arrivalDate={moment
                .tz(
                  booking[1]?.Seat?.Flight?.arrivalAt,
                  booking[1]?.Seat?.Flight?.StartAirport?.timezone
                )
                .clone()
                .tz(booking[1]?.Seat?.Flight?.EndAirport?.timezone)
                .format("DD MMMM yyyy")}
              arrivalAirport={booking[1]?.Seat?.Flight?.EndAirport?.name}
              arrivalTerminal={booking[1]?.Seat?.Flight?.EndAirport?.terminal}
              airlineName={booking[1]?.Seat?.Flight?.Airline?.name}
              airlineLogo={booking[1]?.Seat?.Flight?.Airline?.picture}
              seatClass={seatType}
              flightCode={booking[1]?.Seat?.Flight?.flightCode}
              baggage={booking[1]?.Seat?.Flight?.Airline?.baggage}
              cabinBaggage={booking[1]?.Seat?.Flight?.Airline?.cabinBaggage}
              additionals={booking[1]?.Seat?.Flight?.Airline?.additionals}
              booking={booking}
            />
            <Price
              adult={adult}
              child={child}
              baby={baby}
              flightPrice={booking[1]?.Seat?.Flight[`price${seatType}`]}
              setTotalPrice={setDepartureTotalPrice}
            />

            <br />
            <hr
              style={{
                color: "black",
                borderWidth: "5px",
                borderStyle: "dashed",
              }}
            />
            <DetailFlight
              TitleDetail={"Jadwal Pulang"}
              BookingCode={`Booking Code: ${booking[0]?.Booking?.bookingCode}`}
              BookingStatus={
                <StatusPayment
                  bookingStatus={booking[0]?.Booking?.Payment?.status}
                />
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
              departureTerminal={
                booking[0]?.Seat?.Flight?.StartAirport?.terminal
              }
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
              airlineLogo={booking[0]?.Seat?.Flight?.Airline?.picture}
              seatClass={seatType}
              flightCode={booking[0]?.Seat?.Flight?.flightCode}
              baggage={booking[0]?.Seat?.Flight?.Airline?.baggage}
              cabinBaggage={booking[0]?.Seat?.Flight?.Airline?.cabinBaggage}
              additionals={booking[0]?.Seat?.Flight?.Airline?.additionals}
              booking={booking}
            />
            <Price
              adult={adult}
              child={child}
              baby={baby}
              flightPrice={booking[1]?.Seat?.Flight[`price${seatType}`]}
              setTotalPrice={setReturnTotalPrice}
            />

            <TotalPrice
              departureTotalPrice={departureTotalPrice}
              returnTotalPrice={returnTotalPrice}
              setTotalPrice={setTotalPrice}
            />
          </>
        )}

        {(booking[0]?.Booking?.Payment?.status === "UNPAID" && (
          <Row className="pt-3 d-flex justify-content-between">
            <Col xs={12} className="d-flex">
              <Button
                onClick={handleLanjutBayar}
                className="flex-fill"
                type="button"
                variant="danger"
                style={{
                  borderRadius: 14,
                  fontWeight: 700,
                  height: 50,
                }}
              >
                Lanjut Bayar
              </Button>
            </Col>
          </Row>
        )) ||
          (booking[0]?.Booking?.Payment?.status === "ISSUED" && (
            <Row className="pt-3 d-flex justify-content-between">
              <Col xs={12} className="d-flex">
                <Button
                  onClick={handlePrintTicket}
                  className="flex-fill"
                  type="button"
                  variant="primary"
                  style={{
                    borderRadius: 14,
                    fontWeight: 700,
                    height: 50,
                  }}
                >
                  Cetak Tiket
                </Button>
              </Col>
            </Row>
          ))}
        {/* Refund Feature */}
        {/* )) ||
                (booking[0]?.Booking?.Payment?.status === "CANCELED" && (
                    <Row className="pt-3 d-flex justify-content-between">
                        <Col xs={12} className="d-flex">
                            <Button
                                className="flex-fill"
                                type="button"
                                variant="primary"
                            >
                                Refund
                            </Button>
                        </Col>
                    </Row>
                ))} */}
      </Card.Body>
    </Card>
  );
};

const HistoryDetailMobile = ({ showModal, setShowModal, booking }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton className="my-1"></Modal.Header>

      <HistoryDetail booking={booking} />

      {/* <Container>
                <Row className="pb-3 d-flex justify-content-between">
                    <Col xs={6} className="d-flex">
                        <Button className="flex-fill" variant="primary">
                            Cetak Tiket
                        </Button>
                    </Col>
                    <Col xs={12} className="d-flex">
                        <Button
                            className="flex-fill"
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </Button>
                    </Col>
                </Row>
            </Container> */}
    </Modal>
  );
};

export default OrderHistory;
