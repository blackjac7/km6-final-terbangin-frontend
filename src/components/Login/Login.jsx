import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // You can use react-icons for the eye icon

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email/No telepon</Form.Label>
        <Form.Control type="email" placeholder="Contoh: john@gmail.com" />
      </Form.Group>

      <div><a href="#" className="float-end" style={{ paddingBottom: '13px', color: '#7126B5' }}>Lupa kata sandi</a></div>

      <Form.Group className="mb-3" controlId="formBasicPassword" style={{ position: 'relative' }}>
        <Form.Label>Password</Form.Label>
        <div style={{ position: 'relative' }}>
          <Form.Control
            type={passwordVisible ? "text" : "password"}
            placeholder="Masukkan password"
            style={{ paddingRight: '40px' }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              fontSize: '1.2em',
              color: '#7126B5'
            }}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 mb-3" style={{ borderRadius: '12px', backgroundColor: '#7126B5' }}>
        Masuk
      </Button>

      <div className="text-center mb-3">Belum punya akun? <a href="" style={{ color: '#7126B5' }}>Daftar disini</a></div>
    </Form>
  );
}

export default Login;
