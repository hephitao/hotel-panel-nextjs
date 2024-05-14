import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import HotelSearch from "./HotelSearch";

const HotelList: React.FC = () => {
    const hotels = useSelector((state: RootState) => state.hotels.data);

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6">Hoteles</h2>
            <HotelSearch />
            <div className="grid grid-cols-2 gap-6">
                {hotels.map((hotel) => (
                    <div
                        key={hotel.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <img
                            src={`src/assets/img/${hotel.id}.jpg`}
                            // src={`assets/img${hotel.id}`}
                            alt={hotel.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                            <h4>{hotel.city}</h4>
                            <p className="text-gray-700 mb-4">{hotel.description}</p>
                            <Link
                                to={`/hotels/${hotel.id}`}
                                className="bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                Disponibles 🟢
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;
