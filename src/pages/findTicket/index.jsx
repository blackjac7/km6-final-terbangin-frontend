import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Accordion,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  MenuItem,
  FormControl,
  Select,
  Typography,
  Modal,
} from "@mui/material";
import { format } from "date-fns";

import findTicketLoading from "../../assets/findTicketLoading.svg";
import findTicketNotFound from "../../assets/findTicketNotFound.svg";
import findTicketEmpty from "../../assets/findTicketEmpty.svg";
import VerticalLine from "../../assets/verticalLine.svg";
import accorTrigger from "../../assets/accorTrigger.svg";
import freeBaggage from "../../assets/freeBaggage.svg";

import DetailFlight from "../../components/FlightDetail";
import FlightDestination from "../../components/FlightDestination";
import BackButton from "../../components/BackButton";
import HeaderShadow from "../../components/HeaderShadow";
import FormArea from "../../components/FormArea";

import { useDispatch, useSelector } from "react-redux";
import { getFilterFlights } from "../../redux/actions/flight";

const FindTicket = () => {
  const [isChangeFlight, setChangeFlight] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFullScreen, setIsFullScreen] = useState(window.innerWidth > 1160);

  const departure = "Pyongyang";
  const arrival = "Tokyo";
  const capacity = 4;
  const baby = 0;
  const child = 1;
  const adult = 3;
  const departureDate = "2024-06-06";
  const flightType = "Return";
  const iataCodeArrival = "BDO";
  const iataCodeDeparture = "CGK";
  const returnDate = "2024-06-15";
  const seatType = "Bussines";

  const dispatch = useDispatch();
  const { flights } = useSelector((state) => state.flight);
  const handleOpenChangeFlight = () => {
    setChangeFlight(true);
  };

  const handleCloseChangeFlight = () => {
    setChangeFlight(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsFullScreen(window.innerWidth > 1160);
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value based on the current window size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(
      getFilterFlights(
        departure,
        arrival,
        "departureAt",
        departureDate,
        "price" + seatType,
        "asc",
        seatType
      )
    );
  }, [dispatch]);

  return (
    <>
      {/* Header */}
      <HeaderShadow>
        <h4 className="pt-4" style={{ fontWeight: 700 }}>
          Pilih Penerbangan
        </h4>

        <Row className="mt-4 g-2">
          <Col sx={12} md={10} className="d-flex">
            <BackButton
              ButtonText={`${iataCodeArrival}  >  ${iataCodeDeparture} - ${capacity} Penumpang - ${seatType}`}
            />
          </Col>
          <Col sx={12} md={2} className="d-flex">
            <Button
              variant="success"
              style={{ borderRadius: 14 }}
              className="flex-fill"
              onClick={handleOpenChangeFlight}
            >
              Ubah Penerbangan
            </Button>

            {/* <Modal
              open={isChangeFlight}
              onClose={handleCloseChangeFlight}
              style={{ top: "10%", zIndex: 300 }}
            >
              <FormArea
                title={"Ubah Penerbangan"}
                isFullScreen={isFullScreen}
                isMobile={isMobile}
              />
            </Modal> */}
          </Col>
        </Row>

        <Row className="mt-4 ">
          <Col>
            <DateSelector
              dispatch={dispatch}
              datafiltering={{
                seatType: seatType,
                departure: departure,
                arrival: arrival,
                departureDate: departureDate,
              }}
            />
          </Col>
        </Row>
      </HeaderShadow>
      {/* Main Content */}
      <Container>
        <Row className={isFullScreen ? "pt-4 mx-5" : "pt-4"}>
          <Col>
            {flights === null || flights?.length === 20 ? (
              <TicketNotFound />
            ) : (
              <FlightList
                flights={flights}
                dispatch={dispatch}
                datafiltering={{
                  seatType: seatType,
                  departure: departure,
                  arrival: arrival,
                  departureDate: departureDate,
                }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

const DateSelector = ({ dispatch, datafiltering }) => {
  const baseDate = new Date(datafiltering.departureDate);
  const [selectedDate, setSelectedDate] = useState(baseDate);
  const [visibleButtons, setVisibleButtons] = useState(7);
  const [isHovered, setIsHovered] = useState(null);
  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateyearfirst = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const createButtonData = (baseDate, offset) => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + offset);
    const dayName = daysOfWeek[newDate.getDay()];
    return { hari: dayName, tanggal: formatDate(newDate), date: newDate };
  };

  const handleButtonClick = (newDate) => {
    let newdate = formatDateyearfirst(newDate);
    setSelectedDate(newDate);
    dispatch(
      getFilterFlights(
        datafiltering.departure,
        datafiltering.arrival,
        "departureAt",
        newdate,
        "price" + datafiltering.seatType,
        "asc",
        datafiltering.seatType
      )
    );
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ overflowX: "hidden" }}
    >
      <Image src={VerticalLine} />
      {Array.from({ length: visibleButtons }, (_, i) => {
        const buttonData = createButtonData(selectedDate, i - 3);
        const isActive = selectedDate.getTime() === buttonData.date.getTime();

        return (
          <React.Fragment key={i}>
            <Button
              className="px-4 mx-3"
              variant="custom"
              onClick={() => handleButtonClick(buttonData.date)}
              onMouseEnter={() => setIsHovered(i)}
              onMouseLeave={() => setIsHovered(null)}
              style={{
                backgroundColor: isActive
                  ? "blue"
                  : isHovered === i
                  ? "grey"
                  : "",
                color: isActive || isHovered === i ? "white" : "black",
              }}
            >
              <p style={{ margin: 0 }}>{buttonData.hari}</p>
              <p style={{ margin: 0 }}>{buttonData.tanggal}</p>
            </Button>
            <Image src={VerticalLine} />
          </React.Fragment>
        );
      })}
    </Container>
  );
};

