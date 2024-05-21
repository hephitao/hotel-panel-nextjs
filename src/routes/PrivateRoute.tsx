import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Sidebar from "../components/Common/Sidebar";

const PrivateRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const menuItems = [
        { name: "Mis hoteles", path: "hotel-list" },
        { name: "Crear Nuevo Hotel", path: "create-hotel" },
        { name: "Ver mis reservas", path: "my-bookings" },
    ];

    return isAuthenticated ? (
        <div className="flex">
            <Sidebar menuItems={menuItems} />
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;