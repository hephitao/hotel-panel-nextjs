import React, { useState } from "react";

interface ContactoEmergencia {
    nombreCompleto: string;
    telefono: string;
}

interface FormValues {
    nombre: string;
    apellidos: string;
    fechaNacimiento: string;
    genero: string;
    tipoDocumento: "CC" | "Pasaporte" | "Tarjeta de Identidad";
    documento: string;
    email: string;
    telefono: string;
    contactoEmergencia: ContactoEmergencia;
}

interface PopupFormProps {
    onClose: () => void;
    onSubmit: (values: FormValues) => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ onClose, onSubmit }) => {
    const [formValues, setFormValues] = useState<FormValues>({
        nombre: "",
        apellidos: "",
        fechaNacimiento: "",
        genero: "",
        tipoDocumento: "CC",
        documento: "",
        email: "",
        telefono: "",
        contactoEmergencia: {
            nombreCompleto: "",
            telefono: "",
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleContactoEmergenciaChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            contactoEmergencia: {
                ...prevValues.contactoEmergencia,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <form onSubmit={handleSubmit}>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <h2 className="text-lg leading-6 font-medium text-gray-900 mt-3 mb-3 text-center">Crea tu reserva</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="mb-4">
                                            <label
                                                htmlFor="nombre"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                value={formValues.nombre}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="apellidos"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                Apellidos
                                            </label>
                                            <input
                                                type="text"
                                                id="apellidos"
                                                name="apellidos"
                                                value={formValues.apellidos}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="fechaNacimiento"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                Fecha de nacimiento
                                            </label>
                                            <input
                                                type="date"
                                                id="fechaNacimiento"
                                                name="fechaNacimiento"
                                                value={formValues.fechaNacimiento}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="genero"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                Género
                                            </label>
                                            <select
                                                id="genero"
                                                name="genero"
                                                value={formValues.genero}
                                                onChange={handleChange}
                                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            >
                                                <option value="">Seleccione...</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="femenino">Femenino</option>
                                                <option value="otro">Otro</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="tipoDocumento"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                Tipo de documento
                                            </label>
                                            <select
                                                id="tipoDocumento"
                                                name="tipoDocumento"
                                                value={formValues.tipoDocumento}
                                                onChange={handleChange}
                                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            >
                                                <option value="CC">CC</option>
                                                <option value="Pasaporte">Pasaporte</option>
                                                <option value="Tarjeta de Identidad">
                                                    Tarjeta de Identidad
                                                </option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="documento"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                Documento
                                            </label>
                                            <input
                                                type="text"
                                                id="documento"
                                                name="documento"
                                                value={formValues.documento}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="email"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                Email
                                            </label>
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
                                            <label
                                                htmlFor="telefono"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                id="telefono"
                                                name="telefono"
                                                value={formValues.telefono}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <h2 className="text-lg leading-6 font-medium text-gray-900 mt-3 mb-3 text-center">Contacto de emergencia</h2>
                                    <div className="mb-4 flex">
                                        <div className="w-1/2 mr-2">
                                            <label
                                                htmlFor="nombreEmergencia"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Nombre completo
                                            </label>
                                            <input
                                                type="text"
                                                id="nombreEmergencia"
                                                name="nombreCompleto"
                                                value={formValues.contactoEmergencia.nombreCompleto}
                                                onChange={handleContactoEmergenciaChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                        <div className="w-1/2 ml-2">
                                            <label
                                                htmlFor="telefonoEmergencia"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                id="telefonoEmergencia"
                                                name="telefono"
                                                value={formValues.contactoEmergencia.telefono}
                                                onChange={handleContactoEmergenciaChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Reservar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupForm;
