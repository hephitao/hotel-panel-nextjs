import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Booking, Room } from '../../types/index';

const BookingsAdmin: React.FC = () => {
    const bookings = useSelector((state: RootState) => state.bookings.data);
    const rooms = useSelector((state: RootState) => state.rooms.data);
    const hotels = useSelector((state: RootState) => state.hotels.allHotels);

    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const handleBookingDetailsClick = (booking: Booking) => {
        setSelectedBooking(booking);
    };

    const handleClosePopup = () => {
        setSelectedBooking(null);
    };

    const calculateDays = (checkinDate: string, checkoutDate: string): number => {
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const differenceInTime = checkout.getTime() - checkin.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays;
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6">Administrar Reservas</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Habitación</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Ingreso</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Salida</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking: Booking) => {
                        const room = rooms.find(r => r.id === booking.roomId);
                        const hotel = hotels.find(h => h.id === booking.hotelId);
                        return (
                            <tr key={booking.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{hotel ? hotel.name : 'Hotel Desconocido'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{room ? room.name : 'Habitación Desconocida'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{booking.checkinDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{booking.checkoutDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button
                                        onClick={() => handleBookingDetailsClick(booking)}
                                        className="bg-rose-400 text-white py-2 px-4 rounded-md hover:bg-rose-500 transition-colors"
                                    >
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {selectedBooking && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md overflow-hidden">
                        <h3 className="text-lg font-bold mb-4">Detalles de la Reserva</h3>
                        {rooms && hotels && selectedBooking && (
                            <>
                                {rooms.map((room: Room) => {
                                    if (room.id === selectedBooking.roomId) {
                                        const daysRequested = calculateDays(selectedBooking.checkinDate, selectedBooking.checkoutDate);
                                        const total = room.price * daysRequested + room.tax;
                                        return (
                                            <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                                                <img
                                                    src={room.imgurl}
                                                    alt={`Imagen de ${room.name}`}
                                                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500 ease-in-out mb-4"
                                                />
                                                <div className="p-6">
                                                    <h4 className="text-xl font-semibold mb-2">{room.name}</h4>
                                                    <p className="text-gray-700 mb-4">Precio: ${room.price}</p>
                                                    <p className="text-gray-700 mb-4">Impuesto: ${room.tax}</p>
                                                    <p className="text-gray-700 mb-4">Días solicitados: {daysRequested}</p>
                                                    <p className="text-gray-700 font-semibold">Costo total: ${total}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                                <p>Fecha de Ingreso: {selectedBooking.checkinDate}</p>
                                <p>Fecha de Salida: {selectedBooking.checkoutDate}</p>
                            </>
                        )}
                        <button onClick={handleClosePopup} className="bg-gray-300 px-4 py-2 rounded-md mt-4">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingsAdmin;
