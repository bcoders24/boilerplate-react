import {
  LocalizationProvider,
  DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputLabel, Box } from "@mui/material";

export default function DatePicker(props) {
  const { label, value, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <InputLabel>{label}</InputLabel>
        <MuiDatePicker
          slotProps={{
            // textField: { size: "small", InputLabelProps: { shrink: true } },
            textField: { size: "small", label: null },
          }}
          disableFuture
          label={label}
          format="YYYY-MM-DD"
          value={value}
          onChange={(date) => onChange(date)}
        />
      </Box>
    </LocalizationProvider>
  );
}
