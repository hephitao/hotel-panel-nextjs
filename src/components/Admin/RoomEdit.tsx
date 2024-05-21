import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateRoom } from '../../redux/slices/roomSlice';
import { Room } from '../../types/index';

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
        if (hotel) {
            const hotelRooms = rooms.filter(room => hotel.rooms.includes(room.id));
            setEditedRooms(prevRooms => {
                const updatedRooms = [...prevRooms, ...hotelRooms.filter(room => !prevRooms.find(r => r.id === room.id))];
                return updatedRooms;
            });
        }
    }, [rooms, hotel]);

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
            editedRooms.map(room => {
                return dispatch(updateRoom(room));
            })
        );
        setSaving(false);
        navigate(`/hotel-admin/hotel-list/${hotelId}`);
    };

    return (
        <div className="container mx-auto py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {editedRooms.map((room, index) => (
                    <div key={room.id} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl text-center font-semibold mb-2">Habitación {index + 1}</h3>
                        <label htmlFor={`name${index}`} className="block text-gray-700 font-bold">Nombre:</label>
                        <input
                            id={`name${index}`}
                            type="text"
                            value={room.name}
                            onChange={(e) => handleRoomChange(index, 'name', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <label htmlFor={`description${index}`} className="block text-gray-700 font-bold">Descripción:</label>
                        <textarea
                            id={`description${index}`}
                            value={room.description}
                            onChange={(e) => handleRoomChange(index, 'description', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <label htmlFor={`price${index}`} className="block text-gray-700 font-bold">Precio:</label>
                        <input
                            id={`price${index}`}
                            type="number"
                            value={room.price}
                            onChange={(e) => handleRoomChange(index, 'price', Number(e.target.value))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <label htmlFor={`status${index}`} className="block text-gray-700 font-bold">Estado:</label>
                        <select
                            id={`status${index}`}
                            value={room.status}
                            onChange={(e) => handleRoomChange(index, 'status', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                        <label htmlFor={`imgurl${index}`} className="block text-gray-700 font-bold">URL de la Imagen:</label>
                        <input
                            id={`imgurl${index}`}
                            type="text"
                            value={room.imgurl || ''}
                            onChange={(e) => handleRoomChange(index, 'imgurl', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-start mt-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition-colors"
                >
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>
        </div>
    );
};

export default RoomEdit;
