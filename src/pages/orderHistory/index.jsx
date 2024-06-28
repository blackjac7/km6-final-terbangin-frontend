import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";

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
            <Container className="my-3">
                <Row className="mx-sm-4">{/* <h5>Maret 2024</h5> */}</Row>
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
                        case "Issued":
                            return "green";
                        case "Canceled":
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

    return (
        <Container className="pb-5">
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
                departureAirport={booking[0]?.Seat?.Flight?.StartAirport?.name}
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

            {/* Passanger Information */}

            {/* Price Information, confused for implement hard data xD  */}
            <Price
                adult={adult}
                child={child}
                baby={baby}
                flightPrice={booking[0]?.Seat?.Flight[`price${seatType}`]}
                setTotalPrice={setDepartureTotalPrice}
            />
            {booking[0].Booking.roundtripFlightId && (
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
                        BookingCode={`Booking Code: ${booking[1]?.Booking?.bookingCode}`}
                        BookingStatus={
                            <StatusPayment
                                bookingStatus={
                                    booking[0]?.Booking?.Payment?.status
                                }
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
                        departureAirport={
                            booking[0]?.Seat?.Flight?.StartAirport?.name
                        }
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
                        arrivalAirport={
                            booking[0]?.Seat?.Flight?.EndAirport?.name
                        }
                        arrivalTerminal={
                            booking[0]?.Seat?.Flight?.EndAirport?.terminal
                        }
                        airlineName={booking[0]?.Seat?.Flight?.Airline?.name}
                        airlineLogo={booking[0]?.Seat?.Flight?.Airline?.picture}
                        seatClass={seatType}
                        flightCode={booking[0]?.Seat?.Flight?.flightCode}
                        baggage={booking[0]?.Seat?.Flight?.Airline?.baggage}
                        cabinBaggage={
                            booking[0]?.Seat?.Flight?.Airline?.cabinBaggage
                        }
                        additionals={
                            booking[0]?.Seat?.Flight?.Airline?.additionals
                        }
                        booking={booking}
                    />
                    <Price
                        adult={adult}
                        child={child}
                        baby={baby}
                        flightPrice={
                            booking[1]?.Seat?.Flight[`price${seatType}`]
                        }
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
