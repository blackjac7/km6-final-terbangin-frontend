import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Button,
    Container,
    Modal,
    Dropdown,
    Card,
} from "react-bootstrap";
import "./order.css";
import Swal from "sweetalert2";
import { FaFilter } from "react-icons/fa";
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
import { printTicket } from "../../redux/actions/booking";

const OrderHistory = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [detailHistory, setDetailHistory] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");

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

    const handleFilterChange = (status) => {
        setFilterStatus(status);
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

        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: "smooth", // This makes the scroll smooth
        });
        if (isMobile) {
            setShowModal(true);
        }
    };

    useEffect(() => {
        if (!user) return;
        if (filterStatus == "") {
            dispatch(getHistoryCards());
        } else {
            dispatch(getHistoryCards(filterStatus));
            setShowDetail(false);
        }
    }, [dispatch, user, filterStatus]);

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
                <Row className="mt-4">
                    <Col xs={12} md={10} className="d-flex mt-1 ">
                        <BackButton ButtonText={"Beranda"} />
                    </Col>
                    <Col xs={12} md={2} className="d-flex mt-1">
                        <Dropdown className="flex-fill d-flex">
                            <Dropdown.Toggle
                                variant="outline-secondary"
                                className="px-4 "
                                style={{
                                    borderRadius: "40px",
                                    width: "100%",
                                }}
                            >
                                <FaFilter className="me-2" />
                                Filter
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => handleFilterChange("")}
                                >
                                    Semua
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleFilterChange("ISSUED")}
                                >
                                    ISSUED
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleFilterChange("UNPAID")}
                                >
                                    UNPAID
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() =>
                                        handleFilterChange("CANCELLED")
                                    }
                                >
                                    CANCELLED
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </HeaderShadow>
            {/* Month for make section history per-month */}

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

            <Container>
                <Row>
                    <Col md={7}>
                        {Object.keys(groupedHistorycards).map((month) => (
                            <>
                                <Container className="my-3">
                                    <Row>
                                        <h5>{month}</h5>
                                    </Row>
                                </Container>
                                <Col>
                                    <HistoryDestination
                                        onDetailClick={handleDetailClick}
                                        isActive={isActive}
                                        setIsActive={setIsActive}
                                        selectedBooking={selectedBooking}
                                        historycards={
                                            groupedHistorycards[month]
                                        } // Kirim data yang dikelompokkan berdasarkan bulan
                                    />
                                </Col>
                            </>
                        ))}
                    </Col>
                    {showDetail && !isMobile && selectedBooking && (
                        <Col md={5} className=" mt-5">
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
        };

        loadReturnFlights();
    }, [dispatch, historycards]);
    return (
        <>
            {historycards.map((booking) => {
                const hasRoundtrip =
                    booking?.Booking?.roundtripFlightId !== null;

                return (
                    <Card
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
                            boxShadow: "1px 0 5px 2px rgba(0, 0, 0, 0.1)",
                            borderRadius: "0.50rem",
                        }}
                    >
                        <Card.Body>
                            <Row>
                                {/* Section for render booking status */}
                                <Col
                                    md={12}
                                    className="d-flex justify-content-start"
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
                                                booking?.Seat?.Flight
                                                    ?.StartAirport?.city
                                            }
                                            flightDuration={
                                                booking?.Seat?.Flight?.duration
                                            }
                                            arrivalCity={
                                                booking?.Seat?.Flight
                                                    ?.EndAirport?.city
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
                                                                booking
                                                                    .bookingId
                                                            ]?.departureAt,
                                                            returnFlights[
                                                                booking
                                                                    .bookingId
                                                            ]?.StartAirport
                                                                ?.timezone
                                                        )
                                                        .format("HH:mm")}
                                                    departureDate={moment
                                                        .tz(
                                                            returnFlights[
                                                                booking
                                                                    .bookingId
                                                            ]?.departureAt,
                                                            returnFlights[
                                                                booking
                                                                    .bookingId
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
                                                                booking
                                                                    .bookingId
                                                            ]?.arrivalAt,
                                                            returnFlights[
                                                                booking
                                                                    .bookingId
                                                            ]?.StartAirport
                                                                ?.timezone
                                                        )
                                                        .clone()
                                                        .tz(
                                                            returnFlights[
                                                                booking
                                                                    .bookingId
                                                            ]?.EndAirport
                                                                ?.timezone
                                                        )
                                                        .format("HH:mm")}
                                                    arrivalDate={moment
                                                        .tz(
                                                            returnFlights[
                                                                booking
                                                                    .bookingId
                                                            ]?.arrivalAt,
                                                            returnFlights[
                                                                booking
                                                                    .bookingId
                                                            ]?.StartAirport
                                                                ?.timezone
                                                        )
                                                        .clone()
                                                        .tz(
                                                            returnFlights[
                                                                booking
                                                                    .bookingId
                                                            ]?.EndAirport
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
                                        <p
                                            style={{
                                                margin: 0,
                                                fontWeight: "700",
                                            }}
                                        >
                                            Booking Code:
                                        </p>
                                        <p>{booking?.Booking?.bookingCode}</p>
                                    </Col>
                                    <Col md={4}>
                                        <p
                                            style={{
                                                margin: 0,
                                                fontWeight: "700",
                                            }}
                                        >
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
                                        <p
                                            style={{
                                                margin: 0,
                                                fontWeight: "700",
                                            }}
                                        >
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
    const dispatch = useDispatch();

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
    const [loading, setloading] = useState(false);

    const handleLanjutBayar = (e) => {
        e.preventDefault();

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

    const handlePrintTicket = async () => {
        try {
            setloading(true);
            await dispatch(printTicket(booking[0]?.Booking?.id));
            Swal.fire({
                icon: "success",
                title: "Tiket berhasil dikirim ke email Anda",
            });
            setloading(false);
        } catch (error) {
            console.error("Failed to print ticket:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal mengirim tiket. Silakan coba lagi!",
            });
        }
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
                                    bookingStatus={
                                        booking[0]?.Booking?.Payment?.status
                                    }
                                />
                            }
                            departureTime={moment
                                .tz(
                                    booking[0]?.Seat?.Flight?.departureAt,
                                    booking[0]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .format("HH:mm")}
                            departureDate={moment
                                .tz(
                                    booking[0]?.Seat?.Flight?.departureAt,
                                    booking[0]?.Seat?.Flight?.StartAirport
                                        ?.timezone
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
                                    booking[0]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .clone()
                                .tz(
                                    booking[0]?.Seat?.Flight?.EndAirport
                                        ?.timezone
                                )
                                .format("HH:mm")}
                            arrivalDate={moment
                                .tz(
                                    booking[0]?.Seat?.Flight?.arrivalAt,
                                    booking[0]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .clone()
                                .tz(
                                    booking[0]?.Seat?.Flight?.EndAirport
                                        ?.timezone
                                )
                                .format("DD MMMM yyyy")}
                            arrivalAirport={
                                booking[0]?.Seat?.Flight?.EndAirport?.name
                            }
                            arrivalTerminal={
                                booking[0]?.Seat?.Flight?.EndAirport?.terminal
                            }
                            airlineName={
                                booking[0]?.Seat?.Flight?.Airline?.name
                            }
                            airlineLogo={
                                booking[0]?.Seat?.Flight?.Airline?.picture
                            }
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
                                booking[0]?.Seat?.Flight[`price${seatType}`]
                            }
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
                                    bookingStatus={
                                        booking[1]?.Booking?.Payment?.status
                                    }
                                />
                            }
                            departureTime={moment
                                .tz(
                                    booking[1]?.Seat?.Flight?.departureAt,
                                    booking[1]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .format("HH:mm")}
                            departureDate={moment
                                .tz(
                                    booking[1]?.Seat?.Flight?.departureAt,
                                    booking[1]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .format("DD MMMM yyyy")}
                            departureAirport={
                                booking[1]?.Seat?.Flight?.StartAirport?.name
                            }
                            departureTerminal={
                                booking[1]?.Seat?.Flight?.StartAirport?.terminal
                            }
                            arrivalTime={moment
                                .tz(
                                    booking[1]?.Seat?.Flight?.arrivalAt,
                                    booking[1]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .clone()
                                .tz(
                                    booking[1]?.Seat?.Flight?.EndAirport
                                        ?.timezone
                                )
                                .format("HH:mm")}
                            arrivalDate={moment
                                .tz(
                                    booking[1]?.Seat?.Flight?.arrivalAt,
                                    booking[1]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .clone()
                                .tz(
                                    booking[1]?.Seat?.Flight?.EndAirport
                                        ?.timezone
                                )
                                .format("DD MMMM yyyy")}
                            arrivalAirport={
                                booking[1]?.Seat?.Flight?.EndAirport?.name
                            }
                            arrivalTerminal={
                                booking[1]?.Seat?.Flight?.EndAirport?.terminal
                            }
                            airlineName={
                                booking[1]?.Seat?.Flight?.Airline?.name
                            }
                            airlineLogo={
                                booking[1]?.Seat?.Flight?.Airline?.picture
                            }
                            seatClass={seatType}
                            flightCode={booking[1]?.Seat?.Flight?.flightCode}
                            baggage={booking[1]?.Seat?.Flight?.Airline?.baggage}
                            cabinBaggage={
                                booking[1]?.Seat?.Flight?.Airline?.cabinBaggage
                            }
                            additionals={
                                booking[1]?.Seat?.Flight?.Airline?.additionals
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
                                    bookingStatus={
                                        booking[0]?.Booking?.Payment?.status
                                    }
                                />
                            }
                            departureTime={moment
                                .tz(
                                    booking[0]?.Seat?.Flight?.departureAt,
                                    booking[0]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .format("HH:mm")}
                            departureDate={moment
                                .tz(
                                    booking[0]?.Seat?.Flight?.departureAt,
                                    booking[0]?.Seat?.Flight?.StartAirport
                                        ?.timezone
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
                                    booking[0]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .clone()
                                .tz(
                                    booking[0]?.Seat?.Flight?.EndAirport
                                        ?.timezone
                                )
                                .format("HH:mm")}
                            arrivalDate={moment
                                .tz(
                                    booking[0]?.Seat?.Flight?.arrivalAt,
                                    booking[0]?.Seat?.Flight?.StartAirport
                                        ?.timezone
                                )
                                .clone()
                                .tz(
                                    booking[0]?.Seat?.Flight?.EndAirport
                                        ?.timezone
                                )
                                .format("DD MMMM yyyy")}
                            arrivalAirport={
                                booking[0]?.Seat?.Flight?.EndAirport?.name
                            }
                            arrivalTerminal={
                                booking[0]?.Seat?.Flight?.EndAirport?.terminal
                            }
                            airlineName={
                                booking[0]?.Seat?.Flight?.Airline?.name
                            }
                            airlineLogo={
                                booking[0]?.Seat?.Flight?.Airline?.picture
                            }
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
                                    onClick={handlePrintTicket}
                                    className="flex-fill"
                                    type="button"
                                    variant="primary"
                                    style={{
                                        borderRadius: 14,
                                        fontWeight: 700,
                                        height: 50,
                                    }}
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Tiket sedang dicetak.."
                                        : "Cetak Tiket"}
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
