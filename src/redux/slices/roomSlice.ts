// roomSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import roomsData from "../../data/rooms.json";
import { RootState } from "../store";
import { Room, RoomsState } from '../../types/index';

const initialState: RoomsState = {
    data: roomsData,
};

const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addRoom: (state, action: PayloadAction<Omit<Room, 'id'>>) => {
            const newId = (state.data.length > 0 ? Math.max(...state.data.map(room => parseInt(room.id))) : 0) + 1;
            const newRoom = { id: newId.toString(), ...action.payload };
            state.data = [...state.data, newRoom];
        },
        updateRoom: (state, action: PayloadAction<Room>) => {
            const index = state.data.findIndex(room => room.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        // deleteRoom: (state, action: PayloadAction<string>) => {
        //     state.data = state.data.filter(room => room.id !== action.payload);
        // }
    },
});

export const { addRoom, updateRoom } = roomSlice.actions;
export const selectAllRooms = (state: RootState) => state.rooms.data;

export default roomSlice.reducer;