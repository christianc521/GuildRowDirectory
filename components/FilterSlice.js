import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
      personName1: "",
      personName2: "",
    },
  };

export const filterSlice = createSlice({
    name: 'filterInput',
    initialState,
    reducers: {
        updateFilter: (state, action) => {
          state.value = {
            ...state.value,
            ...action.payload,
          };
        },
      },
})

export const { updateFilter } = filterSlice.actions

export default filterSlice.reducer