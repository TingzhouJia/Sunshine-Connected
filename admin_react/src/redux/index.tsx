import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import ReduxThunk, { ThunkAction } from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import answer from './answerSlice'
import question from './questionSlice'
import video from './videoSlice'
const reducer = combineReducers({
  answer, question, video
})
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
  reducer:persistedReducer,
  middleware: [ReduxThunk],
})


export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export type RootState = ReturnType<typeof reducer>
export const persistor= persistStore(store)
export * from './answerSlice'
export * from './questionSlice'
export * from './videoSlice'
export default store