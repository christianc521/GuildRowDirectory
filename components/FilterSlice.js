import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "",
}

export const filterSlice = createSlice({
    name: 'filterInput',
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updateFilter } = filterSlice.actions

export default filterSlice.reducer