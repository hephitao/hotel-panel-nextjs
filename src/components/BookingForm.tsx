import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bookRoom } from "../redux/slices/bookingSlice";
import BookingPopupForm from './BookingPopupForm';
import { BookingFormProps, FormValues } from '../types/index';

const BookingForm: React.FC<BookingFormProps> = ({ hotelId, roomId }) => {
    const [checkinDate, setCheckinDate] = useState("");
    const [checkoutDate, setCheckoutDate] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkinDate || !checkoutDate) {
            setAlertMessage("Debe seleccionar las fechas de ingreso y salida.");
            return;
        }
        if (roomId) {
            dispatch(
                bookRoom({
                    hotelId,
                    roomId,
                    checkinDate,
                    checkoutDate,
                })
            );
            setIsPopupOpen(true);
            setAlertMessage("");
        }
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handlePopupSubmit = (formData: FormValues) => {
        console.log(formData);
        setIsPopupOpen(false);
    };

    const today = new Date().toISOString().split('T')[0];
    return (
        <>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex space-x-4">
                    <div>
                        <label
                            htmlFor={`checkin-${roomId}`}
                            className="block font-semibold mb-1"
                        >
                            Fecha Ingreso
                        </label>
                        <input
                            type="date"
                            id={`checkin-${roomId}`}
                            value={checkinDate}
                            onChange={(e) => setCheckinDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                            min={today}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor={`checkout-${roomId}`}
                            className="block font-semibold mb-1"
                        >
                            Fecha Salida
                        </label>
                        <input
                            type="date"
                            id={`checkout-${roomId}`}
                            value={checkoutDate}
                            onChange={(e) => setCheckoutDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                            min={checkinDate}
                        />
                    </div>
                </div>
                {alertMessage && (
                    <div className="text-red-500 mt-2">{alertMessage}</div>
                )}
                <button
                    type="submit"
                    className="bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition-colors mt-4"
                >
                    Confirmar Reserva
                </button>
            </form>
            {isPopupOpen && (
                <BookingPopupForm onClose={handlePopupClose} onSubmit={handlePopupSubmit} />
            )}
        </>
    );
};

export default BookingForm;