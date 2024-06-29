import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./order.css";

import HeaderShadow from "../../components/HeaderShadow";
import BackButton from "../../components/BackButton";
import DetailFlight from "../../components/FlightDetail";
import FlightDestination from "../../components/FlightDestination";
import Price from "../../components/PriceDetail/Price";

import {
    getHistoryCardDetails,
    getHistoryCards,
} from "../../redux/actions/history";
import { useDispatch, useSelector } from "react-redux";
import TotalPrice from "../../components/PriceDetail/TotalPrice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getFlightById } from "../../redux/actions/flight";
import FlightDestinationReturn from "../../components/FlightDestination/return";
import moment from "moment-timezone";

const OrderHistory = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [detailHistory, setDetailHistory] = useState([]);
    

    const dispatch = useDispatch();
    const { historycards, historycard } = useSelector((state) => state.history);

    const { user } = useSelector((state) => state.auth);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    const groupByMonth = (data) => {
      return data.reduce((acc, item) => {
        const month = moment(item.Seat?.Flight?.departureAt).format(
          "MMMM YYYY"
        );
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(item);
        return acc;
      }, {});
    };

    const groupedHistorycards = groupByMonth(historycards);
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
            await dispatch(getHistoryCardDetails(booking));
        }

        if (isMobile) {
            setShowModal(true);
        }
    };

    useEffect(() => {
        if (!user) return;
        dispatch(getHistoryCards());
    }, [dispatch, user]);

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

        {/* <Container className="my-3">
            <Row className="mx-sm-4">
              <h5>Maret 2024</h5>
            </Row>
          </Container> */}

        {/* Main Content */}
        {/* <Container>
            <Row className="mx-sm-4">
              <Col md={7}>
                <HistoryDestination
                  onDetailClick={handleDetailClick}
                  isActive={isActive}
                  setIsActive={setIsActive}
                  selectedBooking={selectedBooking}
                  historycards={historycards}
                />
              </Col> */}
        {/* If mobile breakpoint is false, the detail history will show on right side page */}
        {/* {showDetail && !isMobile && selectedBooking && (
                <Col md={5} className="px-4">
                  <HistoryDetail booking={historycard} />
                </Col>
              )}
            </Row>
          </Container> */}
        {Object.keys(groupedHistorycards).map((month) => (
          <Container>
            <Container className="my-3">
              <Row className="mx-sm-4">
                <h5>{month}</h5>
              </Row>
            </Container>
            <Container>
              <Row className="mx-sm-4">
                <Col md={7}>
                  <HistoryDestination
                    onDetailClick={handleDetailClick}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    selectedBooking={selectedBooking}
                    historycards={groupedHistorycards[month]} // Kirim data yang dikelompokkan berdasarkan bulan
                  />
                </Col>
                {showDetail && !isMobile && selectedBooking && (
                  <Col md={5} className="px-4">
                    <HistoryDetail booking={historycard} />
                  </Col>
                )}
              </Row>
            </Container>
          </Container>
        ))}

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
        };

        loadReturnFlights();
    }, [dispatch, historycards]);
    return (
        <>
            {historycards.map((booking) => {
                const hasRoundtrip =
                    booking?.Booking?.roundtripFlightId !== null;

                return (
                    <Button
                        key={booking?.bookingId}
                        className="mb-3"
                        variant="custom"
                        onMouseDown={() =>
                            setIsActive((active) =>
                                active === booking?.bookingId
                                    ? null
                                    : booking?.bookingId
                            )
                        }
                        onClick={() => onDetailClick(booking?.bookingId)}
                        style={{
                            border:
                                isActive === booking?.bookingId
                                    ? "2px solid purple"
                                    : "",
                            boxShadow: "1px 0 5px 1px rgba(0, 0, 0, 0.1)",
                            borderRadius: "0.50rem",
                        }}
                    >
                        <Row>
                            {/* Section for render booking status */}
                            <Col
                                md={12}
                                className="d-flex justify-content-start py-2"
                            >
                                <StatusPayment
                                    bookingStatus={
                                        booking?.Booking?.Payment?.status
                                    }
                                />
                            </Col>
                            <Col md={12}>
                                {/* Section for render history destination or history list */}
                                {booking && (
                                    <FlightDestination
                                        departureTime={moment
                                            .tz(
                                                booking?.Seat?.Flight
                                                    ?.departureAt,
                                                booking?.Seat?.Flight
                                                    ?.StartAirport?.timezone
                                            )
                                            .format("HH:mm")}
                                        departureDate={moment
                                            .tz(
                                                booking?.Seat?.Flight
                                                    ?.departureAt,
                                                booking?.Seat?.Flight
                                                    ?.StartAirport?.timezone
                                            )
                                            .format("DD MMMM yyyy")}
                                        departureCity={
                                            booking?.Seat?.Flight?.StartAirport
                                                ?.city
                                        }
                                        flightDuration={
                                            booking?.Seat?.Flight?.duration
                                        }
                                        arrivalCity={
                                            booking?.Seat?.Flight?.EndAirport
                                                ?.city
                                        }
                                        arrivalTime={moment
                                            .tz(
                                                booking?.Seat?.Flight
                                                    ?.arrivalAt,
                                                booking?.Seat?.Flight
                                                    ?.StartAirport?.timezone
                                            )
                                            .clone()
                                            .tz(
                                                booking?.Seat?.Flight
                                                    ?.EndAirport?.timezone
                                            )
                                            .format("HH:mm")}
                                        arrivalDate={moment
                                            .tz(
                                                booking?.Seat?.Flight
                                                    ?.arrivalAt,
                                                booking?.Seat?.Flight
                                                    ?.StartAirport?.timezone
                                            )
                                            .clone()
                                            .tz(
                                                booking?.Seat?.Flight
                                                    ?.EndAirport?.timezone
                                            )
                                            .format("DD MMMM yyyy")}
                                    />
                                )}
                                {hasRoundtrip &&
                                    returnFlights[booking.bookingId] && (
                                        <>
                                            <hr className="solid" />
                                            <FlightDestinationReturn
                                                departureTime={moment
                                                    .tz(
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.departureAt,
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.StartAirport
                                                            ?.timezone
                                                    )
                                                    .format("HH:mm")}
                                                departureDate={moment
                                                    .tz(
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.departureAt,
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.StartAirport
                                                            ?.timezone
                                                    )
                                                    .format("DD MMMM yyyy")}
                                                departureCity={
                                                    returnFlights[
                                                        booking.bookingId
                                                    ]?.StartAirport?.city
                                                }
                                                flightDuration={
                                                    returnFlights[
                                                        booking.bookingId
                                                    ]?.duration
                                                }
                                                arrivalCity={
                                                    returnFlights[
                                                        booking.bookingId
                                                    ]?.EndAirport?.city
                                                }
                                                arrivalTime={moment
                                                    .tz(
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.arrivalAt,
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.StartAirport
                                                            ?.timezone
                                                    )
                                                    .clone()
                                                    .tz(
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.EndAirport?.timezone
                                                    )
                                                    .format("HH:mm")}
                                                arrivalDate={moment
                                                    .tz(
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.arrivalAt,
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.StartAirport
                                                            ?.timezone
                                                    )
                                                    .clone()
                                                    .tz(
                                                        returnFlights[
                                                            booking.bookingId
                                                        ]?.EndAirport?.timezone
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
                                    <p style={{ margin: 0, fontWeight: "700" }}>
                                        Class:
                                    </p>
                                    {booking?.Seat?.airlineClass ===
                                    "FIRST_CLASS" ? (
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
                                        Rp{" "}
                                        {formattedPrice(
                                            booking?.Booking?.Payment
                                                ?.totalPrice
                                        )}
                                    </p>
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
    const dispatch = useDispatch();
    const { historycard } = useSelector((state) => state.history);

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
    const [flightReturn, setFlightReturn] = useState(null);
    const [flightDeparture, setFlightDeparture] = useState(null);

    const handleLanjutBayar = (e) => {
        e.preventDefault();

        const price = totalPrice ? totalPrice : departureTotalPrice;

        navigate("/payment", {
            state: {
                seatSelectedDeparture: seatSelectedDeparture,
                seatSelectedReturn: seatSelectedReturn,
                bookingIdResult: bookingIdResult,
                adultCount: adult,
                childCount: child,
                babyCount: baby,
            },
        });
        console.log("To Payment Page: ", {
            seatSelectedDeparture: seatSelectedDeparture,
            seatSelectedReturn: seatSelectedReturn,
            bookingIdResult: bookingIdResult,
            adultCount: adult,
            childCount: child,
            babyCount: baby,
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

        if (!booking[0]?.Booking?.roundtripFlightId) {
            setSeatSelectedDeparture(seatMap[booking[0]?.Seat?.Flight?.id]);
            // console.log(
            //     "Seat Map Departure: ",
            //     seatMap[booking[0]?.Seat?.Flight?.id]
            // );
        } else {
            setSeatSelectedDeparture(seatMap[booking[1]?.Seat?.Flight?.id]);
            // console.log(
            //     "Seat Map Departure: ",
            //     seatMap[booking[1]?.Seat?.Flight?.id]
            // );

            setSeatSelectedReturn(
                seatMap[booking[0].Booking?.roundtripFlightId]
            );
            // console.log(
            //     "Seat Map Return: ",
            //     seatMap[booking[0].Booking?.roundtripFlightId]
            // );
        }
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

        const fetchFlight = async () => {
            if (booking[0]?.Booking?.roundtripFlightId) {
                const flightDepartureData = await dispatch(
                    getFlightById(booking[0]?.Seat?.flightId)
                );
                setFlightDeparture(flightDepartureData[0]);

                const flightReturnData = await dispatch(
                    getFlightById(booking[0]?.Booking?.roundtripFlightId)
                );
                setFlightReturn(flightReturnData[0]);
            } else {
                const flightDepartureData = await dispatch(
                    getFlightById(booking[0]?.Seat?.flightId)
                );
                setFlightDeparture(flightDepartureData[0]);
            }
        };

        fetchFlight();
    }, [booking, dispatch]);

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
        doc.text(
            `From: ${booking[1]?.Seat?.Flight?.StartAirport?.name}`,
            20,
            55
        );
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
        <Container className="pb-5">
            <div
                className="scroll-container"
                style={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                    padding: "20px",
                    border: "2px solid #7126b5",
                    borderRadius: "10px",
                }}
            >
                {flightDeparture && (
                    <>
                        <DetailFlight
                            TitleDetail={"Jadwal Berangkat"}
                            BookingCode={`${booking[0]?.Booking?.bookingCode}`}
                            BookingStatus={
                                <StatusPayment
                                    bookingStatus={
                                        booking[0]?.Booking?.Payment?.status
                                    }
                                />
                            }
                            departureTime={moment
                                .tz(
                                    flightDeparture?.departureAt,
                                    flightDeparture?.StartAirport?.timezone
                                )
                                .format("HH:mm")}
                            departureDate={moment
                                .tz(
                                    flightDeparture?.departureAt,
                                    flightDeparture?.StartAirport?.timezone
                                )
                                .format("DD MMMM yyyy")}
                            departureAirport={
                                flightDeparture?.StartAirport?.name
                            }
                            departureTerminal={
                                flightDeparture?.StartAirport?.terminal
                            }
                            arrivalTime={moment
                                .tz(
                                    flightDeparture?.arrivalAt,
                                    flightDeparture?.EndAirport?.timezone
                                )
                                .clone()
                                .tz(flightDeparture?.EndAirport?.timezone)
                                .format("HH:mm")}
                            arrivalDate={moment
                                .tz(
                                    flightDeparture?.arrivalAt,
                                    flightDeparture?.EndAirport?.timezone
                                )
                                .clone()
                                .tz(flightDeparture?.EndAirport?.timezone)
                                .format("DD MMMM yyyy")}
                            arrivalAirport={flightDeparture?.EndAirport?.name}
                            arrivalTerminal={
                                flightDeparture?.EndAirport?.terminal
                            }
                            airlineName={flightDeparture?.Airline?.name}
                            airlineLogo={flightDeparture?.Airline?.picture}
                            seatClass={seatType}
                            flightCode={flightDeparture?.flightCode}
                            baggage={flightDeparture?.Airline?.baggage}
                            cabinBaggage={
                                flightDeparture?.Airline?.cabinBaggage
                            }
                            additionals={flightDeparture?.Airline?.additionals}
                            booking={booking}
                        />
                        <Price
                            adult={adult}
                            child={child}
                            baby={baby}
                            flightPrice={flightDeparture[`price${seatType}`]}
                            setTotalPrice={setDepartureTotalPrice}
                        />
                    </>
                )}
                {flightReturn && booking[0].Booking.roundtripFlightId && (
                    <>
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
                            BookingCode={`${booking[0]?.Booking?.bookingCode}`}
                            BookingStatus={
                                <StatusPayment
                                    bookingStatus={
                                        booking[0]?.Booking?.Payment?.status
                                    }
                                />
                            }
                            departureTime={moment
                                .tz(
                                    flightReturn?.departureAt,
                                    flightReturn?.StartAirport?.timezone
                                )
                                .format("HH:mm")}
                            departureDate={moment
                                .tz(
                                    flightReturn?.departureAt,
                                    flightReturn?.StartAirport?.timezone
                                )
                                .format("DD MMMM yyyy")}
                            departureAirport={flightReturn?.StartAirport?.name}
                            departureTerminal={
                                flightReturn?.StartAirport?.terminal
                            }
                            arrivalTime={moment
                                .tz(
                                    flightReturn?.arrivalAt,
                                    flightReturn?.StartAirport?.timezone
                                )
                                .clone()
                                .tz(flightReturn?.EndAirport?.timezone)
                                .format("HH:mm")}
                            arrivalDate={moment
                                .tz(
                                    flightReturn?.arrivalAt,
                                    flightReturn?.StartAirport?.timezone
                                )
                                .clone()
                                .tz(flightReturn?.EndAirport?.timezone)
                                .format("DD MMMM yyyy")}
                            arrivalAirport={flightReturn?.EndAirport?.name}
                            arrivalTerminal={flightReturn?.EndAirport?.terminal}
                            airlineName={flightReturn?.Airline?.name}
                            airlineLogo={flightReturn?.Airline?.picture}
                            seatClass={seatType}
                            flightCode={flightReturn?.flightCode}
                            baggage={flightReturn?.Airline?.baggage}
                            cabinBaggage={flightReturn?.Airline?.cabinBaggage}
                            additionals={flightReturn?.Airline?.additionals}
                            booking={booking}
                        />
                        <Price
                            adult={adult}
                            child={child}
                            baby={baby}
                            flightPrice={flightReturn[`price${seatType}`]}
                            setTotalPrice={setReturnTotalPrice}
                        />

                        <TotalPrice
                            departureTotalPrice={departureTotalPrice}
                            returnTotalPrice={returnTotalPrice}
                            setTotalPrice={setTotalPrice}
                        />
                    </>
                )}
            </div>

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
            <hr />
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
