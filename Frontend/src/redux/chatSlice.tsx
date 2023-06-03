import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
  group_ID: number;
}
const initialState: ChatState = {
  group_ID: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    changeGroupID(state, action) {
      state.group_ID = action.payload;
    },
  },
});

export const { changeGroupID } = chatSlice.actions;

export default chatSlice.reducer;