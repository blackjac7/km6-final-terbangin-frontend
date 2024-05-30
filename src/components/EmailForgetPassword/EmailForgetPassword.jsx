import React from 'react';
import { Button, Form } from 'react-bootstrap';

function EmailForgeted() {
  return (

    <Form>
      <Form.Group className="mb-5" controlId="formBasicEmail">
        <Form.Label>Masukkan Email</Form.Label>
        <Form.Control type="email" placeholder="Contoh: john@gmail.com" />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 mb-3" style={{ borderRadius: '12px', backgroundColor: '#7126B5' }}>
        Masuk
      </Button>

    </Form>
  );
};

export default EmailForgeted;
