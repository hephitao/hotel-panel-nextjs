// En tu componente HotelEdit.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateHotel } from '../../redux/slices/hotelSlice';

const HotelEdit: React.FC = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hotel = useSelector((state: RootState) =>
        state.hotels.allHotels.find((h) => h.id === hotelId)
);

//const [name, setName] = useState(hotel?.name || '');
const [newName, setNewName] = useState(hotel?.name || '');

    if (!hotel) {
        return <div>Hotel no encontrado</div>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedHotel = { ...hotel, name: newName };
        dispatch(updateHotel(updatedHotel));
        navigate('/hotel-admin/hotel-list');
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6">Editar Hotel</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre del Hotel:</label>
                    <input
                        id="name"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default HotelEdit;
