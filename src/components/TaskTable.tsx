import {
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
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { columns } from "../constants/tableColumns";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

// interface TaskTableProps {
// }

const TaskTable: React.FC = () => {
  const { t } = useTranslation();
  const data = useSelector((state: RootState) => state.task.tasks);

  // const tableInstance = useReactTable({
  //   columns,
  //   data,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(), //order doesn't matter anymore!
  //   // etc.
  // });

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Grid item xs={12}>
      <TableContainer
        sx={{
          maxHeight: "70vh", // Set a maximum height that fits within your layout
          overflowY: "auto", // Enable vertical scrolling
        }}
        component={Paper}
      >
        <Table stickyHeader sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell align="center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell align="center" key={cell.id}>
                    {cell.column.id === "description"
                      ? t(`columns.description.${cell.getValue()}`, {
                          defaultValue: cell.getValue(), // fallback to original text if no key exists
                        })
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow
              sx={{
                position: "sticky",
                bottom: 0,
                backgroundColor: "background.paper",
                zIndex: 1,
                width: "100%",
              }}
            >
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: t("paginationSelectAll"), value: -1 },
                ]}
                colSpan={5}
                count={data.length}
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
