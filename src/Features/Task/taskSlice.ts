import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../App/axios";

interface Task {
  id?: string;
  projectId: string;
  name: string;
  description?: string;
  parentId?: string; 
}

interface TaskState {
  isLoading: boolean;
  error: string | null;
  tasks: any[];
}

const initialState: TaskState = {
  isLoading: false,
  error: null,
  tasks: [],
};
const currentToken = localStorage.getItem("token") ?? "";
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (projectId: string) => {
    const response = await authApi.get(`/v1/project/${projectId}/task`, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    return response.data;
  }
);

export const createTask = async (task: any) => {
  const response = await authApi.post(
    `/v1/project/${task.parent_id}/task`,
    task,
    {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    }
  );
  return response.data;
};

export const fetchTaskDetails = createAsyncThunk(
  "task/fetchTaskDetails",
  async ({ projectId, taskId }: { projectId: string; taskId: string }) => {
    const response = await authApi.get(
      `/v1/project/${projectId}/task/${taskId}`
    );
    return response.data;
  }
);

export const updateTask = async ({
  taskId,
  task,
}: {
  taskId: string;
  task: any;
}) => {
  const response = await authApi.put(
    `/v1/project/${task.projectId}/task/${taskId}`,
    task,
    {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    }
  );
  return response.data;
};

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async ({ projectId, taskId }: { projectId: string; taskId: string }) => {
    const response = await authApi.delete(
      `/v1/project/${projectId}/task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }
    );
    return taskId;
  }
);

export const assignTask = async ({
  projectId,
  taskId,
  assignee_id,
}: {
  projectId: string;
  taskId: string;
  assignee_id: string;
}) => {
  const response = await authApi.post(
    `/v1/project/${projectId}/task/${taskId}/assign`,
    { assignee_id }
  );
  return response.data;
};
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export default taskSlice.reducer;
