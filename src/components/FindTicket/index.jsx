import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  Accordion,
  Image,
} from "react-bootstrap";
import exampleAirlineLogo from "../../assets/airlineLogo.png";
import Arrow from "../../assets/Arrow.svg";
import ArrowBack from "../../assets/fi_arrow-left.svg";

const FindTicket = () => {
  return (
    <>
      <div className="shadow-sm pb-1 mb-5 bg-white rounded">
        <Container className="">
          <h4>Pilih Penerbangan</h4>
          <Row className="my-4 g-2">
            <Col sx={12} md={10} className="d-flex">
              <Button
                variant="primary"
                className="d-flex flex-fill "
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
            <Col className="d-flex">
              <DateSelector />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row style={{}}>
          <Col md={10} sm={11}></Col>
          <Col md={2} sm={1}>
            <Filter />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="my-4">
          <FlightList />
        </Row>
      </Container>
    </>
  );
};

const DateSelector = () => {
  const dumpTime = [
    { day: "Senin", date: "01/01/2024" },
    { day: "Selasa", date: "01/02/2024" },
    { day: "Rabu", date: "01/03/2024" },
    { day: "Kamis", date: "01/04/2024" },
    { day: "Jumat", date: "01/05/2024" },
    { day: "Sabtu", date: "01/06/2024" },
    { day: "Minggu", date: "01/07/2024" },
    { day: "Senin", date: "01/08/2024" },
  ];
  return (
    <>
      <ButtonGroup className="flex-fill" aria-label="Basic example">
        {dumpTime.map((time) => (
          <Button variant="custom" type="button">
            <div className="text-container">
              <p style={{ fontWeight: "bold" }} className="mb-0">
                {time.day}
              </p>
              <p className="mb-0">{time.date}</p>
            </div>
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

const Filter = () => {
  return (
    <Container>
      <Form.Select style={{ borderRadius: 20 }}>
        <option>Harga - Termurah</option>
        <option>Durasi - Terpendek</option>
      </Form.Select>
    </Container>
  );
};

const FlightList = () => {
  return (
    <Container className="fluid">
      <Container>
        <Accordion>
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
                  <Col md={9} className="ps-5">
                    <Row>
                      <Col>
                        <p style={{ fontWeight: "bold" }}>07.00</p>
                        <p>JKT</p>
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <p className="my-0">4h 0m</p>

                        <Image
                          src={Arrow}
                          style={{
                            width: "100%",
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />

                        <p className="my-0">Direct</p>
                      </Col>
                      <Col>
                        <p style={{ fontWeight: "bold" }}>11.00</p>
                        <p>MLB</p>
                      </Col>
                      <Col>
                        <img src="/icon-park-outline_baggage-delay.png" />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3} className="d-flex flex-column align-items-end">
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
                    <p
                      style={{ fontWeight: "bold" }}
                      className="my-0 mx-1 ps-4"
                    >
                      Jet Air - Economy
                    </p>
                    <p
                      style={{ fontWeight: "bold" }}
                      className="my-0 mx-1 ps-4"
                    >
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
      </Container>
    </Container>
  );
};

export default FindTicket;
