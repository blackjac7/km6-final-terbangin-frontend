import { useState, useEffect } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import FormArea from "../../components/FormArea";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import initialSearchImage from "../../assets/Cards/b_search.png";
import clickedSearchImage from "../../assets/Cards/w_search.png";
import PropTypes from "prop-types";
import { getFlightByContinent } from "../../redux/actions/flight";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFullScreen, setIsFullScreen] = useState(window.innerWidth > 1160);

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

  return (
    <>
      {!isMobile && <Banner />}
      {/* search bar */}

      <FormArea
        isFullScreen={isFullScreen}
        isMobile={isMobile}
        title={
          <>
            Pilih Jadwal Penerbangan spesial di{" "}
            <span style={{ color: "#7126B5" }}>Terbangin!</span>
          </>
        }
      />

      <DestinationFavorit isFullScreen={isFullScreen} />
    </>
  );
};

const DestinationFavorit = ({ isFullScreen }) => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(1);
  const [sortContinent, setSortContinent] = useState("Asia");
  const { flights } = useSelector((state) => state.flight);
  const navigate = useNavigate();

  const getButtonStyle = (buttonId) => {
    return {
      backgroundColor: activeButton === buttonId ? "#7126b5" : "#e2d4f0",
      color: activeButton === buttonId ? "white" : "black",
      borderColor: activeButton === buttonId ? "#7126b5" : "#e2d4f0",
    };
  };
  const formatCurrency = (amount) => {
    return amount
      .toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace("Rp", "");
  };
  const getSourceImages = (buttonId) => {
    return activeButton === buttonId ? clickedSearchImage : initialSearchImage;
  };

  const handleClick = (buttonId, value) => {
    setActiveButton(buttonId);
    setSortContinent(value);
  };

  const getDatePlus30Days = () => {
    const today = new Date();
    const resultDate = new Date(today);
    resultDate.setDate(today.getDate() + 10);
    return resultDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };

  const navigateToFindTicket = (flight) => {
    navigate("/find-ticket", {
      state: {
        flightType: "One Way", // Assuming one-way flight type
        departure: flight.StartAirport.city,
        iataCodeDeparture: flight.StartAirport.iataCode,
        arrival: flight.EndAirport.city,
        iataCodeArrival: flight.EndAirport.iataCode,
        departureDate: moment
          .tz(flight.departureAt, flight.StartAirport.timezone)
          .format("YYYY-MM-DD"), // Format as needed
        returnDate: null,
        seatType: "Economy",
        capacity: 1,
        adult: 1,
        child: 0,
        baby: 0,
      },
    });
  };

  useEffect(() => {
    if (sortContinent !== null) {
      const datePlus30Days = getDatePlus30Days();
      console.log(
        "Dispatching getFlightByContinent with date:",
        datePlus30Days,
        "and continent:",
        sortContinent
      );
      dispatch(getFlightByContinent(datePlus30Days, sortContinent)).catch(
        (error) => {
          console.error("Error fetching flights:", error);
        }
      );
    }
  }, [dispatch, sortContinent]);

  return (
    <Container>
      <Row
        className="my-3"
        style={{ margin: isFullScreen ? "0px 120px" : "0px 0px" }}
      >
        <h4> Rekomendasi Penerbangan</h4>
        <Col md={12}>
          {[
            { id: 1, label: "Asia", value: "Asia" },
            { id: 2, label: "Amerika", value: "America" },
            { id: 3, label: "Australia", value: "Australia" },
            { id: 4, label: "Eropa", value: "Europe" },
            { id: 5, label: "Afrika", value: "Africa" },
          ].map((button) => (
            <Button
              key={button.id}
              style={getButtonStyle(button.id)}
              onClick={() => handleClick(button.id, button.value)}
              variant="secondary"
              className="me-2 mt-2"
            >
              <img
                src={getSourceImages(button.id)}
                alt={`Tombol ${button.id}`}
              />
              &nbsp;{button.label}
            </Button>
          ))}
        </Col>
      </Row>
      <Row style={{ margin: isFullScreen ? "0px 120px" : "0px 0px" }}>
        {flights.map((flight) => (
          <Col key={flight.id} md={3} sm={6} xs={6} className="mb-3">
            <Card
              onClick={() => navigateToFindTicket(flight)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                src={flight.EndAirport.picture}
                style={{ height: "auto", width: "auto" }}
              />
              <Card.Body>
                <p style={{ margin: 0 }}>
                  {flight.StartAirport.city} &rarr; {flight.EndAirport.city}
                </p>
                <p
                  style={{
                    color: "#7126b5",
                    fontWeight: "900",
                    margin: 0,
                  }}
                >
                  {flight.Airline.name}
                </p>
                <p style={{ margin: 0 }}>
                  {moment
                    .tz(flight.departureAt, flight.StartAirport.timezone)
                    .format("DD MMMM yyyy")}
                </p>
                <p>
                  Mulai dari
                  <span
                    style={{
                      color: "red",
                      margin: 0,
                      fontWeight: 700,
                    }}
                  >
                    {formatCurrency(flight.priceEconomy)}
                  </span>
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
DestinationFavorit.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
};

export default Home;
