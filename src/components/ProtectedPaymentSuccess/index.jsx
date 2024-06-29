import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedPaymentSuccess({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const snapToken = query.get("snapToken");

        if (!snapToken) {
            navigate("/");
        }
    }, [navigate]);

    return children;
}
