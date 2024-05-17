import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
    menuItems: { name: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-6">
            <h2 className="text-2xl font-bold mb-6">Admin</h2>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.name} className="mb-4">
                        <Link
                            to={item.path}
                            className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;