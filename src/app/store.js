import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../../components/SearchSlice'
import filterReducer from '../../components/FilterSlice'

export const store = configureStore({
  reducer: {
    searchInput: searchReducer,
    filterInput: filterReducer
  },
  
})