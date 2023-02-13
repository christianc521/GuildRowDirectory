import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../../components/SearchSlice'

export const store = configureStore({
  reducer: {
    searchInput: searchReducer
  },
})