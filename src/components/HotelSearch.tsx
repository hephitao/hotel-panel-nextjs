import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { performSearch } from "../redux/slices/searchSlice";

const HotelSearch: React.FC = () => {
    const [city, setCity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guests, setGuests] = useState(1);
    const dispatch = useDispatch();

    const cities = useSelector((state: RootState) =>
        state.hotels.data.map((hotel) => hotel.city)
    );

    const uniqueCities = Array.from(new Set(cities));

    const handleSearch = () => {
        dispatch(performSearch({ city, startDate, endDate, guests }));
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6">Buscar Hoteles</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
                <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border p-2 rounded-md"
                >
                    <option value="">Seleccione una ciudad</option>
                    {uniqueCities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                Llegada:
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded-md"
                />
                Salida:
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded-md"
                />
                Cantidad personas:
                <div className="flex items-center">
                    <button
                        onClick={() => setGuests(guests - 1 < 1 ? 1 : guests - 1)}
                        className="bg-gray-300 text-white p-2 rounded-l-md hover:bg-gray-500 transition-colors"
                    >
                        -
                    </button>
                    <span className="border-t border-b p-2">{guests}</span>
                    <button
                        onClick={() => setGuests(guests + 1)}
                        className="bg-gray-300 text-white p-2 rounded-r-md hover:bg-gray-500 transition-colors"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-rose-400 text-white py-2 px-4 rounded-md hover:bg-rose-600 transition-colors"
                >
                    Filtrar
                </button>
            </div>
        </div>
    );
};

export default HotelSearch;
