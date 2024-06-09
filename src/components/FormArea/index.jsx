import Switch from "@mui/material/Switch";
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Container,
  Modal,
  Image,
} from "react-bootstrap";
import plane from "../../assets/SearchBar/material-symbols_flight-takeoff-sharp.png";
import swapButton from "../../assets/SearchBar/return.png";
import calendar from "../../assets/SearchBar/Vector.png";
import seat from "../../assets/SearchBar/material-symbols_airline-seat-recline-normal.png";
import dewasa from "../../assets/Passengers Modal/Dewasa.png";
import anak from "../../assets/Passengers Modal/Anak.png";
import bayi from "../../assets/Passengers Modal/Bayi.png";

import { Link } from "react-router-dom";
import chooseImage from "../../assets/Class Modal/check.png";
import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
};

export default FormArea;
