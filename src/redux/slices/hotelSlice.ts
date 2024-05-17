import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import hotelsData from "../../data/hotels.json";
import { RootState } from "../store"; // Asegúrate de importar RootState desde el archivo correcto

export interface Hotel {
    id: string;
    name: string;
    description: string;
    rooms: string[];
    city: string;
    status: string;
    imgurl: string;
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
        addHotel: (state, action: PayloadAction<Hotel>) => {
            state.data.push(action.payload);
        },
    },
});

export const { fetchHotelDetails, addHotel } = hotelsSlice.actions;

// Selector para obtener los hoteles del estado
export const selectHotels = (state: RootState) => state.hotels.data;

export default hotelsSlice.reducer;
