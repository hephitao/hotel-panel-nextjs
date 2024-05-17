import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import hotelsData from "../../data/hotels.json";
import { Hotel, addHotel } from './hotelSlice';

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
  results: hotelsData,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    performSearch: (state, action: PayloadAction<SearchCriteria>) => {
      state.criteria = action.payload;
      if (state.criteria.city) {
        // Si se proporciona una ciudad, filtra los hoteles que coincidan
        state.results = hotelsData.filter((hotel) => {
          return hotel.city.toLowerCase() === state.criteria.city.toLowerCase();
        });
      } else {
        // Si no se proporciona una ciudad, muestra todos los hoteles
        state.results = hotelsData;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addHotel, (state, action) => {
      state.results.push(action.payload);
    });
  },
});

// Exporta solo la acción combinada
export const { performSearch } = searchSlice.actions;
export default searchSlice.reducer;
