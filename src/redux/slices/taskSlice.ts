import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FiltersType } from "../../constants/TypesConstant";

import axiosApi from "../../constants/axiosApi";
import { AxiosError, isAxiosError } from "axios";
import { setError } from "./errorSlice";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: number;
  created_at: Date;
};

type CreateTask = {
  title: string;
  description: string;
};
interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  isCreated: boolean;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  isCreated: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setCreatedStatus: (state) => {
      state.isCreated = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
      state.tasks = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllTasks.rejected, (state) => {
      state.tasks = [];
      state.isLoading = false;
    });
    builder.addCase(createTask.fulfilled, (state) => {
      state.isCreated = true;
    });
    builder.addCase(createTask.rejected, (state) => {
      state.isCreated = false;
    });
  },
});

export const getAllTasks = createAsyncThunk<
  Task[],
  FiltersType,
  { rejectValue: string } // The rejection type
>(
  "tasks/getAll",
  async (
    { title, description, priority, created_at },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosApi.get<Task[]>("/tasks", {
        params: {
          title,
          description,
          priority,
          created_at,
        },
      });
      return response.data || []; // Fallback to an empty array if `response.data` is undefined
    } catch (err: unknown) {
      console.log(err);

      if (isAxiosError(err)) {
        const axiosError = err as AxiosError;
        dispatch(
          setError({
            message: axiosError.message,
            code: axiosError.response?.status || 500, // Use response status if available, default to 500
          })
        );
        return rejectWithValue(axiosError.message);
      } else {
        // Handle non-Axios errors
        dispatch(
          setError({
            message: "An unknown error occurred",
            code: 500,
          })
        );
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const createTask = createAsyncThunk<
  CreateTask,
  { title: string; description: string },
  { rejectValue: string }
>(
  "tasks/createTask",
  async ({ title, description }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosApi.post<CreateTask>("/tasks", {
        title,
        description,
      });

      return response.data;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const axiosError = err as AxiosError;
        dispatch(
          setError({
            message: axiosError.message,
            code: axiosError.response?.status || 500, // Use response status if available, default to 500
          })
        );
        return rejectWithValue(axiosError.message);
      } else {
        // Handle non-Axios errors
        dispatch(
          setError({
            message: "An unknown error occurred",
            code: 500,
          })
        );
        return rejectWithValue("An unknown error occurred");
      } // Reject with a value instead of returning undefined
    }
  }
);

export const { setTasks, setCreatedStatus } = taskSlice.actions;

export default taskSlice.reducer;
