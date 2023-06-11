import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
  group_ID: number;
  name: string;
  description: string;
  image: string;
  members: number;
  createdAt: Date;
  private: boolean;
}
const initialState: ChatState = {
  group_ID: 0,
  name: "",
  description: "",
  image: "",
  members: 0,
  createdAt: new Date(),
  private: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    changeGroupID(state, action) {
      state.group_ID = action.payload.ID;
    },
    changeGroup(state, action) {
      state.group_ID = action.payload.ID;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.image = action.payload.image;
      state.members = action.payload.members;
      state.createdAt = action.payload.createdAt;
    }
  },
});

export const { changeGroupID, changeGroup } = chatSlice.actions;

export default chatSlice.reducer;