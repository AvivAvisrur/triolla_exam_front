import {
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, setCreatedStatus } from "../redux/slices/taskSlice";
import { Task } from "../constants/TypesConstant";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router";

// interface ThemeToggleProps {}

const CreateTask: React.FC = () => {
  const [formFields, setFormFields] = useState<{
    title: string;
    description: string;
  }>(
    {} as {
      title: string;
      description: string;
    }
  );

  const isCreated = useSelector((state: RootState) => state.task.isCreated);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createTask(formFields));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/");
    }
  }, [isCreated]);
  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} md={8} lg={6}>
        <Paper
          elevation={3}
          sx={{
            padding: 4, // Adds padding inside the Paper
            width: "100%", // Makes it responsive
            maxWidth: 600, // Limits max width
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
              יצירת משימה חדשה
            </Typography>
            <TextField
              label={t("titleColumn")}
              name={"title"}
              onChange={(e) => {
                setFormFields((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label={t("descriptionColumn")}
              name={"description"}
              onChange={(e) => {
                setFormFields((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
              fullWidth
              sx={{ mb: 2 }}
            />
            {/* Add more form fields as needed */}
            <Button variant="contained" type="submit" color="primary" fullWidth>
              צור משימה
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateTask;
