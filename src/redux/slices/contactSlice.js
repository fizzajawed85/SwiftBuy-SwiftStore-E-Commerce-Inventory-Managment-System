import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  loading: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    sendMessage(state, action) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { sendMessage, clearMessages } = contactSlice.actions;
export default contactSlice.reducer;
