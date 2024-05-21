import React, { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from 'emailjs-com';
import { EmailPopupProps } from '../../types/index';

const EmailPopup: React.FC<EmailPopupProps> = ({ isOpen, onClose, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const templateParams = {
                user_email: email,
            };

            await emailjs.send(
                'service_grvo2p2',
                'pruebasmarttalent@fastmail.com',
                templateParams,
                'e8sxjne3warz3jve'
            );

            setLoading(false);
            onSubmit(email);
            setEmail('');
            onClose();
        } catch (err) {
            setLoading(false);
            setError('Error sending email. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
                <h2 className="text-2xl font-bold mb-4 text-center">Confirma tu correo para enviarte los detalles de tu reserva</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        placeholder="Correo electrónico"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                        >
                            No enviar detalles
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Reservar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailPopup;
