import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import roomsData from "../../data/rooms.json";
import { RootState } from "../store";

export interface Room {
    id: string;
    //hotelId: string;
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
            const newId = state.data.reduce((maxId, room) => Math.max(parseInt(room.id), maxId), 0) + 1;
            state.data.push({ id: newId.toString(), ...action.payload });
        },
        updateRoom: (state, action: PayloadAction<Room>) => {
            const index = state.data.findIndex(room => room.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        deleteRoom: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(room => room.id !== action.payload);
        },
    },
});

export const { addRoom, updateRoom, deleteRoom } = roomSlice.actions;
export const selectAllRooms = (state: RootState) => state.rooms.data;
// export const selectRoomsByHotelId = (state: RootState, hotelId: string) =>
//     state.rooms.data.filter(room => room.hotelId === hotelId);

export default roomSlice.reducer;
