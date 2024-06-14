import axios from "axios";
import { toast } from "react-toastify";
import { setFlights, setFlight } from "../reducers/flight";

export const getFlights = () => async (dispatch, getState) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/v1/flight`,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setFlights(data));
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
