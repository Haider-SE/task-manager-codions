import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../App/axios";

interface User {
  id?: number;
  name: string;
  role: string;
  password?: string;
  email?: string;
}

interface UserState {
  isLoading: boolean;
  error: string | null;
  users: User[];
}

const initialState: UserState = {
  isLoading: false,
  error: null,
  users: [],
};
const currentToken = localStorage.getItem("token") ?? "";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await authApi.get("/v1/admin/user", {
    headers: {
      Authorization: `Bearer ${currentToken}`,
    },
  });
  return response.data;
});

export const createUser = async (userData: User) => {
  const response = await authApi.post("/v1/admin/user", userData, {
    headers: {
      Authorization: `Bearer ${currentToken}`,
    },
  });
  return response.data;
};


export const updateUser = async ({
  id,
  userData,
}: {
  id: string;
  userData: User;
}) => {
  const response = await authApi.put(`/v1/admin/user/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${currentToken}`,
    },
  });
  return response.data;
};


export const deleteUser = async (id: number) => {
  try {
    const response = await authApi.delete(`/v1/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    if (response.status === 204) {
      return id; 
    }
  } catch (error: any) {
    console.log("error", error);
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
