import { createSlice } from "@reduxjs/toolkit";

// initial state

const initialState = {
  flights: [],
  flight: null,
};

// define the slice
const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setFlight: (state, action) => {
      state.flight = action.payload;
    },
  },
});

// exoirt the setter function
export const { setFlights, setFlight } = flightSlice.actions;

// export the reducer
export default flightSlice.reducer;
