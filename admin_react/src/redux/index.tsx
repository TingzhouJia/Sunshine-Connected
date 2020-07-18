import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import ReduxThunk, { ThunkAction } from 'redux-thunk'
const reducer = combineReducers({

  })
  
  const store = configureStore({
    reducer,
    middleware: [ReduxThunk],
  })
  
  export type AppDispatch = typeof store.dispatch
  export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
  export type RootState = ReturnType<typeof reducer>
  
  export default store