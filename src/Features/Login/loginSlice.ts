import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../App/axios";

interface LoginState {
  isLoading: boolean;
  error: string | null;
  responseData: any;
}

const initialState: LoginState = {
  isLoading: false,
  error: null,
  responseData: null,
};
interface Data {
  email: string;
  password: string;
}
export const login = createAsyncThunk("login/login", async (payload: Data) => {
  try {
    const response = await authApi.post("/v1/login", payload);
    localStorage.setItem("role", response.data.data.user.role);
    localStorage.setItem("token", response.data.data.token);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.responseData = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.responseData = null;
      });
  },
});

export default loginSlice.reducer;
