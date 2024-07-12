import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga'; // Import your root saga
import modelSlice from "./model/slice"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Setup Redux store with middleware
export const store = configureStore({
  reducer: {
    models:modelSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run your root saga
sagaMiddleware.run(rootSaga);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
