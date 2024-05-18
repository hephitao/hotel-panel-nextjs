// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import hotelsData from "../../data/hotels.json";
// import { RootState } from "../store";

// export interface Hotel {
//     id: string;
//     name: string;
//     description: string;
//     rooms: string[];
//     city: string;
//     status: string;
//     imgurl: string;
// }

// interface HotelsState {
//     allHotels: Hotel[];
//     searchResults: Hotel[];
//     details: Hotel | null;
// }

// const initialState: HotelsState = {
//     allHotels: hotelsData,
//     searchResults: [],
//     details: null,
// };

// const hotelsSlice = createSlice({
//     name: "hotels",
//     initialState,
//     reducers: {
//         fetchHotelDetails: (state, action: PayloadAction<string>) => {
//             const hotelId = action.payload;
//             const hotel = state.allHotels.find((hotel) => hotel.id === hotelId);
//             if (hotel) {
//                 state.details = hotel;
//             } else {
//                 state.details = null;
//             }
//         },
//         addHotel: (state, action: PayloadAction<Hotel>) => {
//             state.allHotels.push(action.payload);
//         },
//         updateHotel: (state, action: PayloadAction<Hotel>) => {
//             const index = state.allHotels.findIndex(hotel => hotel.id === action.payload.id);
//             if (index !== -1) {
//                 state.allHotels[index] = action.payload;
//             }
//         },
//         setSearchResults: (state, action: PayloadAction<Hotel[]>) => {
//             state.searchResults = action.payload;
//         },
//     },
// });

// export const { fetchHotelDetails, addHotel, updateHotel, setSearchResults } = hotelsSlice.actions;
// export const selectAllHotels = (state: RootState) => state.hotels.allHotels;
// export const selectSearchResults = (state: RootState) => state.hotels.searchResults;

// export default hotelsSlice.reducer;

// redux/slices/hotelSlice.ts

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import hotelsData from "../../data/hotels.json";
// import { RootState } from "../store";

// export interface Hotel {
//     id: string;
//     name: string;
//     description: string;
//     rooms: string[];
//     city: string;
//     status: string;
//     imgurl: string;
// }

// interface HotelsState {
//     allHotels: Hotel[];
//     details: Hotel | null;
// }

// const initialState: HotelsState = {
//     allHotels: hotelsData,
//     details: null,
// };

// const hotelsSlice = createSlice({
//     name: "hotels",
//     initialState,
//     reducers: {
//         fetchHotelDetails: (state, action: PayloadAction<string>) => {
//             const hotelId = action.payload;
//             const hotel = state.allHotels.find((hotel) => hotel.id === hotelId);
//             if (hotel) {
//                 state.details = hotel;
//             } else {
//                 state.details = null;
//             }
//         },
//         addHotel: (state, action: PayloadAction<Hotel>) => {
//             state.allHotels.push(action.payload);
//         },
//         updateHotel: (state, action: PayloadAction<Hotel>) => {
//             const index = state.allHotels.findIndex(hotel => hotel.id === action.payload.id);
//             if (index !== -1) {
//                 state.allHotels[index] = action.payload;
//             }
//         },
//     },
// });

// export const { fetchHotelDetails, addHotel, updateHotel } = hotelsSlice.actions;
// export const selectAllHotels = (state: RootState) => state.hotels.allHotels;
// export const selectHotelDetails = (state: RootState) => state.hotels.details;

// export default hotelsSlice.reducer;

// redux/slices/hotelSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import hotelsData from "../../data/hotels.json";
import { RootState } from "../store";

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
    allHotels: Hotel[];
    details: Hotel | null;
}

const initialState: HotelsState = {
    allHotels: hotelsData,
    details: null,
};

const hotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        fetchHotelDetails: (state, action: PayloadAction<string>) => {
            const hotelId = action.payload;
            const hotel = state.allHotels.find((hotel) => hotel.id === hotelId);
            if (hotel) {
                state.details = hotel;
            } else {
                state.details = null;
            }
        },
        addHotel: (state, action: PayloadAction<Hotel>) => {
            state.allHotels.push(action.payload);
        },
        updateHotel: (state, action: PayloadAction<Hotel>) => {
            const index = state.allHotels.findIndex(hotel => hotel.id === action.payload.id);
            if (index !== -1) {
                state.allHotels[index] = action.payload;
            }
        },
    },
});

export const { fetchHotelDetails, addHotel, updateHotel } = hotelsSlice.actions;
export const selectAllHotels = (state: RootState) => state.hotels.allHotels;
export const selectHotelDetails = (state: RootState) => state.hotels.details;

export default hotelsSlice.reducer;
