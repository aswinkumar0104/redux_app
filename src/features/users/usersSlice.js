import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Aswin" },
  { id: "1", name: "Aaron" },
  { id: "2", name: "Kumar" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;
