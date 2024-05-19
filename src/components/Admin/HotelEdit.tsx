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

  const [name, setName] = useState(hotel?.name || '');
  const [description, setDescription] = useState(hotel?.description || '');
  const [city, setCity] = useState(hotel?.city || '');
  const [status, setStatus] = useState(hotel?.status || '');
  const [imgurl, setImgurl] = useState(hotel?.imgurl || '');

  if (!hotel) {
    return <div>Hotel no encontrado</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHotel = {
      ...hotel,
      name,
      description,
      city,
      status,
      imgurl,
    };
    dispatch(updateHotel(updatedHotel));
    navigate('/hotel-admin/hotel-list');
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Editar Hotel</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nombre del Hotel:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Descripción:</label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700">Ciudad:</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">Estado:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Seleccione...</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="imgurl" className="block text-gray-700">URL de la Imagen:</label>
          <input
            id="imgurl"
            type="text"
            value={imgurl}
            onChange={(e) => setImgurl(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition-colors mt-4">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>

  );
};

export default HotelEdit;
