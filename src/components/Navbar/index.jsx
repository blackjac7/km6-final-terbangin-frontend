import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/Logo/svg/logo-no-background.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import login from "../../assets/fi_log-in.png";
import { useEffect, useState } from "react";
import { getProfile, logout } from "../../redux/actions/auth";
import SearchIcon from "@mui/icons-material/Search";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const StyledMenuItemLogout = styled(MenuItem)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "#f44336",
        color: "#fff",
    },
    "&:active": {
        backgroundColor: "#d32f2f",
        color: "#fff",
    },
}));

function NavScrollExample() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        handleClose();
    };

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch, token]);

    return (
        <Navbar
            sticky="top"
            expand="lg"
            className="bg-body-tertiary border-bottom"
            style={{
                boxShadow: " 1px 0 10px 2px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} height={55} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex mt-2">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            style={{ borderRadius: "10px 0px 0px 10px" }}
                        />
                        <button
                            style={{
                                border: "1px solid #DEE2E6",
                                borderRadius: "0px 10px 10px 0px",
                            }}
                        >
                            <SearchIcon />
                        </button>
                    </Form>
                    {!user && (
                        <Button
                            className="d-flex ms-auto mt-2 "
                            style={{
                                backgroundColor: "#7126b5",
                                borderColor: "#7126b5",
                            }}
                            as={Link}
                            to="/login"
                        >
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <img src={login} className="me-2" />
                                Masuk
                            </span>
                        </Button>
                    )}
                    {user && (
                        <>
                            <div className="d-flex ms-auto">
                                <IconButton
                                    color="inherit"
                                    onClick={() => {
                                        navigate("/order-history");
                                        handleClose();
                                    }}
                                >
                                    <FormatListBulletedIcon />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    onClick={() => {
                                        navigate("/notifications");
                                        handleClose();
                                    }}
                                >
                                    <NotificationsNoneIcon />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    onClick={handleMenu}
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={() => {
                                        navigate("/profile");
                                        handleClose();
                                    }}
                                >
                                    Profile
                                </MenuItem>
                                <StyledMenuItemLogout onClick={handleLogout}>
                                    Logout
                                </StyledMenuItemLogout>
                            </Menu>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;
