import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, selectAllRooms } from "../../redux/slices/roomSlice";
import { Room } from '../../types/index';
import { useParams } from "react-router-dom";
// import { RootState } from "../../redux/store";
import { updateHotel, selectAllHotels } from "../../redux/slices/hotelSlice";

const RoomAdd: React.FC = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const dispatch = useDispatch();
    const allRooms = useSelector(selectAllRooms);
    const allHotels = useSelector(selectAllHotels);
    const hotel = allHotels.find(hotel => hotel.id === hotelId);

    const [roomForm, setRoomForm] = useState<Room>({
        id: '',
        name: '',
        description: '',
        price: 0,
        status: 'active',
        imgurl: '',
        tax: 0,
        location: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRoomForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomForm.name && roomForm.description && roomForm.price && roomForm.status && roomForm.location && roomForm.imgurl && roomForm.tax) {
            const lastId = allRooms.length > 0 ? parseInt(allRooms[allRooms.length - 1].id) : 0;
            const newRoom: Room = { ...roomForm, id: (lastId + 1).toString() };
            dispatch(addRoom(newRoom));

            if (hotel) {
                const updatedHotel = {
                    ...hotel,
                    rooms: [...hotel.rooms, newRoom.id]
                };
                dispatch(updateHotel(updatedHotel));
            } else {
                console.error('Hotel not found');
            }

            setRoomForm({
                id: '',
                name: '',
                description: '',
                price: 0,
                status: 'active',
                imgurl: '',
                tax: 0,
                location: ''
            });
        } else {
            console.error('Todos los campos son requeridos');
        }
    };

    return (
        <div className="max-w-md justify-start">
            <h1 className="text-3xl font-bold mb-6">Agregar Habitación al Hotel: {hotelId}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={roomForm.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Nombre de la habitación"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="description"
                            value={roomForm.description}
                            onChange={handleInputChange}
                            required
                            placeholder="Descripción"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                            Precio:
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={roomForm.price}
                            onChange={handleInputChange}
                            required
                            placeholder="Precio"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="tax">
                            Impuesto:
                        </label>
                        <input
                            type="number"
                            name="tax"
                            value={roomForm.tax}
                            onChange={handleInputChange}
                            required
                            placeholder="Impuesto"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="location"
                            value={roomForm.location}
                            onChange={handleInputChange}
                            required
                            placeholder="Ubicación"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="imgurl"
                            value={roomForm.imgurl}
                            onChange={handleInputChange}
                            required
                            placeholder="Imagen URL"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Agregar Habitación
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RoomAdd;
