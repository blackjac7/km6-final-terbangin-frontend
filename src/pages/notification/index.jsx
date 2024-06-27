import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Dropdown,
    ListGroup,
    Modal,
} from "react-bootstrap";
import { FaCircle, FaArrowLeft, FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    getNotificationByUserId,
    readNotification,
} from "../../redux/actions/notification";

const NotificationPage = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user?.id);
    const notifications = useSelector(
        (state) => state.notification.notifications
    );

    const [filterStatus, setFilterStatus] = useState("all");
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (userId) {
            dispatch(getNotificationByUserId(userId));
        }
    }, [dispatch]);

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    const handleNotificationClick = (notif) => {
        setSelectedNotification(notif);
        setModalVisible(true);
        dispatch(readNotification(notif.id));
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedNotification(null);
    };

    const filteredNotifications = notifications
        .filter((notif) => {
            if (filterStatus === "false") {
                return !notif.statusRead;
            } else if (filterStatus === "true") {
                return notif.statusRead;
            }
            return true;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h2 className="fw-bold mb-3">Notifikasi</h2>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Button
                            size="lg"
                            href="/"
                            className="text-start w-100"
                            style={{
                                borderRadius: "10px",
                                backgroundColor: "#7126b5",
                                borderColor: "#7126b5",
                            }}
                        >
                            <FaArrowLeft className="me-3" />
                            Beranda
                        </Button>
                        <div className="d-flex align-items-center">
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="outline-secondary"
                                    className="me-3 px-4 ms-2"
                                    style={{
                                        borderRadius: "40px",
                                        width: "200px",
                                    }}
                                >
                                    <FaFilter className="me-2" />
                                    Filter
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() =>
                                            handleFilterChange("all")
                                        }
                                    >
                                        Semua
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            handleFilterChange("false")
                                        }
                                    >
                                        Belum Dibaca
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            handleFilterChange("true")
                                        }
                                    >
                                        Sudah Dibaca
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup style={{ cursor: "pointer" }}>
                        {filteredNotifications.map((notif, index) => (
                            <ListGroup.Item
                                key={index}
                                className="d-flex flex-column flex-md-row justify-content-between align-items-start p-3"
                                style={{
                                    backgroundColor:
                                        hoveredIndex === index
                                            ? "#f0f0f0"
                                            : "transparent",
                                    transition: "background-color 0.3s ease",
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => handleNotificationClick(notif)}
                            >
                                <div className="me-md-2 mb-2 mb-md-0">
                                    <div className="fw-regular">
                                        {notif.title}
                                    </div>
                                    <div className="fw-bold">
                                        {notif.message}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="text-md-end me-2">
                                        {new Date(
                                            notif.createdAt
                                        ).toLocaleString()}
                                    </div>
                                    {!notif.statusRead && (
                                        <FaCircle size={10} color="green" />
                                    )}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            {selectedNotification && (
                <Modal show={modalVisible} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedNotification.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{selectedNotification.message}</Modal.Body>
                </Modal>
            )}
        </Container>
    );
};

export default NotificationPage;
