import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ErrorState {
  errorMessage: string | null;
  errorCode: number | null;
}

const initialState: ErrorState = {
  errorMessage: null,
  errorCode: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{ message: string; code: number }>
    ) => {
      state.errorMessage = action.payload.message;
      state.errorCode = action.payload.code;
    },
    clearError: (state) => {
      state.errorMessage = null;
      state.errorCode = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
