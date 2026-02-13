import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface VideoChatState {
  status: 'idle' | 'searching' | 'connected' | 'failed';
  remotePeerId: string | null;
  error: string | null;
}

const initialState: VideoChatState = {
  status: 'idle',
  remotePeerId: null,
  error: null,
};

export const videochatSlice = createSlice({
  name: 'videochat',
  initialState,
  reducers: {
    setSearching: (state) => {
      state.status = 'searching';
      state.remotePeerId = null;
      state.error = null;
    },
    setConnected: (state, action: PayloadAction<string>) => {
      state.status = 'connected';
      state.remotePeerId = action.payload; // Store the stranger's Socket ID
    },
    setDisconnected: (state) => {
      state.status = 'idle';
      state.remotePeerId = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setSearching, setConnected, setDisconnected, setError } = videochatSlice.actions;
export default videochatSlice.reducer;