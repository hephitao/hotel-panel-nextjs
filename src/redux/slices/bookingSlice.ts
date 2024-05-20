import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingsState } from '../../types/index';

const initialState: BookingsState = {
  data: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    bookRoom: (
      state,
      action: PayloadAction<{
        hotelId: string;
        roomId: string;
        checkinDate: string;
        checkoutDate: string;
      }>
    ) => {
      const { hotelId, roomId, checkinDate, checkoutDate } = action.payload;
      const hotelName =
        state.data.find((booking) => booking.hotelId === hotelId)?.hotelName ||
        "";
      const roomName =
        state.data.find((booking) => booking.roomId === roomId)?.roomName || "";

      state.data.push({
        id: roomId,
        hotelId,
        hotelName,
        roomId,
        roomName,
        checkinDate,
        checkoutDate,
      });
    },
  },
});

export const { bookRoom } = bookingsSlice.actions;
export default bookingsSlice;
