// components/HotelAdminLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Common/Sidebar";

const HotelAdminLayout: React.FC = () => {
    const menuItems = [
        { name: "Mis hoteles", path: "hotel-list" },
        { name: "Crear Nuevo Hotel", path: "create-hotel" },
    ];

    return (
        <div className="flex">
            <Sidebar menuItems={menuItems} />
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default HotelAdminLayout;
