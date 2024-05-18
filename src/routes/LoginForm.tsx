// components/LoginForm.tsx
import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Navigate } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { login } from '../redux/slices/authSlice';

const LoginForm: React.FC = () => {
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [selectedTab, setSelectedTab] = useState(0);
    const dispatch = useDispatch();
    const [redirectTo, setRedirectTo] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { email, password } = formValues;
        const isHuesped = selectedTab === 0 && email === 'huesped@gmail.com' && password === 'password';
        const isAgente = selectedTab === 1 && email === 'agente@gmail.com' && password === 'password';

        if (isHuesped) {
            dispatch(login('huesped'));
            alert('Login successful for Huésped');
            setRedirectTo('/');
        } else if (isAgente) {
            dispatch(login('agente'));
            alert('Login successful for Agente');
            setRedirectTo('/hotel-admin/hotel-list');
        } else {
            alert('Invalid email or password');
        }
    };

    if (redirectTo) {
        return <Navigate to={redirectTo} replace />; // Usa Navigate en lugar de Redirect
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                    <TabList>
                        <Tab>Huéspedes</Tab>
                        <Tab>Agentes</Tab>
                    </TabList>

                    <TabPanel>
                        <h2 className="text-lg font-medium text-gray-900 mt-4 text-center">¡Planea tu nuevo destino! ✈️</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Login
                            </button>
                        </form>
                    </TabPanel>

                    <TabPanel>
                        <h2 className="text-lg font-medium text-gray-900 mt-4 text-center">Administra tús hoteles 🏩</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Login
                            </button>
                        </form>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default LoginForm;