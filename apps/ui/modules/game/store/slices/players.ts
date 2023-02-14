import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerDTO } from '@splash-software-crash/contracts';

const initialState: {
  players: PlayerDTO[];
} = {
  players: [],
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer(state, { payload }: PayloadAction<PlayerDTO>) {
      state.players.push(payload);
    },
    setPlayers(state, { payload }: PayloadAction<PlayerDTO[]>) {
      state.players = payload;
    },
    cleanPlayers(state) {
      state.players = [];
    },
  },
});

export const playersActions = playersSlice.actions;
