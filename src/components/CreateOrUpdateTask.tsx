import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { t } from "i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrUpdateTask,
  getTaskById,
  setFormFields,
  setTaskToEdit,
} from "../redux/slices/taskSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router";

// interface ThemeToggleProps {}

const CreateOrUpdateTask: React.FC = () => {
  const taskToUpdate = useSelector((state: RootState) => state.task.taskToEdit);

  //If user found , initialize the state with the redux , if not get empty object.

  const isCreated = useSelector((state: RootState) => state.task.isCreated);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createOrUpdateTask(taskToUpdate));
  };
  useEffect(() => {
    if (id) {
      dispatch(getTaskById({ id }));
    } else {
      dispatch(setTaskToEdit({}));
    }
  }, [id]);

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
                dispatch(
                  setFormFields({
                    fieldName: "title",
                    value: e.target.value,
                  })
                );
              }}
              value={taskToUpdate?.title}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label={t("descriptionColumn")}
              name={"description"}
              value={taskToUpdate?.description}
              onChange={(e) => {
                dispatch(
                  setFormFields({
                    fieldName: "description",
                    value: e.target.value,
                  })
                );
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

export default CreateOrUpdateTask;
