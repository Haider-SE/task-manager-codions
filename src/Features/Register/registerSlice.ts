import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../App/axios";

interface SignupState {
  isLoading: boolean;
  error: string | null;
}

const initialState: SignupState = {
  isLoading: false,
  error: null,
};
interface Data {
  name: string;
  password: string;
  email: string;
}
export const register = createAsyncThunk(
  "register/register",
  async (payload: Data) => {
    try {
      const response = await authApi.post("/v1/register", payload);
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerSlice.reducer;
