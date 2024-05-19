// App.tsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookingList from "./components/BookingList";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";
import HotelDetails from "./components/HotelDetails";
import HotelList from "./components/HotelList";
import LoginForm from "./routes/LoginForm";
import HotelAdminLayout from "./components/Admin/HotelAdminLayout";
import CreateHotel from "./components/CreateHotel";
import HotelAdminList from "./components/Admin/HotelAdminList";
import HotelEdit from './components/Admin/HotelEdit';
import { Navigate } from 'react-router-dom';
import RoomEdit from './components/Admin/RoomEdit';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/hotel-admin/*" element={<HotelAdminLayout />}>
            <Route index element={<Navigate replace to="hotel-list" />} />
            <Route path="create-hotel" element={<CreateHotel />} />
            <Route path="hotel-list" element={<HotelAdminList />} />
            <Route path="hotel-list/:hotelId" element={<HotelEdit />} />
            <Route path="hotel-list/:hotelId/rooms" element={<RoomEdit />} />
          </Route>
          <Route path="/" element={<HotelList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


