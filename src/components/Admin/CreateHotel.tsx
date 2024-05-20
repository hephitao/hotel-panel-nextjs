import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addHotel } from "../../redux/slices/hotelSlice";
import { addRoom } from "../../redux/slices/roomSlice";
import { Room, Hotel } from '../../types/index';

const CreateHotel: React.FC = () => {
    const dispatch = useDispatch();
    const hotels = useSelector((state: RootState) => state.hotels.allHotels);
    const rooms = useSelector((state: RootState) => state.rooms.data);
    const [form, setForm] = useState<Hotel & { roomsForm: Room[] }>({
        id: "",
        name: "",
        city: "",
        description: "",
        rooms: [],
        status: "active",
        imgurl: "",
        location: "",
        roomsForm: []
    });

    useEffect(() => {
        const lastHotelId = hotels.length ? parseInt(hotels[hotels.length - 1].id) : 0;
        setForm(prevForm => ({
            ...prevForm,
            id: (lastHotelId + 1).toString(),
            roomsForm: [{ id: '', name: '', description: '', price: 0, status: 'active', imgurl: '', tax: 0, location: '' }]
        }));
    }, [hotels]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleRoomFormChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedRooms = [...form.roomsForm];
        updatedRooms[index] = { ...updatedRooms[index], [name]: value };
        setForm({ ...form, roomsForm: updatedRooms });
    };

    const addRoomToForm = () => {
        setForm(prevForm => ({
            ...prevForm,
            roomsForm: [...prevForm.roomsForm, { id: '', name: '', description: '', price: 0, status: 'active', imgurl: '', tax: 0, location: '' }]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.name && form.city && form.description && form.imgurl && form.roomsForm.length > 0 && form.roomsForm.every(room => room.name && room.description && room.price && room.status && room.location && room.imgurl && room.tax)) {
            const newRoomIds: string[] = [];
            form.roomsForm.forEach((roomForm, index) => {
                const lastRoomId = rooms.length ? rooms[rooms.length - 1].id : 0;
                const newRoomId = Number(lastRoomId) + 1 + index;
                const newRoomIdString = newRoomId.toString();

                const newRoom: Room = {
                    id: newRoomIdString,
                    name: roomForm.name,
                    description: roomForm.description,
                    price: roomForm.price,
                    status: "active",
                    imgurl: roomForm.imgurl,
                    tax: roomForm.tax,
                    location: roomForm.location
                };
                dispatch(addRoom(newRoom));
                newRoomIds.push(newRoomIdString);
            });

            const newHotel: Hotel = {
                id: form.id,
                name: form.name,
                description: form.description,
                rooms: newRoomIds,
                city: form.city,
                status: "active",
                imgurl: form.imgurl,
                location: form.location,
            };

            dispatch(addHotel(newHotel));
            setForm({
                id: (parseInt(form.id) + 1).toString(),
                name: "",
                city: "",
                description: "",
                rooms: [],
                status: "active",
                imgurl: "",
                location: "",
                roomsForm: [{ id: '', name: '', description: '', price: 0, status: 'active', imgurl: '', tax: 0, location: '' }]
            });
        } else {
            console.error('Todos los campos son requeridos, incluyendo la URL de la imagen y al menos una habitación');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Crear Nuevo Hotel</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="id" value={form.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                            Ciudad
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imgurl">
                        URL de la Imagen
                    </label>
                    <input
                        type="text"
                        name="imgurl"
                        value={form.imgurl}
                        onChange={handleInputChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <button
                        onClick={addRoomToForm}
                        type="button"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Agregar Habitación
                    </button>
                </div>
                {form.roomsForm.map((room, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <div className="md:col-span-1">
                            <input
                                type="text"
                                name="name"
                                value={room.name}
                                onChange={(e) => handleRoomFormChange(index, e)}
                                required
                                placeholder="Nombre de la habitación"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <input
                                type="text"
                                name="description"
                                value={room.description}
                                onChange={(e) => handleRoomFormChange(index, e)}
                                required
                                placeholder="Descripción"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <input
                                type="number"
                                name="price"
                                value={room.price}
                                onChange={(e) => handleRoomFormChange(index, e)}
                                required
                                placeholder="Precio"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <input
                                type="number"
                                name="tax"
                                value={room.tax}
                                onChange={(e) => handleRoomFormChange(index, e)}
                                required
                                placeholder="Impuesto"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <input
                                type="text"
                                name="location"
                                value={room.location}
                                onChange={(e) => handleRoomFormChange(index, e)}
                                required
                                placeholder="Ubicación"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <input
                                type="text"
                                name="imgurl"
                                value={room.imgurl}
                                onChange={(e) => handleRoomFormChange(index, e)}
                                required
                                placeholder="Imagen URL"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                ))}

                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Crear Hotel
                    </button>
                </div>
            </form>
        </div>
    );
}
export default CreateHotel;
