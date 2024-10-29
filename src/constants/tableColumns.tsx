import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { Task } from "./TypesConstant";
import { getUrgencyColor } from "../utils/helperFunctions";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import "../components/Table.css";
export const columns = (
  editTask: (taskId: string) => void
): ColumnDef<Task>[] => [
  {
    accessorKey: "title",
    header: t("titleColumn"),
  },
  {
    accessorKey: "description",
    header: t("descriptionColumn"),
  },
  {
    accessorKey: "priority",
    header: t("priorityColumn"),
    cell: ({ getValue }) => {
      const color = getUrgencyColor(getValue() as number);
      const isRed = color === "red"; // Check if the color is red
      return (
        <div
          className={isRed ? "blink" : ""}
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: getUrgencyColor(getValue() as number),
            margin: "0 auto", // Center the circle
          }}
        />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: t("createdAtColumn"),
    cell: ({ getValue }) => {
      return <span>{format(getValue() as Date, "dd-MM-yyyy")}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: t("actions"),
    cell: ({ row }) => {
      return (
        <IconButton color="primary" onClick={() => editTask(row.original.id)}>
          <EditIcon />
        </IconButton>
      );
    },
  },
];
