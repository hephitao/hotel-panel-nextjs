import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import hotelsData from "../../data/hotels.json";

export interface Hotel {
    id: string;
    name: string;
    description: string;
    rooms: string[];
    city: string;
}

interface HotelsState {
    data: Hotel[];
    details: Hotel | null;
}

const initialState: HotelsState = {
    data: hotelsData,
    details: null,
};

const hotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        fetchHotelDetails: (state, action: PayloadAction<string>) => {
            const hotelId = action.payload;
            const hotel = state.data.find((hotel) => hotel.id === hotelId);
            if (hotel) {
                state.details = hotel;
            } else {
                state.details = null;
            }
        },
    },
});

export const { fetchHotelDetails } = hotelsSlice.actions;
export default hotelsSlice;
