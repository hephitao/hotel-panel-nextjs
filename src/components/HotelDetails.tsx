import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchHotelDetails } from "../redux/slices/hotelSlice";
import { RootState } from "../redux/store";
import RoomList from "./RoomList";

const HotelDetails: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const dispatch = useDispatch();
  const hotel = useSelector((state: RootState) => state.hotels.details);

  useEffect(() => {
    if (hotelId) {
      dispatch(fetchHotelDetails(hotelId));
    }
  }, [dispatch, hotelId]);

  if (!hotelId || !hotel) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative group">
          <img
            src={hotel.imgurl}
            alt={hotel.name}
            className="w-full h-64 object-cover transition-transform transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
        </div>

        {/* <div className="absolute inset-0 bg-white bg-opacity-25 backdrop-blur-md rounded-lg" /> */}
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{hotel.name}</h2>
          <p className="text-gray-700 mb-6">{hotel.description}</p>
          <RoomList hotelId={hotelId} />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;