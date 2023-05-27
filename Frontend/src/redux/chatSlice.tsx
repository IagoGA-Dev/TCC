import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
  messages: { message: string; type: "text" | "image" | "file"; id: number }[];
}
const initialState: ChatState = {
  messages: [
    { message: "Olá a todos!", type: "text", id: 1 },
    { message: "Como vocês estão hoje?", type: "text", id: 2 },
    {
      message: "Alguém pode me ajudar com este problema?",
      type: "text",
      id: 3,
    },
    { message: "https://picsum.photos/200", type: "image", id: 4 },
    {
      message:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "file",
      id: 5,
    },
  ],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter((message) => message.id !== action.payload);
    },
  },
});

export const { addMessage, deleteMessage } = chatSlice.actions;

export default chatSlice.reducer;