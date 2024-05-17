import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BookingForm from "./BookingForm";

interface RoomListProps {
    hotelId: string;
}

const RoomList: React.FC<RoomListProps> = ({ hotelId }) => {
    const rooms = useSelector((state: RootState) =>
        state.hotels.details?.rooms.map((roomId) =>
            state.rooms.data.find((room) => room.id === roomId)
        )
    );

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Habitaciónes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {rooms?.map((room) => room && (
                    <div
                        key={room.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <img
                            src={room.imgurl}
                            alt={room.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold mb-2">{room.name}</h4>
                            <p className="text-gray-700 mb-4">{room.description}</p>
                            <p className="text-gray-700 font-semibold mb-4">
                                Precio: ${room.price} COP x Noche
                            </p>
                            <BookingForm hotelId={hotelId} roomId={room.id.toString()} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomList;