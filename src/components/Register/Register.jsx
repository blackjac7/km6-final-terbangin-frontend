import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import vector from '../../assets/Vector.png';
import '../../components/Register/register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicNama">
        <Form.Label>Fullname</Form.Label>
        <Form.Control type="text" placeholder="Nama Lengkap" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <div className="input-container">
          <Form.Control
            type="email"
            placeholder="Contoh: john@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && <img src={vector} alt="vector" className="input-icon" />}
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTelepon">
        <Form.Label>Nomor Telepon</Form.Label>
        <div className="input-container">
          <Form.Control
            type="tel"
            placeholder="+62"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phone && <img src={vector} alt="vector" className="input-icon" />}
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Buat Password</Form.Label>
        <div className="input-container">
          <Form.Control
            type="password"
            placeholder="Buat Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password && <img src={vector} alt="vector" className="input-icon" />}
        </div>
      </Form.Group>

      <Form.Group controlId="picture" className="mb-3">
        <Form.Label>Picture</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 mb-3" style={{ borderRadius: '12px', backgroundColor: '#7126B5' }}>
        Daftar
      </Button>

      <div className="text-center mb-3">Sudah punya akun?<a href="" style={{ color: '#7126B5' }}>Masuk disini</a></div>
    </Form>
  );
};

export default Register;
