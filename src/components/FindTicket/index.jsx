import React, { useState } from "react";
import { Container, Row, Col, Button, Accordion, Image } from "react-bootstrap";

import { MenuItem, FormControl, Select, Typography } from "@mui/material";
import Slider from "react-slick";
import exampleAirlineLogo from "../../assets/airlineLogo.png";
import Arrow from "../../assets/Arrow.svg";
import ArrowBack from "../../assets/fi_arrow-left.svg";

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
              <Button
                variant="primary"
                className="d-flex flex-fill align-items-center justify-content-center justify-content-md-start"
                style={{
                  color: "white",
                  borderRadius: 14,
                  justifyContent: "flex-start",
                  paddingLeft: "8px",
                }}
              >
                <Image src={ArrowBack} /> JKT {">"} MLB - 2 Penumpang - Economy
              </Button>
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
        <Row className="my-4">
          <Col md={9}></Col>
          <Col md={3}>
            <Filter />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="my-4">
          <Col>
            <FlightList />
            <FlightList />
            <FlightList />
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
    { day: "Selasa", date: "01/02/2024" },
    { day: "Rabu", date: "01/03/2024" },
    { day: "Kamis", date: "01/01/2024" },
    { day: "Jumat", date: "01/02/2024" },
    { day: "Sabtu", date: "01/03/2024" },
    { day: "Minggu", date: "01/03/2024" },
    { day: "Senin2", date: "01/01/2024" },
    { day: "Selasa", date: "01/02/2024" },
    { day: "Rabu", date: "01/03/2024" },
    { day: "Kamis", date: "01/01/2024" },
    { day: "Jumat", date: "01/02/2024" },
    { day: "Sabtu", date: "01/03/2024" },
    { day: "Minggu", date: "01/03/2024" },
  ];
  var settings = {
    className: "center",
    centerMode: true,
    speed: 800,
    slidesToShow: 7,
    focusOnSelect: true,
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
          <div key={index}>
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
                border: "1px solid grey",
                width: "90%",
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

const FlightList = () => {
  return (
    <>
      <Accordion
      className="mb-4"
        style={{
          boxShadow: " 1px 0 5px 1px rgba(0, 0, 0, 0.1)",
          // paddingBottom: "1rem",
          // backgroundColor: "white",
          borderRadius: "0.50rem",
        }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Container>
              <Row>
                <p>
                  <Image src={exampleAirlineLogo} className="me-2" />
                  Jet Air - Economy
                </p>
              </Row>
              <Row>
                <Col md={9} sm={12} className="ps-sm-5">
                  <Row>
                    <Col
                      md={1}
                      xs={3}
                      className="d-flex flex-column align-items-center"
                    >
                      <p style={{ fontWeight: "bold" }}>07.00</p>
                      <p>JKT</p>
                    </Col>
                    <Col
                      md={9}
                      xs={4}
                      className="d-flex flex-column justify-content-center"
                      style={{ textAlign: "center" }}
                    >
                      <p className="my-0">4h 0m</p>

                      <Image src={Arrow} className="img-fluid" />

                      <p className="my-0">Flight Duration</p>
                    </Col>
                    <Col
                      md={1}
                      xs={3}
                      className="d-flex flex-column align-items-center"
                    >
                      <p style={{ fontWeight: "bold" }}>11.00</p>
                      <p>MLB</p>
                    </Col>
                    <Col md={1} xs={2} className="">
                      <img src="/icon-park-outline_baggage-delay.png" />
                    </Col>
                  </Row>
                </Col>
                <Col
                  md={3}
                  sm={12}
                  className="d-flex flex-column align-items-center align-items-md-end pt-3 "
                >
                  <h3 style={{ fontSize: 25, fontWeight: 500 }}>
                    IDR 4.950.000
                  </h3>
                  <Button style={{ borderRadius: 14, width: "50%" }}>
                    Pilih
                  </Button>
                </Col>
              </Row>
            </Container>
          </Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                <h6 style={{ fontWeight: "bold" }}>Detail Penerbangan</h6>
              </Row>
              <Row>
                <Col xs={6}>
                  <p style={{ fontWeight: "bold" }} className="m-0">
                    07.00
                  </p>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                  <p style={{ fontWeight: "bold" }} className="m-0">
                    Keberangkatan
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="m-0">3 Maret 2023</p>
                  <p style={{ fontWeight: "500" }} className="m-0">
                    Soekarno Hatta - Terminal 1A Domestik
                  </p>
                  <hr class="solid"></hr>
                </Col>
              </Row>
              <Row>
                <Col md={{}}>
                  <p style={{ fontWeight: "bold" }} className="my-0 mx-1 ps-4">
                    Jet Air - Economy
                  </p>
                  <p style={{ fontWeight: "bold" }} className="my-0 mx-1 ps-4">
                    JT - 203
                  </p>
                  <br></br>
                  <p className="my-0" style={{ fontWeight: "bold" }}>
                    <Image src={exampleAirlineLogo} className="me-1" />
                    Informasi
                  </p>
                  <p className="my-0 mx-1 ps-4">Baggage 20kg</p>
                  <p className="my-0 mx-1 ps-4">Cabin baggage 7 kg</p>
                  <p className="my-0 mx-1 ps-4">In Flight Entertainment</p>
                  <hr class="solid"></hr>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <p style={{ fontWeight: "bold" }} className="m-0">
                    07.00
                  </p>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                  <p style={{ fontWeight: "bold" }} className="m-0">
                    Kedatangan
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="m-0">3 Maret 2023</p>
                  <p style={{ fontWeight: "500" }} className="m-0">
                    Melbourne International Airport
                  </p>
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FindTicket;
