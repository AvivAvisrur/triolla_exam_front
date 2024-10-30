import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axiosApi from "../../constants/axiosApi";
import { AxiosError, isAxiosError } from "axios";
import { setError } from "./errorSlice";
import { AppDispatch, RootState } from "../store";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: number;
  created_at: Date;
};

type CreateOrUpdateTask = {
  id?: string;
  title?: string;
  description?: string;
};
interface FilterState {
  [key: string]: string; // Index signature for dynamic keys
}
interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  isCreated: boolean;
  taskToEdit: CreateOrUpdateTask;
  page: number;
  totalCount: number;
  limit: number;
  filters: FilterState;
}
interface SetFormFieldsPayload {
  fieldName: keyof CreateOrUpdateTask;
  value: CreateOrUpdateTask[keyof CreateOrUpdateTask];
}

const initialState: TaskState = {
  tasks: [],
  taskToEdit: {},
  isLoading: false,
  isCreated: false,
  page: 1,
  totalCount: 0,
  limit: 5,
  filters: {},
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
    setTaskToEdit: (state, { payload }) => {
      state.taskToEdit = payload;
    },
    setFormFields: (state, { payload }: { payload: SetFormFieldsPayload }) => {
      state.taskToEdit[payload.fieldName] = payload.value;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setFilters: (
      state,
      { payload }: PayloadAction<{ name: string; value: string }>
    ) => {
      state.filters[payload.name] = payload.value;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
      state.tasks = payload.tasks;
      state.page = payload.page;
      state.totalCount = payload.totalCount;
      state.isLoading = false;
    });
    builder.addCase(getAllTasks.rejected, (state) => {
      state.tasks = [];
      state.page = 1;
      state.totalCount = 0;
      state.isLoading = false;
    });
    builder.addCase(createOrUpdateTask.fulfilled, (state) => {
      state.isCreated = true;
    });
    builder.addCase(createOrUpdateTask.rejected, (state) => {
      state.isCreated = false;
    });
    builder.addCase(getTaskById.fulfilled, (state, { payload }) => {
      state.taskToEdit = payload;
    });
  },
});

export const getAllTasks = createAsyncThunk<
  { tasks: Task[]; page: number; totalCount: number },
  unknown,
  { state: RootState; rejectValue: string } // The rejection type
>("tasks/getAll", async (_, { getState, dispatch, rejectWithValue }) => {
  const page = getState().task.page;
  const limit = getState().task.limit;
  const filters = getState().task.filters;
  try {
    const response = await axiosApi.get<{
      tasks: Task[];
      page: number;
      totalCount: number;
    }>("/tasks", {
      params: {
        limit,
        page,
        ...filters,
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
});

export const createOrUpdateTask = createAsyncThunk<
  CreateOrUpdateTask,
  { id?: string; title?: string; description?: string },
  { dispatch: AppDispatch; rejectValue: string }
>(
  "tasks/createTask",
  async ({ id, title, description }, { dispatch, rejectWithValue }) => {
    try {
      console.log(id);
      const response = await axiosApi.post<CreateOrUpdateTask>(
        id ? `/tasks/${id}` : "/tasks",
        {
          title,
          description,
        }
      );

      if (response.status === 200) {
        dispatch(getAllTasks({}));
      }
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

export const getTaskById = createAsyncThunk<
  Task,
  { id: string },
  { rejectValue: string }
>("tasks/getTaskById", async ({ id }, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosApi.get<Task>(`/tasks/${id}`);

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
});

export const {
  setTasks,
  setCreatedStatus,
  setTaskToEdit,
  setFormFields,
  setPage,
  setFilters,
} = taskSlice.actions;

export default taskSlice.reducer;
