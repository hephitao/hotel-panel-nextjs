import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { RootState } from "../redux/store"; // Assuming RootState is your root state type

const Header: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => (state.auth as { isLoggedIn: boolean }).isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-rose-600 text-white py-4">
            <nav className="container mx-auto flex justify-between">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:text-gray-300">
                            Hoteles
                        </Link>
                    </li>
                    <li>
                        <Link to="/bookings" className="hover:text-gray-300">
                            Mis reservas
                        </Link>
                    </li>
                </ul>
                <div>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="hover:text-gray-300 focus:outline-none"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="hover:text-gray-300">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
