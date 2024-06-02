import React, { useState } from "react";
import { Container, Row, Col, Button, Accordion, Image } from "react-bootstrap";
import { MenuItem, FormControl, Select, Typography } from "@mui/material";
import Slider from "react-slick";

import exampleAirlineLogo from "../../assets/airlineLogo.png";
import findTicketLoading from "../../assets/findTicketLoading.svg";
import findTicketNotFound from "../../assets/findTicketNotFound.svg";
import findTicketEmpty from "../../assets/findTicketEmpty.svg";

import VerticalLine from "../../assets/verticalLine.svg";
import DetailFlight from "../DetailFlight";
import FlightDestination from "../FlightDestination";
import BackButton from "../BackButton";

const FindTicket = () => {
  return (
    <>
      <div
        style={{
          boxShadow: " 1px 0 10px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container className="">
          <h4 style={{ fontWeight: 700 }}>Pilih Penerbangan</h4>
          <Row className="my-4 g-2">
            <Col sx={12} md={10} className="d-flex">
              <BackButton ButtonText={"JKT  >  MLB - 2 Penumpang - Economy"} />
            </Col>
            <Col sx={12} md={2} className="d-flex">
              <Button
                variant="success"
                style={{ borderRadius: 14 }}
                className="flex-fill"
              >
                Ubah Penerbangan
              </Button>
            </Col>
          </Row>
          <Row className="mt-4 ">
            <Col className="pb-3">
              <DateSelector />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="my-4 mx-2">
          <Col md={9}></Col>
          <Col md={3}>
            <Filter />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="my-4 mx-2 d-flex ">
          <Col>
            <TicketEmpty />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const DateSelector = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [isActived, setIsActived] = useState(null);

  const dumpTime = [
    { day: "Senin1", date: "01/01/2024" },
    { day: "Selasa", date: "02/01//2024" },
    { day: "Rabu", date: "03/01/2024" },
    { day: "Kamis", date: "04/01/2024" },
    { day: "Jumat", date: "05/01/2024" },
    { day: "Sabtu", date: "06/01/2024" },
    { day: "Minggu", date: "07/01/2024" },
    { day: "Senin2", date: "08/01/2024" },
    { day: "Selasa", date: "09/01/2024" },
    { day: "Rabu", date: "10/01/2024" },
    { day: "Kamis", date: "11/01/2024" },
    { day: "Jumat", date: "12/01/2024" },
    { day: "Sabtu", date: "13/01/2024" },
    { day: "Minggu", date: "14/01/2024" },
  ];
  var settings = {
    className: "center",
    centerMode: true,
    speed: 800,
    slidesToShow: 7,
    focusOnSelect: true,
    slidesToScroll: 10,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
    centerPadding: "0px",
  };

  return (
    <>
      <Slider {...settings}>
        {dumpTime.map((time, index) => (
          <div key={index} className="d-flex flex-row">
            <Button
              className="px-0"
              textAlign="center"
              variant="custom"
              type="button"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={() => setIsActive(index)}
              onMouseUp={() => setIsActive(false)}
              style={{
                // border: "1px solid grey",
                width: "100%",
                color:
                  isActived === index
                    ? "white"
                    : isHovered === index
                    ? "white"
                    : "black",
                backgroundColor:
                  isActived === index
                    ? "red"
                    : isHovered === index
                    ? "purple"
                    : "white",
              }}
            >
              <div className="text-container">
                <p style={{ fontWeight: "bold" }} className="mb-0">
                  {time.day}
                </p>
                <p className="mb-0">{time.date}</p>
              </div>
            </Button>
            <Image src={VerticalLine} />
          </div>
        ))}
      </Slider>
    </>
  );
};

const Filter = () => {
  return (
    <>
      <FormControl fullWidth>
        <Select
          displayEmpty
          defaultValue={10}
          size="small"
          sx={{ borderRadius: 2 }}
        >
          <MenuItem value={10}>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Harga</span> - Termurah
            </Typography>
          </MenuItem>
          <MenuItem value={20}>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Durasi</span> - Terpendek
            </Typography>
          </MenuItem>
          <MenuItem value={30}>
            <Typography>
              {" "}
              <span style={{ fontWeight: "bold" }}>Keberangkatan</span> - Paling
              Awal
            </Typography>
          </MenuItem>
          <MenuItem value={40}>
            <Typography>
              {" "}
              <span style={{ fontWeight: "bold" }}>Keberangkatan</span> - Paling
              Akhir
            </Typography>
          </MenuItem>
          <MenuItem value={50}>
            <Typography>
              {" "}
              <span style={{ fontWeight: "bold" }}>Kedatangan</span> - Paling
              Awal
            </Typography>
          </MenuItem>
          <MenuItem value={60}>
            <Typography>
              {" "}
              <span style={{ fontWeight: "bold" }}>Kedatangan</span> - Paling
              Akhir
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

const FlightList = ({ departure }) => {
  return (
    <Accordion
      className="mb-3"
      style={{
        boxShadow: " 1px 0 5px 1px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.50rem",
      }}
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Container>
            <Row>
              <Col
                md={4}
                sm={12}
                className="d-flex align-items-center justify-content-center justify-content-md-start"
              >
                <div className="d-flex align-items-center">
                  <Image
                    src={exampleAirlineLogo}
                    className="me-3"
                    style={{ width: 35 }}
                  />
                  <p style={{ fontSize: 18, marginBottom: 0 }}>
                    Jet Air - Economy
                  </p>
                </div>
              </Col>
              {/* flight time */}
              <Col md={4} sm={12} className="d-flex pt-2">
                <FlightDestination />
              </Col>
              <Col
                md={1}
                xs={12}
                className="d-flex align-self-center justify-content-center pt-3"
              >
                <img src="/icon-park-outline_baggage-delay.png" />
              </Col>
              <Col
                md={3}
                sm={12}
                className="d-flex flex-column align-items-md-end align-items-center pt-3"
              >
                <h3 style={{ fontSize: 20, fontWeight: 650 }}>IDR 4.950.000</h3>
                <Button style={{ borderRadius: 14, width: "50%" }}>
                  Pilih
                </Button>
              </Col>
            </Row>
          </Container>
        </Accordion.Header>
        <Accordion.Body>
          <DetailFlight />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const TicketNotFound = () => {
  return (
    <Row
      className="justify-content-center pt-5"
      style={{ textAlign: "center" }}
    >
      <Image src={findTicketNotFound} style={{ width: 400 }} />
      <Row className="pt-3">
        <p style={{ marginBottom: 0 }}>Maaf, pencarian Anda tidak ditemukan</p>
        <p style={{ color: "purple" }}>Coba cari perjalanan lainnya!</p>
      </Row>
    </Row>
  );
};

const TicketLoading = () => {
  return (
    <Row
      className="justify-content-center pt-5"
      style={{ textAlign: "center" }}
    >
      <p>Mencari penerbangan terbaik...</p>
      <Image src={findTicketLoading} style={{ width: 250 }} />
    </Row>
  );
};

const TicketEmpty = () => {
  return (
    <Row
      className="justify-content-center pt-5"
      style={{ textAlign: "center" }}
    >
      <Image src={findTicketEmpty} style={{ width: 250 }} />
      <Row className="pt-5">
        {" "}
        <p style={{ marginBottom: 0 }}>Maaf, Tiket terjual habis!</p>
        <p>Coba cari perjalanan lainnya!</p>
      </Row>
    </Row>
  );
};

export default FindTicket;
