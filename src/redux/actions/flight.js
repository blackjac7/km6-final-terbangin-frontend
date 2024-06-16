import axios from "axios";
import { setFlights } from "../reducers/flight";

export const getFilterFlights =
  (start, end, key, value, filter, order, seatType) => async (dispatch) => {
    start = start ?? "";
    end = end ?? "";
    key = key ?? "";
    value = value ?? "";
    order = order ?? "asc";
    filter = filter ?? "priceEconomy";
    seatType = seatType ?? "Economy";
    try {
      const url = new URL("http://localhost:3000/api/v1/flight/flightfilter");
      url.searchParams.append("start", start);
      url.searchParams.append("end", end);
      url.searchParams.append("key", key);
      url.searchParams.append("value", value);
      url.searchParams.append("filter", filter);
      url.searchParams.append("order", order);
      url.searchParams.append("seatType", seatType);

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url.toString(),
        headers: {},
      };

      const response = await axios.request(config);
      const { data } = response.data;

      dispatch(setFlights(data));
    } catch (error) {
      dispatch(setFlights([]));
      console.error("Error fetching flights:", error);
    }
  };
