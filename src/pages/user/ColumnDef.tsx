import { createColumnHelper } from "@tanstack/react-table";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Controls from "src/components/controls/Controls";
import dayjs from "dayjs";

type Person = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender?: string;
  ip_address?: string;
  phone?: string;
  date: string;
};

const columnHelper = createColumnHelper<Person>();

export const columnDef = (editRecord, deleteRecord) => [
  {
    header: "Id",
    accessorKey: "id",
    id: "id",
  },
  columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
    header: "Full Name",
    id: "first_name",
  }),
  {
    header: "Email",
    accessorKey: "email",
    id: "email",
    enableGlobalFilter: false,
    enableSorting: false,
  },
  {
    header: "Phone",
    accessorKey: "phone",
    id: "phone",
  },
  {
    header: "Gender",
    accessorKey: "gender",
    id: "gender",
  },
  {
    header: "Date",
    accessorKey: "date",
    id: "date",
    cell: ({ getValue }) => {
      const dateValue = getValue();
      if (dateValue && dayjs(dateValue).isValid()) {
        return dayjs(dateValue).format("YYYY-MM-DD");
      }
    },
  },
  {
    header: "Actions",
    accessor: "id",
    cell: ({ row: { original: record } }) => {
      return (
        <Stack direction="row" gap="6px">
          <Controls.IconButton onClick={() => editRecord(record)}>
            <EditIcon sx={{ fontSize: "20px" }} color="primary" />
          </Controls.IconButton>
          <Controls.IconButton onClick={() => deleteRecord(record)}>
            <DeleteIcon sx={{ fontSize: "20px" }} color="error" />
          </Controls.IconButton>
        </Stack>
      );
    },
  },
];
