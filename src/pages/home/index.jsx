import React, { useState } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Form,
  Container,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Switch from "@mui/material/Switch";

import plane from "../../assets/SearchBar/material-symbols_flight-takeoff-sharp.png";
import swapButton from "../../assets/SearchBar/return.png";
import calendar from "../../assets/SearchBar/Vector.png";
import seat from "../../assets/SearchBar/material-symbols_airline-seat-recline-normal.png";
import dewasa from "../../assets/Passengers Modal/Dewasa.png";
import anak from "../../assets/Passengers Modal/Anak.png";
import bayi from "../../assets/Passengers Modal/Bayi.png";

import { Link } from "react-router-dom";
import initialSearchImage from "../../assets/Cards/b_search.png";
import clickedSearchImage from "../../assets/Cards/w_search.png";
import chooseImage from "../../assets/Class Modal/check.png";

const Home = () => {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showInput2, setShowInput2] = useState(false);
  const [time, setTime] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [capacity, setCapacity] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [smShowCapacity, setSmShowCapacity] = useState(false);
  const [smShowSeatClass, setSmShowSeatClass] = useState(false);
  const [lgShowDeparture, setLgShowDeparture] = useState(false);
  const [lgShowArrival, setLgShowArrival] = useState(false);

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

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const getButtonStyle = (buttonId) => {
    return {
      backgroundColor: activeButton === buttonId ? "#7126b5" : "#e2d4f0",
      color: activeButton === buttonId ? "white" : "black",
      borderColor: activeButton === buttonId ? "#7126b5" : "#e2d4f0",
    };
  };
  const getSourceImages = (buttonId) => {
    return activeButton === buttonId ? clickedSearchImage : initialSearchImage;
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

  return (
    <div
      id="home"
      className="p-5 mt-5"
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* search bar */}
      <form
        className="d-flex mb-5 mt-5"
        role="search"
        id="search-submit"
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid #dddddd",
          borderRadius: "12.5px",
          flexDirection: "column",
        }}
      >
        <div className="p-3">
          <h2 className="d-flex justify-content-start">
            Pilih Jadwal Penerbangan spesial di&nbsp;
            <span style={{ color: "#7126B5" }}>Terbangin!</span>
          </h2>
        </div>
        <Row className="p-3">
          <Container className="p-3">
            <Row>
              {/* departure */}
              <Col md={4}>
                <Row className="d-flex align-items-center">
                  <Col>
                    <img
                      src={plane}
                      alt=""
                      style={{ height: "32px", width: "auto" }}
                    />
                  </Col>
                  <Col>From</Col>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => setLgShowDeparture(true)}
                    >
                      {departure}
                    </Button>

                    <Modal
                      show={lgShowDeparture}
                      onHide={() => setLgShowDeparture(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
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
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body></Modal.Body>
                    </Modal>
                    {/* <Form.Control
                      type="search"
                      placeholder="From"
                      aria-label="Search"
                      id="departure-input"
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                    /> */}
                  </Col>
                </Row>
              </Col>
              {/* swap button */}
              <Col
                md={4}
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src={swapButton}
                  alt=""
                  onClick={swap}
                  style={{ cursor: "pointer" }}
                />
              </Col>
              {/* arrival */}
              <Col md={4}>
                <Row className="d-flex align-items-center">
                  <Col>
                    <img
                      src={plane}
                      alt=""
                      style={{ height: "32px", width: "auto" }}
                    />
                  </Col>
                  <Col>To</Col>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => setLgShowArrival(true)}
                    >
                      {arrival}
                    </Button>

                    <Modal
                      show={lgShowArrival}
                      onHide={() => setLgShowArrival(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <Form>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Control
                                type="email"
                                placeholder="Masukkan Kota atau Negara"
                                id="arrival-input"
                                value={arrival}
                                onChange={(e) => setArrival(e.target.value)}
                                autoFocus
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body></Modal.Body>
                    </Modal>
                    {/* <Form.Control
                      type="search"
                      placeholder="To"
                      aria-label="Search"
                      id="arrival-input"
                      value={arrival}
                      onChange={(e) => setArrival(e.target.value)}
                    /> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>

          <Container className="p-3">
            <Row>
              {/* date */}
              <Col md={6}>
                <Row>
                  <Col className="d-flex align-items-center">
                    <img
                      src={calendar}
                      alt=""
                      style={{ height: "32px", width: "auto" }}
                    />
                  </Col>
                  <Col className="d-flex align-items-center">Date</Col>
                  <Col className="mx-2">
                    <Row>Departure</Row>
                    <Row>
                      <Form.Control
                        type="date"
                        aria-label="Recipient's username"
                        name="tanggal"
                        id="date-input"
                        value={date1}
                        onChange={(e) => setDate1(e.target.value)}
                      />
                    </Row>
                  </Col>
                  <Col className="mx-2">
                    <Row>Return</Row>
                    {/* button switch */}
                    <Row>
                      {showInput2 && (
                        <Col xs="auto">
                          <Form.Control
                            type="date"
                            name="tanggal2"
                            id="date-input2"
                            value={date2}
                            onChange={(e) => setDate2(e.target.value)}
                          />
                        </Col>
                      )}
                      <Col xs="auto">
                        <Switch onClick={handleReturn} color="secondary" />
                      </Col>
                    </Row>
                  </Col>
                  {returnDate && (
                    <Col xs="auto">
                      <div>{returnDate}</div>
                    </Col>
                  )}
                </Row>
              </Col>
              {/* capacity */}
              <Col md={6}>
                <Row className="d-flex align-items-center">
                  <Col>
                    <img
                      src={seat}
                      alt=""
                      style={{ height: "32px", width: "auto" }}
                    />
                  </Col>
                  <Col>To</Col>
                  <Col className="mx-2">
                    <Row>Passengers</Row>
                    <Row>
                      <Button
                        onClick={() => setSmShowCapacity(true)}
                        className="me-2"
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          borderStyle: "none none solid none",
                          borderColor: "#dddddd",
                          fontWeight: "bold",
                          borderRadius: 0,
                        }}
                      >
                        Penumpang
                      </Button>
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
                    </Row>
                  </Col>
                  <Col className="mx-2">
                    <Row>Seat Class</Row>
                    <Row>
                      <Button
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
                      >
                        Business
                      </Button>
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
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Row>
        {/* button input */}
        <Button
          type="submit"
          id="search"
          style={{
            backgroundColor: "#7126b5",
            borderColor: "#7126b5",
            alignSelf: "stretch",
            borderRadius: "0px 0px 12.5px 12.5px",
          }}
          as={Link}
          to="/search"
        >
          Cari Penerbangan
        </Button>
      </form>

      {/* Cards */}
      <div style={{ fontWeight: "bold" }}>
        <h4>Destinasi Favorit</h4>
      </div>
      {/* Button Destination */}
      <Row className="my-3">
        <Col>
          <Button
            style={getButtonStyle(1)}
            onClick={() => handleClick(1)}
            variant="secondary"
            className="mx-3"
          >
            <img src={getSourceImages(1)} alt="Tombol 1" />
            &nbsp;Semua
          </Button>

          <Button
            style={getButtonStyle(2)}
            onClick={() => handleClick(2)}
            variant="secondary"
            className="mx-3"
          >
            <img src={getSourceImages(2)} alt="Tombol 2" />
            &nbsp;Asia
          </Button>

          <Button
            style={getButtonStyle(3)}
            onClick={() => handleClick(3)}
            variant="secondary"
            className="mx-3"
          >
            <img src={getSourceImages(3)} alt="Tombol 3" />
            &nbsp;Amerika
          </Button>
          <Button
            style={getButtonStyle(4)}
            onClick={() => handleClick(4)}
            variant="secondary"
            className="mx-3"
          >
            <img src={getSourceImages(4)} alt="Tombol 4" />
            &nbsp;Australia
          </Button>
          <Button
            style={getButtonStyle(5)}
            onClick={() => handleClick(5)}
            variant="secondary"
            className="mx-3"
          >
            <img src={getSourceImages(5)} alt="Tombol 5" />
            &nbsp;Eropa
          </Button>
          <Button
            style={getButtonStyle(6)}
            onClick={() => handleClick(6)}
            variant="secondary"
            className="mx-3"
          >
            <img src={getSourceImages(6)} alt="Tombol 6" />
            &nbsp;Afrika
          </Button>
        </Col>
      </Row>
      <Row id="cards">
        {Array.from({ length: 5 }).map((_, index) => (
          <Col
            key={index}
            md={3}
            className="d-flex justify-content-center mb-4"
          >
            <Card style={{ width: "15rem" }}>
              <Card.Img
                variant="top"
                src="src/assets/Cards/Frame 152.png"
                style={{ height: "auto", width: "auto" }}
              />
              <Card.Body>
                <Card.Title>Jakarta &rarr; Bangkok</Card.Title>
                <Card.Subtitle style={{ color: "#7126b5", fontWeight: "900" }}>
                  AirAsia
                </Card.Subtitle>
                <Card.Text>20 - 30 Maret 2023</Card.Text>
                <h6>
                  Mulai dari IDR&nbsp;
                  <span style={{ color: "red" }}>950.000</span>
                </h6>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
