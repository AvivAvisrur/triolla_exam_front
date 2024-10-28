import "./App.css";

import "./i18n/i18n";

import TaskTable from "./components/TaskTable";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import TableSkeleton from "./components/TableSkeleton";
import { Grid, Typography } from "@mui/material";
import ThemeToggle from "./components/ThemeToggle";
import I18Button from "./components/I18Button";
import { useTranslation } from "react-i18next";

function App() {
  const isTableLoading = useSelector(
    (state: RootState) => state.task.isLoading
  );
  const { t } = useTranslation();

  return (
    <Grid
      container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Grid
        item
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"space-between"}
        xs={12}
        container
        sx={{ mb: 2 }}
      >
        <Grid item container alignItems={"center"} xs={6}>
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

      {isTableLoading ? (
        <TableSkeleton columnCount={4} rowCount={10} />
      ) : (
        <TaskTable />
      )}
    </Grid>
  );
}

export default App;
