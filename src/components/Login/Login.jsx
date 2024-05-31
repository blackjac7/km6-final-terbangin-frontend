import React from 'react';
import { Button, Form } from 'react-bootstrap';

function Login() {
  return (

    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email/No telepon</Form.Label>
        <Form.Control type="email" placeholder="Contoh: john@gmail.com" />
      </Form.Group>

      <div><a href="#" className="float-end" style={{ paddingBottom: '13px', color: '#7126B5' }}>Lupa kata sandi</a></div>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Masukkan password" />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 mb-3" style={{ borderRadius: '12px', backgroundColor: '#7126B5' }}>
        Masuk
      </Button>

      <div className="text-center mb-3">Belum punya akun? <a href="" style={{ color: '#7126B5' }}>Daftar disini</a></div>
    </Form>
  );
};

export default Login;
