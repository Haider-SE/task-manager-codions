import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authApi } from "../../App/axios";
import { RootState } from "../../App/store";

interface Project {
  id?: string;
  name: string;
  description?: string;
  data?: any;
  status?: any;
}

interface ProjectState {
  isLoading: boolean;
  error: string | null;
  projects: Project[];
  projectAgainstUser: Project[];
}

const initialState: ProjectState = {
  isLoading: false,
  error: null,
  projects: [],
  projectAgainstUser: [],
};
const currentToken = localStorage.getItem("token") ?? "";


export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    const response = await authApi.get("/v1/admin/project", {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    return response.data;
  }
);
interface ThunkApiConfig {
  state: RootState;
  rejectValue: {
    message: string;
  };
}

export const fetchProjectsAgainstUser = createAsyncThunk<
  Project[],
  void,
  ThunkApiConfig
>("project/fetchProjectsAgainstUser", async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.get("/v1/project", {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    return response.data.data; 
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch projects for user",
    });
  }
});
export const createProject = createAsyncThunk<
  Project | void,
  Project,
  ThunkApiConfig
>("project/createProject", async (project, { rejectWithValue }) => {
  try {
    const response = await authApi.post("/v1/admin/project", project, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    
    if (response.status === 201) {
     
      return response.data || {}; 
    }
    return rejectWithValue({ message: "Unexpected response status" });
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to create project",
    });
  }
});

export const updateProject = async ({ projectId, projectData }: any) => {
  try {
    const response = await authApi.put(
      `/v1/admin/project/${projectId}`,
      projectData,
      { headers: { Authorization: `Bearer ${currentToken}` } }
    );
    return response.data;
  } catch (error: any) {
    return "";
  }
};


export const deleteProject = async (projectId: number) => {
  await authApi.delete(`/v1/admin/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${currentToken}`,
    },
  });
  return projectId;
};

export const assignProject = async ({ projectId, userIds }: any) => {
  try {
    const response = await authApi.post(
      `/v1/admin/project/${projectId}/assign`,
      {
        user_ids: userIds,
      },
      {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return "";
  }
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsAgainstUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjectsAgainstUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.projectAgainstUser = action.payload.data;
        state.error = null;
      })
      .addCase(fetchProjectsAgainstUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error =
          action.payload.status || "Failed to fetch user-specific projects";
      })
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          state.projects.push(action.payload);
        }
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default projectSlice.reducer;
