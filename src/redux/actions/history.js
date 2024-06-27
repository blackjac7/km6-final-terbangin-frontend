import axios from "axios";
import { toast } from "react-toastify";
import { setHistoryCard, setHistoryCards } from "../reducers/history";

export const getHistoryCards = (value) => async (dispatch, getState) => {
  const { user, token } = getState().auth;
  value = value ?? "";

  try {
    const url = new URL(
      `${import.meta.env.VITE_BACKEND_API}/api/v1/helper-booking/user/${
        user.id
      }`
    );
    url.searchParams.append("value", value);


    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url.toString(),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);

    const { data } = response.data;
    console.log(data)
    dispatch(setHistoryCards(data))
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};


export const getHistoryCardDetails = (bookingId) => async (dispatch,getState) => {
  const { token } = getState().auth;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${
      import.meta.env.VITE_BACKEND_API
    }/api/v1/helper-booking/booking/${bookingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);

    const { data } = response.data;
    dispatch(setHistoryCard(data))
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

