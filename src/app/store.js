import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import searchReducer from '../../components/SearchSlice'
import filterReducer from '../../components/FilterSlice'
import memberReducer from '../../components/MemberSlice'

export const store = configureStore({
  reducer: {
    searchInput: searchReducer,
    filterInput: filterReducer,
    memberInput: memberReducer,
  },
  middleware: [thunk],
  
})