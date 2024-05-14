import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  roomId: string;
  roomName: string;
  checkinDate: string;
  checkoutDate: string;
}

interface BookingsState {
  data: Booking[];
}

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
