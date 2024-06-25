import Switch from "@mui/material/Switch";
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Container,
  Modal,
  Image,
=======
import { toast } from "react-toastify";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { filterFlight } from "../../redux/actions/home";
import PropTypes from "prop-types";
import StartAirportSearchComponent from "../AutoComplete/startAirports";
import EndAirportSearchComponent from "../AutoComplete/endAirports";
import {
    Row,
    Col,
    Button,
    Form,
    Container,
    Modal,
    Image,
>>>>>>> db97bc951a04d5acd4a851774580a614cd038524
} from "react-bootstrap";
import plane from "../../assets/SearchBar/material-symbols_flight-takeoff-sharp.png";
import swapButton from "../../assets/SearchBar/return.png";
import calendar from "../../assets/SearchBar/Vector.png";
import seat from "../../assets/SearchBar/material-symbols_airline-seat-recline-normal.png";
import dewasa from "../../assets/Passengers Modal/Dewasa.png";
import anak from "../../assets/Passengers Modal/Anak.png";
import bayi from "../../assets/Passengers Modal/Bayi.png";
<<<<<<< HEAD

import { Link } from "react-router-dom";
import chooseImage from "../../assets/Class Modal/check.png";
=======
import chooseImage from "../../assets/Class Modal/check.png";

>>>>>>> db97bc951a04d5acd4a851774580a614cd038524
import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
<<<<<<< HEAD
import dayjs from "dayjs";

