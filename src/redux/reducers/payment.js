import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        snapToken: null,
        snapLink: null,
    },
    reducers: {
        setSnapToken: (state, action) => {
            state.snapToken = action.payload;
        },
        setSnapLink: (state, action) => {
            state.snapLink = action.payload;
        },
    },
});

export const { setSnapToken, setSnapLink } = paymentSlice.actions;

export default paymentSlice.reducer;
