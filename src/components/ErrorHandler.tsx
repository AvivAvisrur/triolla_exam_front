import React, { useEffect, useState } from "react";
import { Alert, Fade, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearError } from "../redux/slices/errorSlice";

const ErrorHandler: React.FC = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(
    (state: RootState) => state.error.errorMessage
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setOpen(true); // Open Snackbar when an error occurs
    }
  }, [errorMessage]);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearError()); // Clear error after closing Snackbar
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={errorMessage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={Fade}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorHandler;
