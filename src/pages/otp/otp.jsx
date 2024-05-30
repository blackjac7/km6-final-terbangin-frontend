import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const Otp = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [resendTimer, setResendTimer] = useState(60);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleResend = () => {
        // Logika untuk mengirim ulang OTP di sini

        // Mengatur ulang timer kirim ulang
        setResendTimer(60);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (resendTimer > 0) {
                setResendTimer(prevTimer => prevTimer - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row>
                <Col>
                    <div className='d-flex align-items-center pb-5'>
                        <Button variant="link" className="text-decoration-none">
                            <FaArrowLeft style={{ color: 'black' }} />
                        </Button>
                        <h2 className="text-start mb-0 ms-2" >Masukkan OTP</h2>
                    </div>
                    <p className='pb-3 text-center'>Ketik 6 digit kode yang dikirimkan ke <strong>j*****@gmail.com</strong></p>
                    <div className="d-flex justify-content-center mb-3">
                        {otp.map((data, index) => {
                            return (
                                <input
                                    className="otp-field"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        margin: '0 5px',
                                        textAlign: 'center',
                                        fontSize: '20px',
                                        borderRadius: '16px',
                                        border: '1px solid #ccc',
                                        backgroundColor: 'white',
                                        boxShadow: '0 0 0 1px #ccc inset',
                                        color: 'black',
                                    }}
                                />
                            );
                        })}
                    </div>
                    <p className='pb-3 text-center'>Kirim Ulang OTP dalam {resendTimer} detik</p>
                    <Button variant="primary" className="w-100" style={{ backgroundColor: '#7126B5', borderColor: '#7126B5', borderRadius: '16px', }} onClick={handleResend}>
                        Kirim Ulang OTP
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Otp;
