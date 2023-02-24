import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: ["christian"],
}

export const memberSlice = createSlice({
    name: 'memberInput',
    initialState,
    reducers: {
        updateMember: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updateMember } = memberSlice.actions

export default memberSlice.reducer