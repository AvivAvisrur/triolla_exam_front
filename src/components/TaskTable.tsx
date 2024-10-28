import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import I18Button from "./I18Button";

// interface TaskTableProps {
// }

const TaskTable: React.FC = () => {
  const { t } = useTranslation();

  const rows: number[] = [];
  return (
    <Grid item>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: t("paginationSelectAll"), value: -1 },
                ]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={15}
                page={5}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
                labelRowsPerPage={t("paginationRowPerPage")}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default TaskTable;
