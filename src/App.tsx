import "./App.css";

import "./i18n/i18n";

import TaskTable from "./components/TaskTable";
import CreateTask from "./components/CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import TableSkeleton from "./components/TableSkeleton";
import { Alert, Button, Fade, Grid, Snackbar, Typography } from "@mui/material";
import ThemeToggle from "./components/ThemeToggle";
import I18Button from "./components/I18Button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getAllTasks, setCreatedStatus } from "./redux/slices/taskSlice";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ErrorHandler from "./components/ErrorHandler";
import i18next from "i18next";

function App() {
  const isTableLoading = useSelector(
    (state: RootState) => state.task.isLoading
  );
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const isCreated = useSelector((state: RootState) => state.task.isCreated);

  useEffect(() => {
    dispatch(getAllTasks({}));
  }, []);

  useEffect(() => {
    // Change direction based on the language
    document.body.setAttribute(
      "dir",
      i18next.language === "he" ? "rtl" : "ltr"
    );
  }, [i18next.language]);
  
  return (
    <Grid
      container
      maxWidth="100"
      maxHeight="50%"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Router>
        <Grid
          item
          container
          xs={12}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid
            item
            container
            justifyContent={"flex-end"}
            alignItems="center"
            xs={3}
          >
            <Grid item xs={5}>
              <ThemeToggle />
            </Grid>
            <Grid item xs={3}>
              <I18Button />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              {t("taskTable")}
            </Typography>
          </Grid>
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={12} container justifyContent="center" sx={{ mb: 2 }}>
          <Button component={Link} to="/create-task">
            {t("createTask")}
          </Button>
          <Button component={Link} to="/" sx={{ mr: 2 }}>
            {t("home")}
          </Button>
        </Grid>

        {/* Routes */}
        <Routes>
          <Route path="/create-task" element={<CreateTask />} />

          <Route
            path="/"
            element={
              isTableLoading ? (
                <TableSkeleton columnCount={4} rowCount={10} />
              ) : (
                <TaskTable />
              )
            }
          />
        </Routes>
      </Router>
      <Snackbar
        open={isCreated}
        autoHideDuration={1500}
        onClose={() => {
          dispatch(setCreatedStatus());
        }}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {isCreated ? t("userCreated") : t("userNotCreated")}
        </Alert>
      </Snackbar>
      <ErrorHandler />
    </Grid>
  );
}

export default App;
