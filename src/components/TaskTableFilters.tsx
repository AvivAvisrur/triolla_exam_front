import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {t("priorityColumn")}
          </InputLabel>
          <Select
            size="small"
            name={"priorityFilter"}
            label={t("priorityColumn")}
            onChange={(e) =>
              dispatch(
                setFilters({
                  name: e.target.name,
                  value: e.target.value as string,
                })
              )
            }
          >
            <MenuItem value={"LOW"}>{t("lowPriority")}</MenuItem>
            <MenuItem value={"MID"}>{t("midPriority")}</MenuItem>
            <MenuItem value={"HIGH"}>{t("highPriority")}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default TaskTableFilters;
