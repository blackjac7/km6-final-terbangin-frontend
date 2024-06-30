import { useEffect } from "react";
import { toast } from "react-toastify";
import CustomToastMessage from "../../components/ToastMessage";
import io from "socket.io-client";

const PaymentNotification = () => {
    const socket = io(import.meta.env.VITE_SOCKET_URL);
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        socket.on("paymentSuccess", (data) => {
            console.log("Received payment success notification:", data);

            toast.success(
                <CustomToastMessage
                    message={data?.message || "Received booking notification"}
                    highlight={data?.order_id || "Order ID"}
                />,
                {
                    containerId: "navbarToast",
                    autoClose: 5000,
                    closeOnClick: true,
                }
            );
        });
        return () => {
            socket.off("paymentSuccess");
            socket.disconnect();
        };
    }, [socket]);

    return null;
};

export default PaymentNotification;
