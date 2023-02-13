import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "",
}

export const searchSlice = createSlice({
    name: 'searchInput',
    initialState,
    reducers: {
        updateInput: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updateInput } = searchSlice.actions

export default searchSlice.reducer