import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { FaUserEdit, FaCog, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import profilePicture from "../../assets/undraw_male_avatar_g98d.svg";
import { updateProfile } from "../../redux/actions/profile";
import { useState, useEffect } from "react";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState();
    const [loading, setLoading] = useState(false);

    const handleUbahProfil = () => {
        const buttonSimpan = document.querySelector(".profile-button-simpan");
        const formControls = document.querySelectorAll(".form-control");
        formControls.forEach((control) => {
            control.disabled = false;
        });
        buttonSimpan.style.display = "block";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("handle", fullName, phoneNumber, email, picture);
        dispatch(
            updateProfile(fullName, phoneNumber, email, picture, setLoading)
        );
        const buttonSimpan = document.querySelector(".profile-button-simpan");
        const formControls = document.querySelectorAll(".form-control");
        formControls.forEach((control) => {
            control.disabled = true;
        });
        buttonSimpan.style.display = "none";
    };

    useEffect(() => {
        if (user) {
            setFullName(user?.fullName || "");
            setPhoneNumber(user?.phoneNumber || "");
            setEmail(user?.email || "");
            setPicture(user?.picture || "");
        }
    }, [user]);

    return (
        <div style={{ minHeight: "100vh", paddingTop: "20px" }}>
            <Container>
                <h2 className="pt-5 pb-3">Akun</h2>
                <div className="justify-content-center d-flex mb-2">
                    <Button
                        as={Link}
                        to={"/"}
                        className="text-decoration-none text-start"
                        style={{ backgroundColor: "#7126B5", width: "90%" }}
                    >
                        <FaArrowLeft /> Beranda
                    </Button>
                </div>
            </Container>

            <Container>
                <Row
                    className="mt-1 mx-auto"
                    style={{ maxWidth: "800px", paddingTop: "25px" }}
                >
                    <Col md={4}>
                        <div
                            style={{
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                padding: "25px",
                                borderRadius: "8px",
                                backgroundColor: "white",
                            }}
                        >
                            <img
                                src={
                                    user?.picture
                                        ? user?.picture
                                        : profilePicture
                                }
                                alt="profile"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            />
                        </div>

                        <Nav className="flex-column justify-content-end">
                            <Nav.Link
                                className="d-flex align-items-center"
                                style={{ color: "black" }}
                                onClick={handleUbahProfil}
                            >
                                <FaUserEdit
                                    className="me-2"
                                    style={{ color: "#7126B5" }}
                                />{" "}
                                Ubah Profil
                            </Nav.Link>
                            <Nav.Link
                                href="#"
                                className="d-flex align-items-center"
                                style={{ color: "black" }}
                            >
                                <FaCog
                                    className="me-2"
                                    style={{ color: "#7126B5" }}
                                />{" "}
                                Pengaturan Akun
                            </Nav.Link>
                            <Nav.Link
                                href="#"
                                className="d-flex align-items-center mb-3"
                                style={{ color: "black" }}
                            >
                                <FaSignOutAlt
                                    className="me-2"
                                    style={{ color: "#7126B5" }}
                                />{" "}
                                Keluar
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={8} style={{ paddingTop: "20px" }}>
                        <div
                            style={{
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                padding: "0px",
                                borderRadius: "8px",
                                paddingTop: "25px",
                                paddingLeft: "25px",
                                paddingRight: "25px",
                                backgroundColor: "white",
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#7126B5",
                                    color: "white",
                                    padding: "10px",
                                    borderTopLeftRadius: "8px",
                                    borderTopRightRadius: "8px",
                                    paddingLeft: "21px",
                                }}
                            >
                                Data diri
                            </div>
                            <div style={{ padding: "20px" }}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group
                                        controlId="formNamaLengkap"
                                        className="mb-3"
                                    >
                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={fullName}
                                            onChange={(e) =>
                                                setFullName(e.target.value)
                                            }
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        controlId="formNomorTelepon"
                                        className="mb-3"
                                    >
                                        <Form.Label>Nomor Telepon</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={phoneNumber}
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        controlId="formEmail"
                                        className="mb-3"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        controlId="picture"
                                        className="mb-3"
                                    >
                                        <Form.Label>Foto Profil</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={(e) =>
                                                setPicture(e.target.files[0])
                                            }
                                            disabled
                                        />
                                    </Form.Group>
                                    <div
                                        className="d-flex justify-content-center"
                                        style={{
                                            paddingTop: "20px",
                                        }}
                                    >
                                        <Button
                                            className="profile-button-simpan"
                                            variant="primary"
                                            type="submit"
                                            style={{
                                                borderRadius: "10px",
                                                backgroundColor: "#7126B5",
                                                paddingLeft: "30px",
                                                paddingRight: "30px",
                                                display: "none",
                                            }}
                                            disabled={loading}
                                        >
                                            {loading ? "Loading..." : "Simpan"}
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