const FormArea = ({ title, isFullScreen, isMobile }) => {
  const [showInput2, setShowInput2] = useState(false);
  const [smShowCapacity, setSmShowCapacity] = useState(false);
  const [smShowSeatClass, setSmShowSeatClass] = useState(false);
  const [lgShowDeparture, setLgShowDeparture] = useState(false);
  const [lgShowArrival, setLgShowArrival] = useState(false);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [time, setTime] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [capacity, setCapacity] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const swap = () => {
    const pemp = departure;
    setDeparture(arrival);
    setArrival(pemp);
  };

  const handleReturn = () => {
    setReturnDate("");
    setShowInput2(!showInput2);
    setDate2("");
  };

  const getClassStyle = (buttonId) => {
    return {
      backgroundColor: activeButton === buttonId ? "#7126b5" : "initial",
      color: activeButton === buttonId ? "white" : "initial",
      borderColor: activeButton === buttonId ? "#7126b5" : "initial",
    };
  };

  const getFontPriceColor = (buttonId) => {
    return {
      color: activeButton === buttonId ? "white" : "gray",
      fontSize: activeButton === buttonId ? "smaller" : "smaller",
    };
  };

  const getClassImages = (buttonId) => {
    return activeButton === buttonId ? chooseImage : "";
  };

  const handleClose = () => setShow(false);

  const handleFocus = (e) => {
    e.target.type = "date";
  };

  // Fungsi untuk mengembalikan jenis input ke teks setelah kehilangan fokus
  const handleBlur = (e) => {
    e.target.type = "text";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      type,
      date,
      date1,
      date2,
      returnDate,
      time,
      departure,
      arrival,
      capacity,
    });
  };

  return (
    <Container
      className={isMobile ? "mt-4" : ""}
      style={{ position: "relative" }}
    >
      <Form
        className="d-flex mb-5"
        role="search"
        id="search-submit"
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          margin: isFullScreen ? "0px 120px" : "0px 0px",
          border: "0px solid #dddddd",
          borderRadius: "12.5px",
          boxShadow: " 1px 0 10px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* header title */}
        <Container>
          <Row className="p-3">
            <Col md="auto" className="">
              <h2 style={{ fontWeight: "700" }}>{title}</h2>
            </Col>
          </Row>

          <Container className="px-3">
            {/* Flight Destination */}
            <Row className="mb-4">
              {/* Departure */}
              <Col md={5} sm={12}>
                <Row>
                  <Col md={4} xs={4}>
                    <Image src={plane} /> <span>From</span>
                  </Col>
                  <Col md={8} xs={8}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      value={departure}
                      onClick={() => setLgShowDeparture(true)}
                      onChange={(e) => setDeparture(e.target.value)}
                    />
                    <Modal
                      centered
                      show={lgShowDeparture}
                      onHide={() => setLgShowDeparture(false)}
                    >
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="search"
                              placeholder="Masukkan Kota atau Negara"
                              id="departure-input"
                              value={departure}
                              onChange={(e) => setDeparture(e.target.value)}
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </Col>
                </Row>
              </Col>
              {/* Swap button */}
              <Col
                md={1}
                xs={12}
                className={
                  isMobile
                    ? "my-1 d-flex justify-content-end align-items-center"
                    : ""
                }
              >
                <Image
                  src={swapButton}
                  onClick={swap}
                  style={{ cursor: "pointer", width: "30px", height: "33px" }}
                />
              </Col>
              {/* Arrival */}
              <Col md={6} sm={12}>
                <Row>
                  <Col md={3} xs={4}>
                    {" "}
                    <Image src={plane} /> <span>To</span>
                  </Col>
                  <Col md={9} xs={8}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      value={arrival}
                      className=""
                      onClick={() => setLgShowArrival(true)}
                      onChange={(e) => setArrival(e.target.value)}
                    />
                    <Modal
                      centered
                      show={lgShowArrival}
                      onHide={() => setLgShowArrival(false)}
                      style={{}}
                    >
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="search"
                              placeholder="Masukkan Kota atau Negara"
                              id="arrival-input"
                              value={arrival}
                              onChange={(e) => setArrival(e.target.value)}
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* Flight Information */}
            <Row>
              {/* Date */}
              <Col md={6}>
                <Row>
                  <Col md={3} xs={2} className="d-flex align-items-center">
                    <Image src={calendar} className="me-1" />{" "}
                    {isMobile ? "" : "Date"}
                  </Col>
                  <Col md={3} xs={4} className="justify-content-start ">
                    <p style={{ marginBottom: 0 }}>Departure</p>{" "}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {" "}
                      <MobileDatePicker />
                    </LocalizationProvider>
                    {/* <TextField
                      variant="standard"
                      type="date"
                      aria-label="Recipient's username"
                      name="tanggal"
                      id="date-input"
                      value={date1}
                      onChange={(e) => setDate1(e.target.value)}
                      style={{ width: 110 }}
                    /> */}
                  </Col>
                  <Col md={3} xs={4}>
                    {showInput2 && (
                      <>
                        <p style={{ marginBottom: 0 }}>Return</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          {" "}
                          <MobileDatePicker />
                        </LocalizationProvider>
                        {/* <TextField
                          variant="standard"
                          type="date"
                          name="tanggal2"
                          id="date-input2"
                          value={date2}
                          onChange={(e) => setDate2(e.target.value)}
                          style={{ width: 110 }}
                        /> */}
                      </>
                    )}
                  </Col>
                  <Col md={1} xs={2}>
                    <Switch onClick={handleReturn} color="secondary" />
                  </Col>
                </Row>
              </Col>
              {/* Passanger Data   */}
              <Col md={6} className={isMobile ? "pt-3" : ""}>
                <Row>
                  {/* Icon */}
                  <Col md={3} xs={2} className="d-flex align-items-center">
                    <Image src={seat} /> {isMobile ? "" : "To"}
                  </Col>
                  {/* Passanger Info */}
                  <Col md={4} xs={5}>
                    <p style={{ margin: 0 }}>Passangers</p>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      onClick={() => setSmShowCapacity(true)}
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        borderStyle: "none none solid none",
                        borderColor: "#dddddd",
                        fontWeight: "bold",
                        borderRadius: 0,
                        textAlign: "left",
                      }}
                    />

                    <Modal
                      id="capacity-modal"
                      size="sm"
                      show={smShowCapacity}
                      onHide={() => setSmShowCapacity(false)}
                      aria-labelledby="example-modal-sizes-title-sm"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm"></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {/* Dewasa */}
                        <Row className="border-bottom">
                          <Col style={{ width: 0 }}>
                            <img src={dewasa} alt="" />
                          </Col>
                          <Col>
                            <h5>Dewasa</h5>
                            <p
                              style={{
                                fontSize: "smaller",
                                color: "gray",
                              }}
                            >
                              12 Tahun keatas
                            </p>
                          </Col>
                          <Col className="d-flex justify-content-around align-items-center">
                            <Button variant="outline-success">-</Button>
                            <span
                              style={{
                                border: "solid 1px",
                                borderRadius: "5px",
                                height: "38px",
                                width: "35px",
                              }}
                            >
                              <h4
                                className="d-flex justify-content-center"
                                style={{ position: "relative", top: "5px" }}
                              >
                                1
                              </h4>
                            </span>
                            <Button variant="outline-success">+</Button>
                          </Col>
                        </Row>
                        {/* Anak */}
                        <Row className="border-bottom mt-2">
                          <Col style={{ width: 0 }}>
                            <img src={anak} alt="" />
                          </Col>
                          <Col>
                            <h5>Anak</h5>
                            <p
                              style={{
                                fontSize: "smaller",
                                color: "gray",
                              }}
                            >
                              2 - 11 tahun
                            </p>
                          </Col>
                          <Col className="d-flex justify-content-around align-items-center">
                            <Button variant="outline-success">-</Button>
                            <span
                              style={{
                                border: "solid 1px",
                                borderRadius: "5px",
                                height: "38px",
                                width: "35px",
                              }}
                            >
                              <h4
                                className="d-flex justify-content-center"
                                style={{ position: "relative", top: "5px" }}
                              >
                                1
                              </h4>
                            </span>
                            <Button variant="outline-success">+</Button>
                          </Col>
                        </Row>
                        {/* Bayi */}
                        <Row className="border-bottom mt-2">
                          <Col style={{ width: 0 }}>
                            <img src={bayi} alt="" />
                          </Col>
                          <Col>
                            <h5>Bayi</h5>
                            <p
                              style={{
                                fontSize: "smaller",
                                color: "gray",
                              }}
                            >
                              Dibawah 2 tahun
                            </p>
                          </Col>
                          <Col className="d-flex justify-content-around align-items-center">
                            <Button variant="outline-success">-</Button>
                            <span
                              style={{
                                border: "solid 1px",
                                borderRadius: "5px",
                                height: "38px",
                                width: "35px",
                              }}
                            >
                              <h4
                                className="d-flex justify-content-center"
                                style={{ position: "relative", top: "5px" }}
                              >
                                1
                              </h4>
                            </span>
                            <Button variant="outline-success">+</Button>
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={handleClose}
                          style={{
                            backgroundColor: "#4b1979",
                            borderColor: "#4b1979",
                          }}
                        >
                          Simpan
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                  {/* Seat Class */}
                  <Col md={5} xs={5}>
                    <p style={{ margin: 0 }}> Seat Class</p>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      onClick={() => setSmShowSeatClass(true)}
                      className="me-2"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        borderStyle: "none none solid none",
                        borderColor: "#dddddd",
                        fontWeight: "bold",
                        borderRadius: 0,
                      }}
                    />
                    <Modal
                      id="seat-modal"
                      size="sm"
                      show={smShowSeatClass}
                      onHide={() => setSmShowSeatClass(false)}
                      aria-labelledby="example-modal-sizes-title-sm"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm"></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {/* Economy */}
                        <Row
                          className="border-bottom mt-2"
                          style={getClassStyle(7)}
                          onClick={() => handleClick(7)}
                        >
                          <Col style={{ position: "relative", top: "7px" }}>
                            <h5>Economy</h5>
                            <p style={getFontPriceColor(7)}>IDR 4.950.000</p>
                          </Col>
                          <Col className="d-flex justify-content-around align-items-center">
                            <img src={getClassImages(7)} alt="" />
                          </Col>
                        </Row>
                        {/* Business */}
                        <Row
                          className="border-bottom mt-2"
                          style={getClassStyle(8)}
                          onClick={() => handleClick(8)}
                        >
                          <Col style={{ position: "relative", top: "7px" }}>
                            <h5>Business</h5>
                            <p style={getFontPriceColor(8)}>IDR 29.220.000</p>
                          </Col>
                          <Col className="d-flex justify-content-around align-items-center">
                            <img src={getClassImages(8)} alt="" />
                          </Col>
                        </Row>
                        {/* First Class */}
                        <Row
                          className="border-bottom mt-2"
                          style={getClassStyle(9)}
                          onClick={() => handleClick(9)}
                        >
                          <Col style={{ position: "relative", top: "7px" }}>
                            <h5>First Class</h5>
                            <p style={getFontPriceColor(9)}>IDR 87.620.000</p>
                          </Col>
                          <Col className="d-flex justify-content-around align-items-center">
                            <img src={getClassImages(9)} alt="" />
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={handleClose}
                          style={{
                            backgroundColor: "#4b1979",
                            borderColor: "#4b1979",
                          }}
                        >
                          Simpan
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Row className="pt-4">
            {/* button input */}
            <Button
              type="submit"
              id="search"
              style={{
                backgroundColor: "#7126b5",
                borderColor: "#7126b5",
                alignSelf: "stretch",
                borderRadius: "0px 0px 11px 11px",
              }}
              as={Link}
              to="/search"
            >
              Cari Penerbangan
            </Button>
          </Row>
        </Container>
      </Form>
    </Container>
  );
