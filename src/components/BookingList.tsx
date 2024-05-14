import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Booking } from "../types";

const BookingList: React.FC = () => {
    const bookings = useSelector((state: RootState) => (state.bookings as { data: Booking[] }).data);

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6">Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <div
                        key={booking.roomId}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <img
                            src={`https://source.unsplash.com/random/400x300?room=${booking.roomId}`}
                            alt={booking.roomName}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{booking.roomName}</h3>
                            <p className="text-gray-700 mb-2">{booking.hotelName}</p>
                            <p className="text-gray-700 mb-2">
                                Check-in: {booking.checkinDate}
                            </p>
                            <p className="text-gray-700 mb-4">
                                Check-out: {booking.checkoutDate}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingList;
