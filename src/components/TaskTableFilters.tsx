import { Grid, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { setFilters } from "../redux/slices/taskSlice";
import { t } from "i18next";
import { debounce } from "lodash";

const TaskTableFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Define a debounced search function
  const debouncedSearch = useCallback(
    debounce((e) => {
      dispatch(setFilters({ name: e.target.name, value: e.target.value }));
    }, 300), // 300ms delay
    []
  );
  return (
    <Grid
      item
      container
      rowSpacing={3}
      justifyContent={"space-between"}
      xs={12}
    >
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label={t("titleSearch")}
          name="titleFilter"
          onChange={debouncedSearch}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label={t("titleSearch")}
          //   onChange={(e) => {
          //     dispatch(setFilters({ name: "title", value: e.target.value }));
          //   }}
        />
      </Grid>
    </Grid>
  );
};

export default TaskTableFilters;
