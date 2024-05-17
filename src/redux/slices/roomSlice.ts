import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import roomsData from "../../data/rooms.json";

export interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    status: string;
    imgurl?: string;
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
    reducers: {
        addRoom: (state, action: PayloadAction<Omit<Room, 'id'>>) => {
            // Encuentra el ID máximo actual y suma 1 para el nuevo ID
            const newId = state.data.reduce((maxId, room) => Math.max(parseInt(room.id), maxId), 0) + 1;
            // Agrega la nueva habitación con el nuevo ID convertido a string
            state.data.push({ id: newId.toString(), ...action.payload });
        },
    },
});

export const { addRoom } = roomSlice.actions;
export default roomSlice.reducer;
