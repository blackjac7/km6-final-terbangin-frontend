import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import PropTypes from "prop-types";

const BackButton = ({ ButtonText }) => {
  return (
    <Button
      href="/"
      variant="primary"
      className="d-flex flex-fill align-items-center justify-content-center justify-content-md-start py-md-3 "
      style={{
        color: "white",
        borderRadius: 14,
        justifyContent: "flex-start",
      }}
    >
      <FaArrowLeft className="me-2" />
      {"  "} {ButtonText}
    </Button>
  );
};

BackButton.propTypes = {
  text: PropTypes.string,
};

export default BackButton;
