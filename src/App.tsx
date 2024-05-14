import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookingList from "./components/BookingList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HotelDetails from "./components/HotelDetails";
import HotelList from "./components/HotelList";
import LoginForm from "./components/LoginForm";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/" element={<HotelList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

