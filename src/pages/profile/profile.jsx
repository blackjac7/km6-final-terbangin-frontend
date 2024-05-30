import React from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { FaUserEdit, FaCog, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';

const Profile = () => {
    return (
        <div style={{ minHeight: '100vh', paddingTop: '20px' }}>
            <Container>
                <h2 className='pt-5 pb-3'>Akun</h2>
                <div className='justify-content-center d-flex mb-2'>
                    <Button className="text-decoration-none text-start" style={{ backgroundColor: '#7126B5', width: '90%' }}>
                        <FaArrowLeft /> Beranda
                    </Button>
                </div>
            </Container>

            <Container>
                <Row className="mt-1 mx-auto" style={{ maxWidth: '800px', paddingTop:'25px' }}>
                    <Col md={4}>
                        <Nav className="flex-column justify-content-end">
                            <Nav.Link href="#" className="d-flex align-items-center" style={{ color: 'black' }}>
                                <FaUserEdit className="me-2" style={{ color: '#7126B5' }} /> Ubah Profil
                            </Nav.Link>
                            <Nav.Link href="#" className="d-flex align-items-center" style={{ color: 'black' }}>
                                <FaCog className="me-2" style={{ color: '#7126B5' }} /> Pengaturan Akun
                            </Nav.Link>
                            <Nav.Link href="#" className="d-flex align-items-center mb-3" style={{ color: 'black' }}>
                                <FaSignOutAlt className="me-2" style={{ color: '#7126B5' }} /> Keluar
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={8} style={{paddingTop:'20px'}}>
                        <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '0px', borderRadius: '8px', paddingTop:'25px', paddingLeft:'25px', paddingRight:'25px', backgroundColor: 'white'}}>
                            <h5 style={{paddingBottom:'10px', paddingLeft:'20px'}}>Ubah Data Profil</h5>
                            <div style={{ backgroundColor: '#7126B5', color: 'white', padding: '10px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', paddingLeft: '21px' }}>
                                Data diri
                            </div>
                            <div style={{ padding: '20px' }}>
                                <Form>
                                    <Form.Group controlId="formNamaLengkap" className="mb-3">
                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control type="text" placeholder="Harry" />
                                    </Form.Group>
                                    <Form.Group controlId="formNomorTelepon" className="mb-3">
                                        <Form.Label>Nomor Telepon</Form.Label>
                                        <Form.Control type="text" placeholder="+62 897823232" />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Johndoe@gmail.com" />
                                    </Form.Group>
                                    <div className="d-flex justify-content-center">
                                        <Button variant="primary" type="submit" style={{ borderRadius: '10px', backgroundColor: '#7126B5', paddingLeft: '30px', paddingRight: '30px' }}>
                                            Simpan
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;
