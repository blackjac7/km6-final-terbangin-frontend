import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, Card, Button } from 'react-bootstrap';
import { Breadcrumbs, Link } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DetailFlight from '../../components/FlightDetail';
import HeaderShadow from '../../components/HeaderShadow';



const BookingForm = () => {
    const [showFamilyDataOrders, setShowFamilyDataOrders] = useState(false);
    const [showFamilyDataPassengers, setShowFamilyDataPassengers] = useState(false);
    const [showDataPassengers, setShowDataPassengers] = useState(false);
    const [totalSeats] = useState(90);
    const [seatCols] = useState(6);
    const [seatRows, setSeatRows] = useState(Math.ceil(totalSeats / seatCols));
    const [seats, setSeats] = useState(
        Array(seatRows).fill(null).map((_, rowIndex) => (
            Array(seatCols).fill(null).map((_, colIndex) => ({
                isSelected: false,
                color: 'white',
                number: `${rowIndex + 1}${String.fromCharCode(97 + colIndex)}`,
            }))
        ))
    );
    const [loading, setLoading] = useState(false);
    const [showFlightDetails, setShowFlightDetails] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [seatsConfirmed, setSeatsConfirmed] = useState(false);
    const [showNotif, setShowNotif] = useState(false);

    const handleSwitchChange = () => {
        setShowFamilyDataOrders(!showFamilyDataOrders);
    };

    const handleSwitchChanges = () => {
        setShowFamilyDataPassengers(!showFamilyDataPassengers);
    };

    const handleSwitch = () => {
        setShowDataPassengers(!showDataPassengers);
    };


    useEffect(() => {
        const timer = setInterval(() => {

        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSeatClick = (rowIndex, colIndex) => {
        if (seatsConfirmed) return;

        setSeats(prevSeats => {
            return prevSeats.map((row, rIdx) => {
                return row.map((seat, cIdx) => {
                    if (rIdx === rowIndex && cIdx === colIndex) {
                        const newColor = seat.isSelected ? 'white' : determineSeatColor(rowIndex, colIndex);
                        return {
                            ...seat,
                            isSelected: !seat.isSelected,
                            color: newColor,
                        };
                    }
                    return seat;
                });
            });
        });
    };



    const determineSeatColor = (rowIndex, colIndex) => {
        const seatIndex = rowIndex * seatCols + colIndex;
        if (seatIndex < 6) {
            return 'purple';
        } else if (seatIndex < 24) {
            return 'blue';
        } else {
            return 'green';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!seats.some(row => row.some(seat => seat.isSelected))) {
            toast.error('Silahkan pilih kursi terlebih dahulu.');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowFlightDetails(true);
            setShowNotif(true);
            setIsSaved(true);
            setSeatsConfirmed(true);
            toast.success('Data berhasil disimpan.');
            window.scrollTo(0, 0);
        }, 1000);
    };

    return (
        <>
            <HeaderShadow>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    className="pt-4 pb-4"
                    aria-label="breadcrumb"
                    style={{ fontWeight: "700", fontSize: "23px", color: "black" }}
                >
                    <Link underline="hover" key="1" color="inherit" href="">
                        Isi Data Diri
                    </Link>
                    ,
                    <Link underline="hover" key="2" color="inherit" href="/payment" style={{ fontWeight: 300 }}>
                        Bayar
                    </Link>
                    ,
                    <Link
                        underline="hover"
                        key="3"
                        color="inherit"
                        style={{ fontWeight: 300 }}
                    >
                        Selesai
                    </Link>
                    ,
                </Breadcrumbs>
            </HeaderShadow>
            <Container>
                <Row>
                    <Col md={8}>
                        <Card className="mb-4 mt-5">
                            <h4 className="mb-0" style={{ marginLeft: '18px', marginTop: '15px' }}>Isi Data Pemesan</h4>
                            <Card.Body>
                                <Form>
                                    <div style={{ backgroundColor: '#343a40', padding: '10px', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                        <h6 className="mb-0" style={{ marginLeft: '4px' }}>Data Diri Pemesan</h6>
                                    </div>
                                    <div style={{ padding: '10px' }}>
                                        <Form.Group controlId="formFullName" className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Nama Lengkap</Form.Label>
                                            <Form.Control type="text" placeholder="Harry" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group className="mt-2 d-flex align-items-center">
                                            <Form.Label className="mb-0 me-auto">Punya Nama Keluarga?</Form.Label>
                                            <Form.Check
                                                type="switch"
                                                checked={showFamilyDataOrders}
                                                onChange={handleSwitchChange}
                                            />
                                        </Form.Group>

                                        {showFamilyDataOrders && (
                                            <>
                                                <Form.Group controlId="formLastName" className="mt-3">
                                                    <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Nama Keluarga</Form.Label>
                                                    <Form.Control type="text" placeholder="Potter" readOnly={isSaved} />
                                                </Form.Group>
                                            </>
                                        )}

                                        <Form.Group controlId="formPhone" className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Nomor Telepon</Form.Label>
                                            <Form.Control type="text" placeholder="+62" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group controlId="formEmail" className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Contoh: johndoe@gmail.com" readOnly={isSaved} />
                                        </Form.Group>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <h4 className="mb-0" style={{ marginLeft: '18px', marginTop: '15px' }}>Isi Data Penumpang</h4>
                            <Card.Body>
                                <Form>
                                    <div style={{ backgroundColor: '#343a40', padding: '10px', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                        <h6 className="mb-0" style={{ marginLeft: '4px' }}>Data Diri Penumpang 1 - Adult</h6>
                                    </div>
                                    <div style={{ padding: '10px' }}>
                                        <Form.Group>
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold', paddingTop: '8px' }}>Title</Form.Label>
                                            <Form.Control as="select" readOnly={isSaved}>
                                                <option>Mr.</option>
                                                <option>Mrs.</option>
                                                <option>Miss</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Nama Lengkap</Form.Label>
                                            <Form.Control type="text" placeholder="Harry" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group className="mt-2 d-flex align-items-center">
                                            <Form.Label className="mb-0 me-auto">Punya Nama Keluarga?</Form.Label>
                                            <Form.Check
                                                type="switch"
                                                checked={showFamilyDataPassengers}
                                                onChange={handleSwitchChanges}
                                            />
                                        </Form.Group>

                                        {showFamilyDataPassengers && (
                                            <>
                                                <Form.Group className="mt-3">
                                                    <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Nama Keluarga</Form.Label>
                                                    <Form.Control type="text" placeholder="Potter" readOnly={isSaved} />
                                                </Form.Group>
                                            </>
                                        )}
                                        <Form.Group className="mt-3 position-relative">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Tanggal Lahir</Form.Label>
                                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                <Form.Control
                                                    id="dateOfBirth1"
                                                    type="date"
                                                    style={{ paddingRight: '2.5rem', flex: 1 }}
                                                    readOnly={isSaved}
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Kewarganegaraan</Form.Label>
                                            <Form.Control type="text" placeholder="Indonesia" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>KTP/Passport</Form.Label>
                                            <Form.Control type="text" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Negara Penerbit</Form.Label>
                                            <Form.Control type="text" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group className="mt-3 position-relative">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Berlaku Sampai</Form.Label>
                                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                <Form.Control
                                                    id="dateOfExpiry1"
                                                    type="date"
                                                    style={{ paddingRight: '2.5rem', flex: 1 }}
                                                    readOnly={isSaved}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </Form>
                                <Form style={{ paddingTop: '30px' }}>
                                    <div style={{ backgroundColor: '#343a40', padding: '10px', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                        <h6 className="mb-0" style={{ marginLeft: '4px' }}>Data Diri Penumpang 2 - Adult</h6>
                                    </div>
                                    <div style={{ padding: '10px' }}>
                                        <Form.Group>
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold', paddingTop: '8px' }}>Title</Form.Label>
                                            <Form.Control as="select" readOnly={isSaved}>
                                                <option>Mr.</option>
                                                <option>Mrs.</option>
                                                <option>Miss</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Nama Lengkap</Form.Label>
                                            <Form.Control type="text" placeholder="Harry" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group className="mt-2 d-flex align-items-center">
                                            <Form.Label className="mb-0 me-auto">Punya Nama Keluarga?</Form.Label>
                                            <Form.Check
                                                type="switch"
                                                checked={showDataPassengers}
                                                onChange={handleSwitch}
                                            />
                                        </Form.Group>

                                        {showDataPassengers && (
                                            <>
                                                <Form.Group className="mt-3">
                                                    <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Nama Keluarga</Form.Label>
                                                    <Form.Control type="text" placeholder="Potter" readOnly={isSaved} />
                                                </Form.Group>
                                            </>
                                        )}
                                        <Form.Group className="mt-3 position-relative">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Tanggal Lahir</Form.Label>
                                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                <Form.Control
                                                    id="dateOfBirth2"
                                                    type="date"
                                                    style={{ paddingRight: '2.5rem', flex: 1 }}
                                                    readOnly={isSaved}
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Kewarganegaraan</Form.Label>
                                            <Form.Control type="text" placeholder="Indonesia" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>KTP/Passport</Form.Label>
                                            <Form.Control type="text" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group className="mt-3">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Negara Penerbit</Form.Label>
                                            <Form.Control type="text" readOnly={isSaved} />
                                        </Form.Group>

                                        <Form.Group className="mt-3 position-relative">
                                            <Form.Label style={{ color: '#7126B5', fontWeight: 'bold' }}>Berlaku Sampai</Form.Label>
                                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                <Form.Control
                                                    id="dateOfExpiry2"
                                                    type="date"
                                                    style={{ paddingRight: '2.5rem', flex: 1 }}
                                                    readOnly={isSaved}
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <h4 className="mb-0" style={{ marginLeft: '18px', marginTop: '15px' }}>Pilih Kursi</h4>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <div style={{ backgroundColor: '#343a40', padding: '10px', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                        <h6 className="mb-0" style={{ marginLeft: '4px' }}>Economy - 90 Seat Available</h6>
                                    </div>
                                    <div style={{ padding: '50px' }}>
                                        {seats.map((row, rowIndex) => (
                                            <div key={rowIndex} className="d-flex justify-content-center">
                                                {row.map((seat, colIndex) => (
                                                    <React.Fragment key={colIndex}>
                                                        <Button
                                                            className={`seat ${seat.isSelected ? "selected" : ""}`}
                                                            onClick={() => handleSeatClick(rowIndex, colIndex)}
                                                            style={{
                                                                width: "40px",
                                                                top: "5px",
                                                                height: "40px",
                                                                margin: "3px",
                                                                textAlign: "center",
                                                                fontSize: "16px",
                                                                borderRadius: "8px",
                                                                border: "1px solid #ccc",
                                                                backgroundColor: seat.isSelected ? seat.color : "white",
                                                                color: seat.isSelected ? "white" : "black",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                cursor: seatsConfirmed ? "not-allowed" : "pointer",
                                                                position: "relative",
                                                            }}
                                                            disabled={seatsConfirmed}
                                                        >
                                                            {seat.isSelected ? "" : ""}
                                                            <span style={{ fontSize: "10px", marginTop: "3px" }}>
                                                                {`${(rowIndex + 1).toString().padStart(2, '0')}${String.fromCharCode(65 + colIndex)}`}
                                                            </span>
                                                            {rowIndex === 0 && (
                                                                <div
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "-40px",
                                                                        width: "100%",
                                                                        textAlign: "center",
                                                                        fontSize: "18px",
                                                                        color: "gray",
                                                                    }}
                                                                >
                                                                    {String.fromCharCode(65 + colIndex)}
                                                                </div>
                                                            )}
                                                        </Button>
                                                        {(colIndex === 2) && (
                                                            <Button
                                                                className="seat-number-button"
                                                                style={{
                                                                    width: "40px",
                                                                    height: "40px",
                                                                    margin: "7px",
                                                                    textAlign: "center",
                                                                    fontSize: "16px",
                                                                    borderRadius: "8px",
                                                                    border: "none",
                                                                    backgroundColor: "transparent",
                                                                    color: "black",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    cursor: "not-allowed",
                                                                    position: "relative",
                                                                }}
                                                                disabled
                                                            >
                                                                {`${(rowIndex + 1).toString().padStart(2, '0')}`}
                                                            </Button>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        ))}
                                    </div>

                                </Form>
                            </Card.Body>
                        </Card>
                        <div style={{ paddingBottom: "40px" }}>
                            <Button
                                type="submit"
                                className="btn-primary"
                                disabled={loading || seatsConfirmed}
                                onClick={handleSubmit}
                                style={{ marginTop: "20px", width: "100%", paddingTop: "20px", paddingBottom: "20px", borderRadius: "17px", backgroundColor: "#7126B5" }}
                            >
                                {loading ? "Loading..." : "Simpan"}
                            </Button>
                        </div>
                    </Col>

                    <Col md={4}>
                        <Card className="mb-4 mt-5">
                            <h4 className="mb-0" style={{ marginLeft: '18px', marginTop: '15px' }}>Detail Penerbangan</h4>
                            <Card.Body>
                                <DetailFlight
                                    departTime="08:00"
                                    arrivalTime="10:00"
                                    from="CGK"
                                    to="PKU"
                                    flightCode="GA 123"
                                    classType="Ekonomi"
                                    price="1300000"
                                    duration="2 Jam"
                                    selectedDate="22 Oktober 2022"
                                />
                            </Card.Body>
                        </Card>
                        {showFlightDetails && (
                            <div>
                                <Button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={loading || seatsConfirmed}
                                    style={{ marginTop: "20px", width: "100%", paddingTop: "20px", paddingBottom: "20px", borderRadius: "17px", backgroundColor: "#7126B5" }}
                                >
                                    {loading ? "Loading..." : "Lanjut Bayar"}
                                </Button>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default BookingForm;
