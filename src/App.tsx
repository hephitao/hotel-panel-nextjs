import React from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import BookingList from "./components/BookingList";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";
import HotelDetails from "./components/HotelDetails";
import HotelList from "./components/HotelList";
import LoginForm from "./routes/LoginForm";
import CreateHotel from "./components/Admin/CreateHotel";
import BookingsAdmin from "./components/Admin/BookingsAdmin";
import HotelAdminList from "./components/Admin/HotelAdminList";
import HotelEdit from './components/Admin/HotelEdit';
import RoomEdit from './components/Admin/RoomEdit';
import PrivateRoute from './routes/PrivateRoute';
import RoomAdd from "./components/Admin/RoomAdd";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/hotel-admin/*" element={<PrivateRoute />}>
            <Route index element={<Navigate replace to="hotel-list" />} />
            <Route path="create-hotel" element={<CreateHotel />} />
            <Route path="my-bookings" element={<BookingsAdmin />} />
            <Route path="hotel-list" element={<HotelAdminList />} />
            <Route path="hotel-list/:hotelId" element={<HotelEdit />} />
            <Route path="hotel-list/:hotelId/rooms" element={<RoomEdit />} />
            <Route path="hotel-list/:hotelId/add-room" element={<RoomAdd />} />

          </Route>
          <Route path="/" element={<HotelList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


