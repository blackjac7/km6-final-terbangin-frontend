import React from 'react';
import { Button, Form } from 'react-bootstrap';

function Register() {
  return (

    <Form>
      <Form.Group className="mb-3" controlId="formBasicNama">
        <Form.Label>Fullname</Form.Label>
        <Form.Control type="text" placeholder="Nama Lengkap" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Contoh: john@gmail.com" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTelepon">
        <Form.Label>Nomor Telepon</Form.Label>
        <Form.Control type="tel" placeholder="+62" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Buat Password</Form.Label>
        <Form.Control type="password" placeholder="Buat Password" />
      </Form.Group>

      <Form.Group controlId="picture" className="mb-3">
        <Form.Label>Picture</Form.Label>
        <Form.Control type="file"/>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 mb-3" style={{ borderRadius: '12px', backgroundColor: '#7126B5' }}>
        Masuk
      </Button>

      <div className="text-center mb-3">Sudah punya akun?<a href="" style={{ color: '#7126B5' }}>Masuk disini</a></div>
    </Form>
  );
};

export default Register;
