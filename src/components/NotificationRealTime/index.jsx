import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import CustomToastMessage from "../ToastMessage";
import io from "socket.io-client";

const NotificationHandler = () => {
    const socket = useRef(null);

    useEffect(() => {
        // Initialize socket connection
        if (!socket.current) {
            socket.current = io(import.meta.env.VITE_SOCKET_URL, {
                reconnectionAttempts: Infinity,
                reconnectionDelay: 2000,
            });

            socket.current.on("connect", () => {
                console.log("Connected to server");
            });

            socket.current.on("disconnect", () => {
                console.log("Disconnected from server");
            });

            socket.current.on("bookingNotification", (data) => {
                console.log("Received booking notification:", data);
                toast.info(
                    <CustomToastMessage
                        message={
                            data?.message || "Received booking notification"
                        }
                        highlight={data?.highlight}
                    />,
                    {
                        containerId: "navbarToast",
                        closeOnClick: true,
                    }
                );
            });

            socket.current.on("paymentSuccess", (data) => {
                console.log("Received payment success notification:", data);
                toast.success(
                    <CustomToastMessage
                        message={
                            data?.message || "Received payment notification"
                        }
                        highlight={data?.highlight || "Order ID"}
                    />,
                    {
                        containerId: "navbarToast",
                        autoClose: 5000,
                        closeOnClick: true,
                    }
                );
            });

            socket.current.on("paymentFailed", (data) => {
                console.log("Received payment failed notification:", data);
                toast.success(
                    <CustomToastMessage
                        message={
                            data?.message || "Received payment notification"
                        }
                        highlight={data?.highlight || "Order ID"}
                    />,
                    {
                        containerId: "navbarToast",
                        autoClose: 5000,
                        closeOnClick: true,
                    }
                );
            });

            socket.current.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });
        }

        return () => {
            // Clean up socket listeners
            if (socket.current) {
                socket.current.off("bookingNotification");
                socket.current.off("paymentSuccess");
                socket.current.off("paymentFailed");
                socket.current.off("connect_error");
                socket.current.disconnect();
                socket.current = null;
            }
        };
    }, []);

    return null;
};

export default NotificationHandler;