=======

import "./form.css";
import RecommendationList from "../RecomendationList";
import moment from "moment";
import dayjs from "dayjs";

const FormArea = ({ title, isFullScreen, isMobile, onClick }) => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showInput2, setShowInput2] = useState(false);
    const [smShowCapacity, setSmShowCapacity] = useState(false);
    const [smShowSeatClass, setSmShowSeatClass] = useState(false);
    const [selectedSeatClass, setSelectedSeatClass] = useState(null);
    const [lgShowDeparture, setLgShowDeparture] = useState(false);
    const [lgShowArrival, setLgShowArrival] = useState(false);
    const [seatType, setSeatType] = useState("");
    const [flightType, setFlightType] = useState("One Way");
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const [departure, setDeparture] = useState("");
    const [iataCodeDeparture, setIataCodeDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [iataCodeArrival, setIataCodeArrival] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [adult, setAdult] = useState(0);
    const [child, setChild] = useState(0);
    const [baby, setBaby] = useState(0);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDateChange1 = (newValue) => {
        setDate1(newValue);
    };

    const handleDateChange2 = (newValue) => {
        setDate2(newValue);
        if (newValue) {
            setFlightType("Return");
        }
    };

    const handleSelectRecommendationStart = (recommendation) => {
        setDeparture(recommendation.city);
        setIataCodeDeparture(recommendation.iataCode);
        setLgShowDeparture(false);
    };

    const handleSelectRecommendationEnd = (recommendation) => {
        setArrival(recommendation.city);
        setIataCodeArrival(recommendation.iataCode);
        setLgShowArrival(false);
    };

    const handleIncrease = (type) => {
        if (type === "ADULT") setAdult(adult + 1);
        if (type === "CHILD") setChild(child + 1);
        if (type === "BABY") setBaby(baby + 1);
    };

    const handleDecrease = (type) => {
        if (type === "ADULT" && adult > 0) setAdult(adult - 1);
        if (type === "CHILD" && child > 0) setChild(child - 1);
        if (type === "BABY" && baby > 0) setBaby(baby - 1);
    };

    const handleSaveCapacity = () => {
        setCapacity(adult + child + baby);
        setSmShowCapacity(false);
    };

    const swapAirport = () => {
        const temp = departure;
        setDeparture(arrival);
        setArrival(temp);

        const tempIataCodeDeparture = iataCodeDeparture;
        setIataCodeDeparture(iataCodeArrival);
        setIataCodeArrival(tempIataCodeDeparture);
    };

    const handleReturn = (e) => {
        if (!date1) {
            e.preventDefault();
            toast.error("Please fill the departure date first");
        } else if (!switchChecked) {
            setSwitchChecked(!switchChecked);
            setShowInput2(!showInput2);
            setDate2(null);
        } else {
            setSwitchChecked(!switchChecked);
            setShowInput2(!showInput2);
            setDate2(null);
            setFlightType("One Way");
        }
    };

    const handleClickSeat = (seatClass) => {
        setSelectedSeatClass(seatClass);
    };

    const handleSaveSeat = () => {
        setSeatType(selectedSeatClass);

        setSmShowSeatClass(false);
    };

    const getClassStyle = (buttonId) => {
        return {
            cursor: "pointer",
            backgroundColor:
                selectedSeatClass === buttonId ? "#7126b5" : "initial",
            color: selectedSeatClass === buttonId ? "white" : "initial",
            borderColor: selectedSeatClass === buttonId ? "#7126b5" : "initial",
        };
    };

    const getClassImages = (buttonId) => {
        return selectedSeatClass === buttonId ? chooseImage : "";
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const departureDate = date1 ? date1.format("YYYY-MM-DD") : null;
        const returnDate = date2 ? date2.format("YYYY-MM-DD") : null;

        if (!departure) {
            toast.error("Departure is required");
            setLoading(false);
            return;
        }
        if (!arrival) {
            toast.error("Arrival is required");
            setLoading(false);
            return;
        }
        if (!departureDate) {
            toast.error("Departure date is required");
            setLoading(false);
            return;
        }
        if (flightType === "Return" && !returnDate) {
            toast.error("Return date is required");
            setLoading(false);
            return;
        }
        if (!capacity) {
            toast.error("Passanger capacity is required");
            setLoading(false);
            return;
        }
        if (!seatType) {
            toast.error("Seat class is required");
            setLoading(false);
            return;
        }

        console.log({
            flightType,
            departure,
            iataCodeDeparture,
            arrival,
            iataCodeArrival,
            departureDate,
            returnDate,
            seatType,
            capacity,
            adult,
            child,
            baby,
        });

        navigate("/find-ticket", {
            state: {
                flightType,
                departure,
                iataCodeDeparture,
                arrival,
                iataCodeArrival,
                departureDate,
                returnDate,
                seatType,
                capacity,
                adult,
                child,
                baby,
            },
        });

        if (onClick) {
            onClick();
        }

        setLoading(false);
    };

    return (
      <Container
        className={isMobile ? "mt-4" : ""}
        style={{ position: "relative" }}
      >
        <Form
          className="d-flex mb-5"
          role="search"
          id="search-submit"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            margin: isFullScreen ? "0px 120px" : "0px 0px",
            border: "0px solid #dddddd",
            borderRadius: "12.5px",
            boxShadow: " 1px 0 10px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* header title */}
          <Container>
            <Row className="p-3 justify-content-md-center">
              <Col md="auto" className="">
                <h2 style={{ fontWeight: "700" }}>{title}</h2>
              </Col>
            </Row>

            <Container className="px-3">
              {/* Flight Destination */}
              <Row className="mb-4 justify-content-md-center">
                {/* Departure */}
                <Col md={5} sm={12}>
                  <Row className="d-flex justify-content-md-center">
                    <Col
                      md={2}
                      xs={4}
                      className="d-flex justify-content-md-start ps-2"
                    >
                      <Image src={plane} /> <span className="ms-1">From</span>
                    </Col>
                    <Col md={7} xs={8} className="ps-5">
                      <TextField
                        style={{
                          caretColor: "transparent",
                        }}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        id="standard-basic-departure"
                        variant="standard"
                        value={
                          departure
                            ? departure + " (" + iataCodeDeparture + ")"
                            : ""
                        }
                        onClick={() => setLgShowDeparture(true)}
                        placeholder="Search for an airport..."
                      />
                      <Modal
                        centered
                        show={lgShowDeparture}
                        onHide={() => setLgShowDeparture(false)}
                        key={lgShowDeparture}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Select Departure</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form id="form-departure">
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <StartAirportSearchComponent
                                setStartAirport={setDeparture}
                                setIataCodeDeparture={setIataCodeDeparture}
                                setLgShowDeparture={setLgShowDeparture}
                              />
                              <RecommendationList
                                onSelect={handleSelectRecommendationStart}
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </Col>
                  </Row>
                </Col>
                {/* Swap button */}
                <Col
                  md={2}
                  xs={12}
                  className={
                    isMobile
                      ? "my-1 d-flex justify-content-end align-items-center"
                      : "d-flex justify-content-center"
                  }
                >
                  <Image
                    src={swapButton}
                    onClick={swapAirport}
                    style={{
                      cursor: "pointer",
                      width: "30px",
                      height: "33px",
                    }}
                  />
                </Col>
                {/* Arrival */}
                <Col md={5} sm={12}>
                  <Row>
                    <Col
                      md={2}
                      xs={4}
                      className="d-flex justify-content-md-start"
                    >
                      {" "}
                      <Image src={plane} /> <span className="ms-1">To</span>
                    </Col>
                    <Col
                      md={7}
                      xs={8}
                      className="d-flex justify-content-md-start"
                    >
                      <TextField
                        style={{
                          caretColor: "transparent",
                        }}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        id="standard-basic-arrival"
                        variant="standard"
                        value={
                          arrival ? arrival + " (" + iataCodeArrival + ")" : ""
                        }
                        onClick={() => setLgShowArrival(true)}
                        placeholder="Search for an airport..."
                      />
                      <Modal
                        centered
                        show={lgShowArrival}
                        onHide={() => setLgShowArrival(false)}
                        key={lgShowArrival}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Select Arrival</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form id="form-arrival">
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <EndAirportSearchComponent
                                setEndAirport={setArrival}
                                setIataCodeArrival={setIataCodeArrival}
                                setLgShowArrival={setLgShowArrival}
                              />
                              <RecommendationList
                                onSelect={handleSelectRecommendationEnd}
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {/* Flight Information */}
              <Row className="d-flex justify-content-md-center">
                {/* Date */}
                <Col md={5}>
                  <Row className="justify-content-md-end ms-2">
                    <Col
                      md={2}
                      xs={2}
                      className="d-flex align-items-center justify-content-end"
                    >
                      <Image src={calendar} className="me-1" />{" "}
                      {isMobile ? "" : "Date"}
                    </Col>
                    <Col md={4} xs={4} className="justify-content-end">
                      <p style={{ marginBottom: 0 }}>Departure</p>{" "}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {" "}
                        <MobileDatePicker
                          value={date1}
                          minDate={dayjs()}
                          onChange={handleDateChange1}
                          slots={{
                            textField: (props) => (
                              <TextField {...props} variant="standard" />
                            ),
                          }}
                        />
                      </LocalizationProvider>
                    </Col>
                    <Col md={4} xs={4}>
                      <p style={{ marginBottom: 0 }}>Return</p>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {" "}
                        <MobileDatePicker
                          disabled={!showInput2}
                          value={date2}
                          minDate={date1}
                          onChange={handleDateChange2}
                          slots={{
                            textField: (props) => (
                              <TextField {...props} variant="standard" />
                            ),
                          }}
                        />
                      </LocalizationProvider>
                    </Col>
                  </Row>
                </Col>
                <Col md={2} xs={2} className="d-flex justify-content-center">
                  <Switch
                    checked={switchChecked}
                    onClick={handleReturn}
                    color="secondary"
                  />
                </Col>
                {/* Passanger Data   */}
                <Col md={5} className={isMobile ? "pt-3" : ""}>
                  <Row>
                    {/* Icon */}
                    <Col md={2} xs={2} className="d-flex align-items-center">
                      <Image src={seat} /> {isMobile ? "" : "To"}
                    </Col>
                    {/* Passanger Info */}
                    <Col md={5} xs={5}>
                      <p style={{ margin: 0 }}>Passangers</p>
                      <TextField
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        id="standard-basic-passanger"
                        variant="standard"
                        value={capacity ? capacity + " Penumpang" : ""}
                        placeholder="Input Passanger"
                        onClick={() => setSmShowCapacity(true)}
                        style={{
                          caretColor: "transparent",
                          backgroundColor: "white",
                          color: "black",
                          borderStyle: "none none solid none",
                          borderColor: "#dddddd",
                          fontWeight: "bold",
                          borderRadius: 0,
                          textAlign: "left",
                        }}
                      />

                      <Modal
                        id="capacity-modal"
                        size="sm"
                        show={smShowCapacity}
                        onHide={() => setSmShowCapacity(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-sm"></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {/* Dewasa */}
                          <Row className="border-bottom">
                            <Col md={2} style={{ width: 0 }}>
                              <img src={dewasa} alt="" />
                            </Col>
                            <Col md={4} className="ms-4">
                              <h5>Dewasa</h5>
                              <p
                                style={{
                                  fontSize: "smaller",
                                  color: "gray",
                                }}
                              >
                                12 Tahun keatas
                              </p>
                            </Col>
                            <Col
                              md={6}
                              className="d-flex justify-content-around align-items-center"
                            >
                              <Button
                                variant="outline-danger"
                                onClick={() => handleDecrease("ADULT")}
                              >
                                -
                              </Button>
                              <span
                                style={{
                                  border: "solid 1px",
                                  borderRadius: "5px",
                                  height: "38px",
                                  width: "35px",
                                  margin: "0 5px",
                                }}
                              >
                                <h4
                                  className="d-flex justify-content-center"
                                  style={{
                                    position: "relative",
                                    top: "5px",
                                  }}
                                >
                                  {adult}
                                </h4>
                              </span>
                              <Button
                                variant="outline-success"
                                onClick={() => handleIncrease("ADULT")}
                              >
                                +
                              </Button>
                            </Col>
                          </Row>
                          {/* Anak */}
                          <Row className="border-bottom mt-2">
                            <Col md={2} style={{ width: 0 }}>
                              <img src={anak} alt="" />
                            </Col>
                            <Col md={4} className="ms-4">
                              <h5>Anak</h5>
                              <p
                                style={{
                                  fontSize: "smaller",
                                  color: "gray",
                                }}
                              >
                                2 - 11 tahun
                              </p>
                            </Col>
                            <Col
                              md={6}
                              className="d-flex justify-content-around align-items-center"
                            >
                              <Button
                                variant="outline-danger"
                                onClick={() => handleDecrease("CHILD")}
                              >
                                -
                              </Button>
                              <span
                                style={{
                                  border: "solid 1px",
                                  borderRadius: "5px",
                                  height: "38px",
                                  width: "35px",
                                  margin: "0 5px",
                                }}
                              >
                                <h4
                                  className="d-flex justify-content-center"
                                  style={{
                                    position: "relative",
                                    top: "5px",
                                  }}
                                >
                                  {child}
                                </h4>
                              </span>
                              <Button
                                variant="outline-success"
                                onClick={() => handleIncrease("CHILD")}
                              >
                                +
                              </Button>
                            </Col>
                          </Row>
                          {/* Bayi */}
                          <Row md={2} className="border-bottom mt-2">
                            <Col style={{ width: 0 }}>
                              <img src={bayi} alt="" />
                            </Col>
                            <Col md={4} className="ms-4">
                              <h5>Bayi</h5>
                              <p
                                style={{
                                  fontSize: "smaller",
                                  color: "gray",
                                }}
                              >
                                Dibawah 2 tahun
                              </p>
                            </Col>
                            <Col
                              md={6}
                              className="d-flex justify-content-around align-items-center"
                            >
                              <Button
                                variant="outline-danger"
                                onClick={() => handleDecrease("BABY")}
                              >
                                -
                              </Button>
                              <span
                                style={{
                                  border: "solid 1px",
                                  borderRadius: "5px",
                                  height: "38px",
                                  width: "35px",
                                  margin: "0 5px",
                                }}
                              >
                                <h4
                                  className="d-flex justify-content-center"
                                  style={{
                                    position: "relative",
                                    top: "5px",
                                  }}
                                >
                                  {baby}
                                </h4>
                              </span>
                              <Button
                                variant="outline-success"
                                onClick={() => handleIncrease("BABY")}
                              >
                                +
                              </Button>
                            </Col>
                          </Row>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            onClick={handleSaveCapacity}
                            className="button-search"
                          >
                            Simpan
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                    {/* Seat Class */}
                    <Col md={5} xs={5}>
                      <p style={{ margin: 0 }}> Seat Class</p>
                      <TextField
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        id="standard-basic-seat"
                        variant="standard"
                        value={seatType === "Bussines" ? "Business" : seatType}
                        placeholder="Input Seat Class"
                        onClick={() => setSmShowSeatClass(true)}
                        className="me-2"
                        style={{
                          caretColor: "transparent",
                          backgroundColor: "white",
                          color: "black",
                          borderStyle: "none none solid none",
                          borderColor: "#dddddd",
                          fontWeight: "bold",
                          borderRadius: 0,
                        }}
                      />
                      <Modal
                        id="seat-modal"
                        size="sm"
                        show={smShowSeatClass}
                        onHide={() => setSmShowSeatClass(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-sm"></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {/* Economy */}
                          <Row
                            className="border-bottom mt-2 px-2 pb-3 home-seat-class"
                            style={getClassStyle("Economy")}
                            onClick={() => handleClickSeat("Economy")}
                          >
                            <Col
                              style={{
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              <h5>Economy</h5>
                            </Col>
                            <Col className="d-flex justify-content-around align-items-center">
                              <img
                                className="pt-2"
                                src={getClassImages("Economy")}
                                alt=""
                              />
                            </Col>
                          </Row>
                          {/* Business */}
                          <Row
                            className="border-bottom mt-2 px-2 pb-3 home-seat-class"
                            style={getClassStyle("Bussines")}
                            onClick={() => handleClickSeat("Bussines")}
                          >
                            <Col
                              style={{
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              <h5>Business</h5>
                            </Col>
                            <Col className="d-flex justify-content-around align-items-center">
                              <img
                                className="pt-2"
                                src={getClassImages("Bussines")}
                                alt=""
                              />
                            </Col>
                          </Row>
                          {/* First Class */}
                          <Row
                            className="border-bottom mt-2 px-2 pb-3 home-seat-class"
                            style={getClassStyle("FirstClass")}
                            onClick={() => handleClickSeat("FirstClass")}
                          >
                            <Col
                              style={{
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              <h5>First Class</h5>
                            </Col>
                            <Col className="d-flex justify-content-around align-items-center">
                              <img
                                className="pt-2"
                                src={getClassImages("FirstClass")}
                                alt=""
                              />
                            </Col>
                          </Row>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            onClick={handleSaveSeat}
                            className="button-search"
                          >
                            Simpan
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            <Row className="pt-4">
              {/* button input */}
              <Button
                type="submit"
                id="search"
                className="button-search"
                disabled={loading}
              >
                {loading ? "Loading..." : "Cari Penerbangan"}
              </Button>
            </Row>
          </Container>
        </Form>
      </Container>
    );
};

FormArea.propTypes = {
    title: PropTypes.object,
    isFullScreen: PropTypes.bool,
    isMobile: PropTypes.bool,
    onClick: PropTypes.func,
>>>>>>> db97bc951a04d5acd4a851774580a614cd038524
};

export default FormArea;
