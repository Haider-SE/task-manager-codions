import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../App/axios";

interface ProfileState {
  isLoading: boolean;
  error: string | null;
  profile: any;
}

const initialState: ProfileState = {
  isLoading: false,
  error: null,
  profile: null,
};

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (currentToken: string) => {
    const response = await authApi.get("/v1/profile", {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (profileData: { userName: string; password: string }) => {
    const response = await authApi.post("/v1/profile", profileData);
    return response.data;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch profile";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload; 
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update profile";
      });
  },
});

export default profileSlice.reducer;
