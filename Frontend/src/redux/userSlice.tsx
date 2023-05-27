import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  name: string;
  email: string;
  cpf: string;
  institutionId: number;
  JWT_ACCESS: string;
  JWT_REFRESH: string;
}

const initialState: UserState = {
  id: 0,
  name: "",
  email: "",
  cpf: "",
  institutionId: 0,
  JWT_ACCESS: "",
  JWT_REFRESH: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, email, JWT_ACCESS } =
        action.payload;
        state.id = id;
        state.name = name;
        state.email = email;
        state.JWT_ACCESS = JWT_ACCESS;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
