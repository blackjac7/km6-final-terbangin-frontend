import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Forget() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Masukkan Password Baru</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="***"
          />
          <InputGroup.Text
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ulangi Password Baru</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="***"
          />
          <InputGroup.Text
            onClick={toggleConfirmPasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100 mb-3"
        style={{ borderRadius: "12px", backgroundColor: "#7126B5" }}
      >
        Simpan
      </Button>
    </Form>
  );
}

export default Forget;
