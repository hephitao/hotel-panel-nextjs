import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const BookingList: React.FC = () => {
    const bookings = useSelector((state: RootState) => state.bookings.data);
    const rooms = useSelector((state: RootState) => state.rooms.data);
    const hotels = useSelector((state: RootState) => state.hotels.allHotels);

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6">Mis Reservas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => {
                    const room = rooms.find(r => r.id === booking.roomId);
                    const hotel = hotels.find(h => h.id === booking.hotelId);
                    return (
                        <div
                            key={booking.roomId}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            {room && hotel && (
                                <>
                                    <img
                                        src={room.imgurl}
                                        alt={room.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                        <p className="text-gray-700 mb-2">{room.description}</p>
                                        <p className="text-gray-700 mb-2">Hotel: {hotel.name}</p>
                                        <p className="text-gray-700 mb-2">
                                            Entrada: {booking.checkinDate}
                                        </p>
                                        <p className="text-gray-700 mb-4">
                                            Salida: {booking.checkoutDate}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookingList;
