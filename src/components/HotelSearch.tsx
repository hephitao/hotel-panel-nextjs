import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearchCriteria, searchHotels } from "../redux/slices/searchSlice";

const HotelSearch: React.FC = () => {
    const [city, setCity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guests, setGuests] = useState(1);
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(updateSearchCriteria({ city, startDate, endDate, guests }));
        dispatch(searchHotels({ city, startDate, endDate, guests }));
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6">Buscar Hoteles</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border p-2 rounded-md"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded-md"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded-md"
                />
                <div className="flex items-center">
                    <button
                        onClick={() => setGuests(guests - 1 < 1 ? 1 : guests - 1)}
                        className="bg-red-500 text-white p-2 rounded-l-md hover:bg-red-700 transition-colors"
                    >
                        -
                    </button>
                    <span className="border-t border-b p-2">{guests}</span>
                    <button
                        onClick={() => setGuests(guests + 1)}
                        className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-700 transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>
            <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
                Filtrar
            </button>
        </div>
    );
};

export default HotelSearch;
