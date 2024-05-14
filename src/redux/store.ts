import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import bookingsSlice from "./slices/bookingSlice";
import hotelsSlice from "./slices/hotelSlice";
import roomSlice from "./slices/roomSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        hotels: hotelsSlice.reducer,
        rooms: roomSlice,
        search: searchSlice,
        bookings: bookingsSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
