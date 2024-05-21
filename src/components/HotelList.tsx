import React from "react";
import { useSelector } from "react-redux";
import HotelSearch from "./HotelSearch";
import { selectFilteredHotels } from "../redux/slices/searchSlice";
import { Link } from "react-router-dom";
import Banner from "./Common/Banner";

const HotelList: React.FC = () => {
    const filteredHotels = useSelector(selectFilteredHotels);


    return (
        <div className="container mx-auto py-8">
            <Banner/>
            <HotelSearch />
            <div className="grid grid-cols-2 gap-6">
                {filteredHotels.map((hotel) => (
                    <div
                        key={hotel?.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden group"
                    >
                        <img
                            src={hotel?.imgurl}
                            alt={hotel?.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{hotel?.name}</h3>
                            <h4 className="text-rose-500 mb-4">{hotel?.city}</h4>
                            <h4 className="text-gray-500 mb-4">{hotel?.location}</h4>
                            <p className="text-gray-700 mb-4">⭐⭐⭐⭐⭐ (5)</p>
                            <p className="text-gray-700 mb-4">{hotel?.description}</p>
                            <div className="text-right">
    <Link
        to={`/hotels/${hotel?.id}`}
        className="bg-rose-500 text-white py-2 px-4 m-4 rounded-md hover:bg-rose-700 transition-colors"
    >
        Ver habitaciónes 🌅
    </Link>
</div>




                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;
