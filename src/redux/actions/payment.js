import axios from "axios";
import { toast } from "react-toastify";

export const createPayment = (totalPrice) => async (dispatch, getState) => {
    const { user, token } = getState().auth;
    const data = JSON.stringify({
        totalPrice,
    });

    let config = {
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_API}/api/v1/payment`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data,
    };

    try {
        const response = await axios.request(config);
        const { data } = response.data;
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};
