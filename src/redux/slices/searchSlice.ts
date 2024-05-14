import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import hotelsData from "../../data/hotels.json";
import { Hotel } from './hotelSlice';

interface SearchCriteria {
  city: string;
  startDate: string;
  endDate: string;
  guests: number;
}

interface SearchState {
  criteria: SearchCriteria;
  results: Hotel[];
}

const initialState: SearchState = {
  criteria: {
    city: '',
    startDate: '',
    endDate: '',
    guests: 1,
  },
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Actualiza los criterios de búsqueda
    updateSearchCriteria: (state, action: PayloadAction<SearchCriteria>) => {
      state.criteria = action.payload;
    },
    // Realiza la búsqueda basada en los criterios actuales
    searchHotels: (state, action: PayloadAction<SearchCriteria>) => {
      // Actualiza los criterios de búsqueda
      state.criteria = action.payload;
      // Filtra los hoteles basados en los criterios
      state.results = hotelsData.filter((hotel) => {
        // Implementa la lógica de filtrado aquí
        // Por ejemplo, filtrar por ciudad
        return hotel.city === state.criteria.city;
      });
    },
  },
});

export const { updateSearchCriteria, searchHotels } = searchSlice.actions;
export default searchSlice.reducer;
