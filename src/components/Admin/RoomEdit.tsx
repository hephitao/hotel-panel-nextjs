import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateRoom, Room } from '../../redux/slices/roomSlice';

const RoomEdit: React.FC = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hotel = useSelector((state: RootState) =>
        state.hotels.allHotels.find((h) => h.id === hotelId)
    );

    const rooms = useSelector((state: RootState) => state.rooms.data);

    const [editedRooms, setEditedRooms] = useState<Room[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setEditedRooms(rooms);
    }, [rooms]);

    if (!hotel) {
        return <div>Hotel no encontrado</div>;
    }

    const handleRoomChange = (index: number, field: string, value: string | number) => {
        const newRooms = [...editedRooms];
        newRooms[index] = { ...newRooms[index], [field]: value };
        setEditedRooms(newRooms);
    };

    const handleSave = async () => {
        setSaving(true);
        await Promise.all(
            editedRooms.map(room => dispatch(updateRoom(room)))
        );
        setSaving(false);
        navigate(`/hotel-admin/hotel-list/${hotelId}`);
    };

    return (
        <div className="container mx-auto py-4">
            <h2 className="text-3xl font-bold mb-6">Editar Habitaciones de {hotel.name}</h2>
            {editedRooms.map((room, index) => (
                <div key={room.id} className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Habitación {index + 1}</h3>
                    <label htmlFor={`name${index}`} className="block text-gray-700">Nombre:</label>
                    <input
                        id={`name${index}`}
                        type="text"
                        value={room.name}
                        onChange={(e) => handleRoomChange(index, 'name', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <label htmlFor={`description${index}`} className="block text-gray-700">Descripción:</label>
                    <textarea
                        id={`description${index}`}
                        value={room.description}
                        onChange={(e) => handleRoomChange(index, 'description', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <label htmlFor={`price${index}`} className="block text-gray-700">Precio:</label>
                    <input
                        id={`price${index}`}
                        type="number"
                        value={room.price}
                        onChange={(e) => handleRoomChange(index, 'price', Number(e.target.value))}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <label htmlFor={`status${index}`} className="block text-gray-700">Estado:</label>
                    <input
                        id={`status${index}`}
                        type="text"
                        value={room.status}
                        onChange={(e) => handleRoomChange(index, 'status', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <label htmlFor={`imgurl${index}`} className="block text-gray-700">URL de la Imagen:</label>
                    <input
                        id={`imgurl${index}`}
                        type="text"
                        value={room.imgurl || ''}
                        onChange={(e) => handleRoomChange(index, 'imgurl', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            ))}
            <button
                onClick={handleSave}
                disabled={saving}
                className="bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition-colors"
            >
                {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
        </div>
    );
};

export default RoomEdit;
