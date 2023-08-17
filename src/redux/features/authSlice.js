import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
	},
	reducers: {
		login: (state) => {
			state.isLoggedIn = true;
		},
		logout: (state) => {
			localStorage.removeItem("userId");
			state.isLoggedIn = false;
		},
	},
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
