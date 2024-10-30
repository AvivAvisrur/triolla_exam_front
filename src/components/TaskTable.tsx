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
  getPaginationRowModel,
} from "@tanstack/react-table";
import { columns } from "../constants/tableColumns";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
// import { setTaskToEdit } from "../redux/slices/taskSlice";
import { useNavigate } from "react-router";
import { setPage } from "../redux/slices/taskSlice";

// interface TaskTableProps {
// }

const TaskTable: React.FC = () => {
  const { t } = useTranslation();
  const { tasks, page, totalCount } = useSelector(
    (state: RootState) => state.task
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const editTask = (task_id: string) => {
    // dispatch(setTaskToEdit(task_id));
    navigate(`/edit-task/${task_id}`);
  };

  const table = useReactTable({
    data: tasks,
    columns: columns(editTask),
    state: {
      pagination: {
        pageIndex: page,
        pageSize: totalCount,
      },
    },
    onPaginationChange: (updater) => {
      console.log(updater);

      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex: page, pageSize: totalCount })
          : updater;
      console.log(newPagination, "newPagination");
      //   setPage(newPagination.pageIndex);
      //   setPageSize(newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, // Enables controlled pagination
  });

  return (
    <>
      <Grid container>
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
                    count={totalCount}
                    rowsPerPage={5}
                    page={Math.max(0, page - 1)}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={(event, newPage) => {
                      dispatch(setPage(newPage + 1));
                    }}
                    onRowsPerPageChange={() => {}}
                    labelRowsPerPage={t("paginationRowPerPage")}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default TaskTable;
