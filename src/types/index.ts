export interface Booking {
    roomId: string;
    roomName: string;
    hotelName: string;
    checkinDate: string;
    checkoutDate: string;
}

export interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    status: string;
    imgurl?: string;
    tax: number;
    location: string;
}

export interface RoomsState {
    data: Room[];
}

export interface Hotel {
    id: string;
    name: string;
    description: string;
    rooms: string[];
    city: string;
    status: string;
    imgurl: string;
    location: string;
}
export interface BookingFormProps {
    hotelId: string;
    roomId: string | undefined;
}

export interface FormValues {
    nombre: string;
    apellidos: string;
    fechaNacimiento: string;
    genero: string;
    tipoDocumento: 'CC' | 'Pasaporte' | 'Tarjeta de Identidad';
    documento: string;
    email: string;
    telefono: string;
    contactoEmergencia: {
        nombreCompleto: string;
        telefono: string;
    };
}

export interface BookingPopupFormProps {
    onClose: () => void;
    onSubmit: (values: FormValues) => void;
}

export interface RoomForm {
    cost: string;
    tax: string;
    roomType: string;
    location: string;
    imgurl: string;
}

export interface EmailSenderProps {
    formValues: FormValues;
    onSuccess: () => void;
    onError: (error: Error) => void;
}

export interface RoomListProps {
    hotelId: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    userType: 'huesped' | 'agente' | null;
}

export interface Booking {
    id: string;
    hotelId: string;
    hotelName: string;
    roomId: string;
    roomName: string;
    checkinDate: string;
    checkoutDate: string;
}

export interface BookingsState {
    data: Booking[];
}

export interface HotelsState {
    allHotels: Hotel[];
    details: Hotel | null;
}

export interface SearchCriteria {
    city: string;
    startDate: string;
    endDate: string;
    guests: number;
}
export interface SearchState {
    criteria: SearchCriteria;
    results: string[];
}