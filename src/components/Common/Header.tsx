import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';

const Header: React.FC = () => {
    const { isLoggedIn, userType } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-rose-600 text-white py-4">
            <nav className="container mx-auto flex justify-between items-center">
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
                    {userType === 'agente' && (
                        <li>
                            <Link to="/hotel-admin" className="hover:text-gray-300">
                                Administrar Hoteles
                            </Link>
                        </li>
                    )}
                </ul>
                <div>
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <span className="font-semibold">
                                Bienvenido {userType === 'huesped' ? 'Huésped' : 'Agente'}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="hover:text-gray-300 focus:outline-none"
                            >
                                Logout
                            </button>
                        </div>
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
