import axios from "axios";
import { toast } from "react-toastify";

export const createBooking = (data) => async (dispatch, getState) => {
    const { user, token } = getState().auth;

    let config = {
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_API}/api/v1/booking`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
    };

    try {
        const response = await axios.request(config);
        const { data } = response.data;
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};
