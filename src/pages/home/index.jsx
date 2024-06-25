import { useState, useEffect } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import FormArea from "../../components/FormArea";

import Banner from "../../components/Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import initialSearchImage from "../../assets/Cards/b_search.png";
import clickedSearchImage from "../../assets/Cards/w_search.png";
import PropTypes from "prop-types";
import { getDestinations } from "../../redux/actions/home";
import { useDispatch } from "react-redux";

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
  const [activeButton, setActiveButton] = useState(null);

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

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch]);

  return (
    <Container>
      <Row
        className="my-3"
        style={{ margin: isFullScreen ? "0px 120px" : "0px 0px" }}
      >
        <h4>Destinasi Favorit</h4>
        <Col md={12}>
          {[
            { id: 1, label: "Semua" },
            { id: 2, label: "Asia" },
            { id: 3, label: "Amerika" },
            { id: 4, label: "Australia" },
            { id: 5, label: "Eropa" },
            { id: 6, label: "Afrika" },
          ].map((button) => (
            <Button
              key={button.id}
              style={getButtonStyle(button.id)}
              onClick={() => handleClick(button.id)}
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
        {Array.from({ length: 10 }).map((_, index) => (
          <Col key={index} md={3} sm={6} xs={6} className="mb-3">
            <Card>
              <Card.Img
                src="src/assets/Cards/Frame 152.png"
                style={{ height: "auto", width: "auto" }}
              />
              <Card.Body>
                <p style={{ margin: 0 }}>Jakarta &rarr; Bangkok</p>
                <p
                  style={{
                    color: "#7126b5",
                    fontWeight: "900",
                    margin: 0,
                  }}
                >
                  AirAsia
                </p>
                <p style={{ margin: 0 }}>20 - 30 Maret 2023</p>
                <p>
                  Mulai dari IDR&nbsp;
                  <span
                    style={{
                      color: "red",
                      margin: 0,
                      fontWeight: 700,
                    }}
                  >
                    950.000
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
