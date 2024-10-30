import "./App.css";

import "./i18n/i18n";

import TaskTable from "./components/TaskTable";
import CreateOrUpdateTask from "./components/CreateOrUpdateTask";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import TableSkeleton from "./components/TableSkeleton";
import { Alert, Button, Fade, Grid, Snackbar, Typography } from "@mui/material";
import ThemeToggle from "./components/ThemeToggle";
import I18Button from "./components/I18Button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getAllTasks, setCreatedStatus } from "./redux/slices/taskSlice";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ErrorHandler from "./components/ErrorHandler";
import i18next from "i18next";
import TaskTableFilters from "./components/TaskTableFilters";

function App() {
  const isTableLoading = useSelector(
    (state: RootState) => state.task.isLoading
  );
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isCreated = useSelector((state: RootState) => state.task.isCreated);
  const {
    page,
    limit,
    filters: { titleFilter, priorityFilter },
  } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    dispatch(getAllTasks({}));
  }, [page, limit, titleFilter, priorityFilter]);

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
      <>
        <Grid
          item
          container
          xs={12}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {t("taskTable")}
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent={"center"}
            alignItems="center"
            xs={12}
            md={6}
          >
            <Grid item xs={4} md={4}>
              <ThemeToggle />
            </Grid>
            <Grid item xs={3} md={4}>
              <I18Button />
            </Grid>
          </Grid>
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={12} container justifyContent="center" sx={{ mb: 2 }}>
          {location.pathname !== "/create-task" && ( // Conditionally render the button
            <Button
              sx={{
                textTransform: "none",
                paddingX: 3,
                paddingY: 1,
                background: "linear-gradient(45deg, #3f51b5, #9c27b0)",
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                mr: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  background: "linear-gradient(45deg, #5c6bc0, #ba68c8)",
                },
              }}
              component={Link}
              to="/create-task"
            >
              {t("createTask")}
            </Button>
          )}

          {location.pathname !== "/" && (
            <Button
              sx={{
                textTransform: "none",
                paddingX: 3,
                paddingY: 1,
                background: "linear-gradient(45deg, #3f51b5, #9c27b0)",
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  background: "linear-gradient(45deg, #5c6bc0, #ba68c8)",
                },
                mr: 2,
              }}
              component={Link}
              to="/"
            >
              {t("home")}
            </Button>
          )}
        </Grid>
        <TaskTableFilters />

        {/* Routes */}
        <Routes>
          <Route path="/create-task" element={<CreateOrUpdateTask />} />
          <Route path="/edit-task/:id" element={<CreateOrUpdateTask />} />

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
      </>
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
