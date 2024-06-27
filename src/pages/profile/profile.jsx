import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { FaUserEdit, FaCog, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import profilePicture from "../../assets/undraw_male_avatar_g98d.svg";
import { logout } from "../../redux/actions/auth";
import ProfileForm from "../../components/Profile/ProfileForm";
import AccountSettingsForm from "../../components/Profile/AccountSettingsForm";
import "./profile.css";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentForm, setCurrentForm] = useState("profile");

    const handleUbahProfil = () => {
        setCurrentForm("profile");
    };

    const handlePengaturanAkun = () => {
        setCurrentForm("accountSettings");
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div style={{ minHeight: "100vh", paddingTop: "20px" }}>
            <Container>
                <h2 className="pb-3">Akun</h2>
                <div className="justify-content-center d-flex mb-2">
                    <Button
                        as={Link}
                        to={"/"}
                        className="text-decoration-none text-start"
                        style={{ width: "90%" }}
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
                    <Col md={4} className="mb-3">
                        <div
                            style={{
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                padding: "25px",
                                borderRadius: "8px",
                                backgroundColor: "white",
                                border: "1px solid #7126B5",
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

                        <Nav
                            className="flex-column justify-content-end"
                            style={{
                                border: "1px solid #7126B5",
                                borderRadius: "8px",
                                marginTop: "20px",
                            }}
                        >
                            <Nav.Link
                                className={`menu-profile d-flex align-items-center ${
                                    currentForm === "profile" ? "active" : ""
                                }`}
                                onClick={handleUbahProfil}
                                style={{
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                }}
                            >
                                <FaUserEdit className="me-2 FaUserEdit" /> Ubah
                                Profil
                            </Nav.Link>
                            <Nav.Link
                                className={`menu-profile d-flex align-items-center ${
                                    currentForm === "accountSettings"
                                        ? "active"
                                        : ""
                                }`}
                                onClick={handlePengaturanAkun}
                                style={{ borderRadius: "0px" }}
                            >
                                <FaCog className="me-2 FaCog" /> Pengaturan Akun
                            </Nav.Link>
                            <Nav.Link
                                onClick={handleLogout}
                                className="menu-profile-logout d-flex align-items-center"
                                style={{
                                    borderTopLeftRadius: "0px",
                                    borderTopRightRadius: "0px",
                                }}
                            >
                                <FaSignOutAlt className="menu-profile-logout-icon me-2" />{" "}
                                Keluar
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={8} className="mb-5">
                        {currentForm === "profile" ? (
                            <ProfileForm />
                        ) : (
                            <AccountSettingsForm />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;