const Filter = ({ dispatch, datafiltering }) => {
  const [sortOption, setSortOption] = useState("price-asc"); // Changed

  const handleChange = (event) => {
    // Changed
    const selectedOption = event.target.value; // Changed
    setSortOption(selectedOption); // Changed
    const [sortField, sortOrder] = selectedOption.split("-"); // Changed
    dispatch(
      // Changed
      getFilterFlights(
        // Changed
        datafiltering.departure, // Changed
        datafiltering.arrival, // Changed
        "departureAt", // Changed
        datafiltering.departureDate, // Changed
        sortField === "price" ? sortField + datafiltering.seatType : sortField, // Changed
        sortOrder, // Changed
        datafiltering.seatType // Changed
      ) // Changed
    ); // Changed
  }; // Changed
  return (
    <Row className="mb-4">
      <Col offset-md={9}></Col>
      <Col md={3}>
        <FormControl fullWidth>
          <Select
            displayEmpty
            defaultValue="price-asc"
            size="small"
            sx={{ borderRadius: 2 }}
            value={sortOption} // Changed
            onChange={handleChange} // Changed
          >
            <MenuItem value="price-asc">
              <Typography>
                <span style={{ fontWeight: "bold" }}>Harga</span> - Termurah
              </Typography>
            </MenuItem>
            <MenuItem value="duration-asc">
              <Typography>
                <span style={{ fontWeight: "bold" }}>Durasi</span> - Terpendek
              </Typography>
            </MenuItem>
            <MenuItem value="departureAt-asc">
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}>Keberangkatan</span> -
                Paling Awal
              </Typography>
            </MenuItem>
            <MenuItem value="departureAt-desc">
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}>Keberangkatan</span> -
                Paling Akhir
              </Typography>
            </MenuItem>
            <MenuItem value="arrivalAt-asc">
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}>Kedatangan</span> - Paling
                Awal
              </Typography>
            </MenuItem>
            <MenuItem value="arrivalAt-desc">
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}>Kedatangan</span> - Paling
                Akhir
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Col>
    </Row>
  );
};

