import axios from "axios";
import { toast } from "react-toastify";
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
            const url = new URL(
                `${import.meta.env.VITE_BACKEND_API}/api/v1/flight/flightfilter`
            );
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

export const getFlightById = (id) => async () => {
    let config = {
        method: "get",
        url: `${import.meta.env.VITE_BACKEND_API}/api/v1/flight/id/${id}`,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await axios.request(config);

        const { data } = response.data;
        console.log(data);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};
