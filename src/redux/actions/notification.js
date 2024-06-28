import axios from "axios";
import { toast } from "react-toastify";
import { setNotifications, setNotification } from "../reducers/notification";

export const getNotifications = () => async (dispatch, getState) => {
    const { token } = getState().auth;

    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_API}/api/v1/notification`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.request(config);
        const { data } = response.data;

        dispatch(setNotifications(data));
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};
export const getNotificationByUserId =
    (userId) => async (dispatch, getState) => {
        const { token } = getState().auth;

        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${
                import.meta.env.VITE_BACKEND_API
            }/api/v1/notification/user/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.request(config);
            const { data } = response.data;

            dispatch(setNotifications(data));
        } catch (error) {
            toast.info("Tidak ada notifikasi");
        }
    };

export const readNotification = (id) => async (dispatch, getState) => {
    const { token } = getState().auth;

    let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${
            import.meta.env.VITE_BACKEND_API
        }/api/v1/notification/${id}/read`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.request(config);
        const { data } = response.data;

        dispatch(setNotification(data));
        dispatch(getNotificationByUserId(data.userId));
    } catch (error) {
        toast.error(error.response.data.message);
    }
};
