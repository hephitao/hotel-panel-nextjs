import { createSlice } from "@reduxjs/toolkit";
import roomsData from "../../data/rooms.json";

interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
}

interface RoomsState {
    data: Room[];
}

const initialState: RoomsState = {
    data: roomsData,
};

const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
});

export default roomSlice.reducer;
