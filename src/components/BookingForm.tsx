import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bookRoom } from "../redux/slices/bookingSlice";

interface BookingFormProps {
    hotelId: string;
    roomId: string | undefined;
}

const BookingForm: React.FC<BookingFormProps> = ({ hotelId, roomId }) => {
    const [checkinDate, setCheckinDate] = useState("");
    const [checkoutDate, setCheckoutDate] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (roomId) {
            dispatch(
                bookRoom({
                    hotelId,
                    roomId,
                    checkinDate,
                    checkoutDate,
                })
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex space-x-4">
                <div>
                    <label
                        htmlFor={`checkin-${roomId}`}
                        className="block font-semibold mb-1"
                    >
                        Check-in Date
                    </label>
                    <input
                        type="date"
                        id={`checkin-${roomId}`}
                        value={checkinDate}
                        onChange={(e) => setCheckinDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />
                </div>
                <div>
                    <label
                        htmlFor={`checkout-${roomId}`}
                        className="block font-semibold mb-1"
                    >
                        Check-out Date
                    </label>
                    <input
                        type="date"
                        id={`checkout-${roomId}`}
                        value={checkoutDate}
                        onChange={(e) => setCheckoutDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors mt-4"
            >
                Reservar
            </button>
        </form>
    );
};

export default BookingForm;
