import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '@splash-software-crash/contracts';

const initialState: {
  state: GameState;
  rate: number;
  secretNumber: number | null;
} = {
  state: GameState.betting,
  rate: 0,
  secretNumber: null,
};

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setState(state, { payload }: PayloadAction<GameState>) {
      state.state = payload;
    },
    setRate(state, { payload }: PayloadAction<number>) {
      state.rate = payload;
    },
    showSecretNumber(state, { payload }: PayloadAction<number>) {
      state.secretNumber = payload;
    },
  },
});

export const gameStateActions = gameStateSlice.actions;
