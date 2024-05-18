import React from "react";
import { useSelector } from "react-redux";
//import { RootState } from "../redux/store";
import HotelSearch from "./HotelSearch";
import { selectFilteredHotels } from "../redux/slices/searchSlice";

const HotelList: React.FC = () => {
  const filteredHotels = useSelector(selectFilteredHotels);

  return (
    <div className="container mx-auto py-8">
      <HotelSearch />
      <h2 className="text-3xl font-bold mb-6">Lista de Hoteles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div key={hotel?.id} className="border p-4 rounded-md">
            <img src={hotel?.imgurl} alt={hotel?.name} className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-bold">{hotel?.name}</h3>
            <p>{hotel?.city}</p>
            <p>{hotel?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
