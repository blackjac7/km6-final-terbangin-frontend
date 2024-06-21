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

export const getNotification = (navigate, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/api/v1/notification/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setNotification(data));
  } catch (error) {
    toast.error(error?.response?.data?.message);
    navigate("/");
  }
};
