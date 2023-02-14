import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { playersSlice } from './slices/players';
import { gameStateSlice } from './slices/game-state';
import { reducer as toastrReducer } from 'react-redux-toastr';

export const store = configureStore({
  reducer: {
    toastr: toastrReducer,
    [playersSlice.name]: playersSlice.reducer,
    [gameStateSlice.name]: gameStateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
