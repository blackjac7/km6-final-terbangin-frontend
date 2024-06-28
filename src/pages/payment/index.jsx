import { Breadcrumbs, Link } from "@mui/material";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// hard data
import PaymentData from "../../dumpData/payment.json";

import BookingCode from "../../components/BookingWithCode";
import HeaderShadow from "../../components/HeaderShadow";
import DetailFlight from "../../components/FlightDetail";
import PassangerDetail from "../../components/PassangerDetail";
// import PriceDetail from "../../components/PriceDetail";

import { useState, useEffect } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBookingById } from "../../redux/actions/booking";

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

    // integration with midtrans snap
    useEffect(() => {
        const midtransScriptUrl = import.meta.env
            .VITE_MIDTRANS_SANDBOX_SNAP_URL;
        const scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;

        const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
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
                {/* <Row className="my-4 g-2">
                    <Col md={12} className="d-flex">
                        <Button
                            variant="danger"
                            className="flex-fill"
                            size="lg"
                        >
                            Selesaikan Pembayaran sampai 10 Maret 2023 12:00
                        </Button>
                    </Col>
                </Row> */}
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
                        <PaymentEmbedMidtrans />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

// average fetching data here
const BookingDetail = () => {
    const [showPayment, setShowPayment] = useState(false);
    const dispatch = useDispatch();
    const [snapToken, setSnapToken] = useState("");
    const location = useLocation();
    const {
        bookingIdResult,
    } = location.state || {};

    useEffect(() => {
        const fetchBooking = async () => {
            const booking = await dispatch(getBookingById(bookingIdResult));
            console.log(booking[0].Payment.snapToken);
            setSnapToken(booking[0].Payment.snapToken);
        };
        fetchBooking();
    }, [bookingIdResult, dispatch]);

    return (
        <Container className="pb-5">
            {/* Flight Information */}
            <DetailFlight
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
            {/* Passanger Information */}
            <div>
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
            {/* <PriceDetail /> */}
            <Button
                id={"showPaymentBtn"}
                className={"w-100 mt-4"}
                disabled={showPayment}
                onClick={(e) => {
                    e.preventDefault();

                    setShowPayment(true);

                    window.snap.embed(snapToken, {
                        embedId: "snapContainer",
                        onSuccess: (result) => {
                            console.log("success");
                            console.log("masuk sini");
                            console.log(result);
                            // navigate("/payment-success");
                            window.location.href = "/payment-success";
                        },
                        onPending: (result) => {
                            console.log("pending");
                            console.log(result);
                        },
                        onError: (result) => {
                            console.log("error");
                            console.log(result);
                        },
                        onClose: () => {
                            console.log("closed");
                        },
                    });
                    setShowPayment(false);
                }}
            >
                Show Payment
            </Button>
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
        <>
            <h4>Isi Data Pembayaran </h4>
            <div id={"snapContainer"} className={"mt-4"}></div>
        </>
    );
};

export default Payment;