const FlightList = ({ flights, dispatch, datafiltering }) => {
  const [expanded, setExpanded] = useState(null);
  const [rotated, setRotated] = useState({});

  const handleHeaderClick = (flightId) => {
    setExpanded((prevExpanded) =>
      prevExpanded === flightId ? null : flightId
    );
    setRotated((prevRotated) => ({
      ...prevRotated,
      [flightId]: !prevRotated[flightId],
    }));
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Mencegah event klik dari propagasi ke Card.Header
    // Tambahkan logika untuk penanganan klik pada tombol "Pilih"
    console.log("Tombol Pilih diklik");
  };

  return (
    <>
      <Filter dispatch={dispatch} datafiltering={datafiltering} />
      <Accordion activeKey={expanded}>
        {flights.map((flight) => (
          <Card
            key={flight.id}
            className="mb-3 py-2"
            style={{
              border: expanded === flight.id ? "2px solid purple" : "",
              boxShadow: "1px 0 5px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.50rem",
            }}
          >
            <Card.Header
              style={{ borderBottom: "none", backgroundColor: "white" }}
              onClick={() => handleHeaderClick(flight.id)}
            >
              <Container>
                <Row>
                  <Col md={11} sm={11} xs={11}>
                    <Row>
                      {/* airline name */}
                      <Col
                        md={4}
                        sm={12}
                        className="d-flex align-items-center justify-content-center justify-content-md-start"
                      >
                        <div className="d-flex align-items-center">
                          <Image
                            src={flight.Airline.picture}
                            className="me-3"
                            style={{ width: 35 }}
                          />
                          <p style={{ marginBottom: 0 }}>
                            {flight.Airline.name} - {datafiltering.seatType}
                          </p>
                        </div>
                      </Col>
                      {/* destination info */}
                      <Col
                        md={4}
                        sm={12}
                        className="d-flex justify-content-center pt-2"
                      >
                        <FlightDestination
                          departureTime={format(
                            new Date(flight.departureAt),
                            "HH:mm"
                          )}
                          departureCity={flight.StartAirport.iataCode}
                          flightDuration={flight.duration}
                          arrivalTime={format(
                            new Date(flight.arrivalAt),
                            "HH:mm"
                          )}
                          arrivalCity={flight.EndAirport.iataCode}
                        />
                      </Col>
                      <Col
                        md={1}
                        xs={12}
                        className="d-flex align-self-center justify-content-center p-3"
                      >
                        {flight.Airline.baggage !== 0 && (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip>
                                Free {flight.Airline.baggage} baggage
                              </Tooltip>
                            }
                          >
                            <Image src={freeBaggage} alt="Free baggage" />
                          </OverlayTrigger>
                        )}
                      </Col>
                      {/* price and execute button */}
                      <Col
                        md={3}
                        sm={12}
                        className="d-flex flex-column align-items-md-end align-items-center justify-content-center "
                        style={{ padding: 0 }}
                      >
                        <h3 style={{ fontSize: 20, fontWeight: 650 }}>
                          IDR {flight["price" + datafiltering.seatType]}
                        </h3>
                        <Button
                          style={{ borderRadius: 14, width: "50%" }}
                          onClick={handleButtonClick}
                        >
                          Pilih
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={1}
                    sm={1}
                    xs={1}
                    className="d-flex justify-content-center"
                    style={{ padding: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeaderClick(flight.id);
                    }}
                  >
                    <Image
                      src={accorTrigger}
                      style={{
                        width: 25,
                        transition: "transform 0.3s",
                        transform: rotated[flight.id]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Header>
            <Accordion.Collapse eventKey={flight.id}>
              <Card.Body style={{ paddingTop: 0 }}>
                <Container>
                  <hr />
                  <DetailFlight
                    TitleDetail={"Detail Penerbangan"}
                    departureTime={format(
                      new Date(flight.departureAt),
                      "HH:mm"
                    )}
                    departureDate={format(
                      new Date(flight.departureAt),
                      "dd MMMM yyyy"
                    )}
                    departureAirport={flight.StartAirport.name}
                    departureTerminal={flight.StartAirport.terminal}
                    arrivalTime={format(new Date(flight.arrivalAt), "HH:mm")}
                    arrivalDate={format(
                      new Date(flight.arrivalAt),
                      "dd MMMM yyyy"
                    )}
                    arrivalAirport={flight.EndAirport.name}
                    arrivalTerminal={flight.EndAirport.terminal}
                    airlineName={flight.Airline.name}
                    airlineLogo={flight.Airline.picture}
                    seatClass={datafiltering.seatType}
                    airlineIataCode={flight.Airline.iataCode}
                    flightCode={flight.flightCode}
                    {...(flight.Airline.baggage !== 0 && {
                      baggage: `Baggage ${flight.Airline.baggage}`,
                    })}
                    cabinBaggage={flight.Airline.cabinBaggage}
                    additionals={flight.Airline.additionals}
                  />
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  );
};

// page status section
const TicketNotFound = () => {
  return (
    <Row
      className="justify-content-center pt-5"
      style={{ textAlign: "center" }}
    >
      <Image src={findTicketNotFound} style={{ width: 250 }} />
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
      <Image src={findTicketEmpty} style={{ width: 200 }} />
      <Row className="pt-5">
        {" "}
        <p style={{ marginBottom: 0 }}>Maaf, Tiket terjual habis!</p>
        <p>Coba cari perjalanan lainnya!</p>
      </Row>
    </Row>
  );
};

export default FindTicket;
