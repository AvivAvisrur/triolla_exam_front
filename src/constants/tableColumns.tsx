import { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { Task } from "./TypesConstant";
import { getUrgencyColor } from "../utils/helperFunctions";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const columns: ColumnDef<Task>[] = [
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
    cell: ({ getValue }) => (
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: getUrgencyColor(getValue() as number),
          margin: "0 auto", // Center the circle
        }}
      />
    ),
  },
  {
    accessorKey: "created_at",
    header: t("createdAtColumn"),
  },
  {
    accessorKey: "actions",
    header: t("actions"),
    cell: ({ row }) => (
      <IconButton color="primary" aria-label="edit">
        <EditIcon />
      </IconButton>
    ),
  },
];
