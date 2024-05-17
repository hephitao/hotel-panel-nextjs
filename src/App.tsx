// App.tsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookingList from "./components/BookingList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HotelDetails from "./components/HotelDetails";
import HotelList from "./components/HotelList";
import LoginForm from "./components/LoginForm";
import HotelAdminLayout from "./components/HotelAdminLayout";
import CreateHotel from "./components/CreateHotel";
import HotelAdminList from "./components/HotelAdminList";
import { Navigate } from 'react-router-dom';

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
          </Route>
          <Route path="/" element={<HotelList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


