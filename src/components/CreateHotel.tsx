import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addHotel, Hotel } from "../redux/slices/hotelSlice";
import { addRoom, Room as RoomData } from "../redux/slices/roomSlice";

interface RoomForm {
    cost: string;
    tax: string;
    roomType: string;
    location: string;
    imgurl: string;
}

const CreateHotel: React.FC = () => {
    const dispatch = useDispatch();
    const hotels = useSelector((state: RootState) => state.hotels.data);
    const rooms = useSelector((state: RootState) => state.rooms.data);
    const [form, setForm] = useState<Hotel & { roomsForm: RoomForm[] }>({
        id: "",
        name: "",
        city: "",
        description: "",
        rooms: [],
        status: "active",
        imgurl: "",
        roomsForm: []
    });

    useEffect(() => {
        const lastHotelId = hotels.length ? parseInt(hotels[hotels.length - 1].id) : 0;
        setForm(prevForm => ({
            ...prevForm,
            id: (lastHotelId + 1).toString(),
            roomsForm: [{ cost: '', tax: '', roomType: '', location: '', imgurl: '' }]
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
            roomsForm: [...prevForm.roomsForm, { cost: '', tax: '', roomType: '', location: '', imgurl: '' }]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.name && form.city && form.description && form.imgurl && form.roomsForm.length > 0 && form.roomsForm.every(room => room.cost && room.tax && room.roomType && room.location && room.imgurl)) {
            const newRoomIds: string[] = [];
            form.roomsForm.forEach((roomForm, index) => {
                const lastRoomId = rooms.length ? rooms[rooms.length - 1].id : 0;
                const newRoomId = Number(lastRoomId) + 1 + index;
                const newRoomIdString = newRoomId.toString();

                const newRoom: RoomData = {
                    id: (newRoomId).toString(),
                    name: roomForm.roomType,
                    description: roomForm.location,
                    price: parseFloat(roomForm.cost) + parseFloat(roomForm.tax),
                    status: "active",
                    imgurl: roomForm.imgurl
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
                imgurl: form.imgurl
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
                roomsForm: [{ cost: '', tax: '', roomType: '', location: '', imgurl: '' }]
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
                                name="cost"
                                value={room.cost}
                                onChange={(e) => handleRoomFormChange(index, e)}
                                required
                                placeholder="Costo"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <input
                                type="text"
                                name="tax"
                                value={room.tax}
                                onChange={(e) => handleRoomFormChange(index, e)}
                                required
                                placeholder="Impuesto"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <select
                                name="roomType"
                                value={room.roomType}
                                onChange={(e) => handleRoomFormChange(index, e)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="Sencilla">Sencilla</option>
                                <option value="Doble">Doble</option>
                                <option value="Familiar">Familiar</option>
                            </select>
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
