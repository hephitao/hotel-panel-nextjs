import { configureStore, Store } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bookingsSlice from "./slices/bookingSlice";
import hotelsSlice from "./slices/hotelSlice";
import roomSlice from "./slices/roomSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        hotels: hotelsSlice,
        rooms: roomSlice,
        search: searchSlice,
        bookings: bookingsSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

declare global {
  interface Window {
    store: Store;
  }
}

if (process.env.NODE_ENV === 'development') {
    window.store = store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;