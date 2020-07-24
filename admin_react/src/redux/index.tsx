import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import ReduxThunk, { ThunkAction } from 'redux-thunk'
import answer from './answerSlice'
import question from './questionSlice'
import video from './videoSlice'
const reducer = combineReducers({
  answer,question,video
  })
  
  const store = configureStore({
    reducer,
    middleware: [ReduxThunk],
  })
  
  export type AppDispatch = typeof store.dispatch
  export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
  export type RootState = ReturnType<typeof reducer>
  export * from './answerSlice'
  export * from './questionSlice'
  export * from './videoSlice'
  export default store