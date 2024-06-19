import axios from "axios";
import { toast } from "react-toastify";
import paymentReducer from "../reducers/payment";

// mendapatkan snap token dan link dari BE
export const generateSnapPayment =
    (navigate, payload) => async (dispatch, getState) => {
        const { totalPrice } = payload;

        if (!totalPrice) {
            return;
        }
        const authToken = getState().auth.token;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/api/v1/payment/`,
                JSON.stringify({ totalPrice }),
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { data } = response.data;
            const { snapToken, snapLink } = data;
            console.log(data);

            dispatch(paymentReducer.setSnapToken(snapToken));
            dispatch(paymentReducer.setSnapLink(snapLink));

            navigate("/payment");
        } catch (e) {
            removeSnapData();
            toast.error(e?.response?.data?.message);
        }
    };

export const updatePayment = (payload) => async (_, getState) => {
    const { transaction_id: paymentId } = payload;

    if (!paymentId) {
        toast.error("Payment ID must not be empty!");
        return;
    }
    const authToken = getState().auth.token;

    try {
        await axios.patch(
            `${
                import.meta.env.VITE_BACKEND_API
            }/api/v1/payment/id/${paymentId}`,
            JSON.stringify(payload),
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
};

const removeSnapData = () => (dispatch) => {
    dispatch(paymentReducer.setSnapToken(null));
    dispatch(paymentReducer.setSnapLink(null));
};
