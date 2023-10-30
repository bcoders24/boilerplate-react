import { Stack, InputLabel, TextField } from "@mui/material";

export default function Input(props) {
  const {
    type,
    name,
    label,
    value,
    size,
    error = null,
    onChange,
    inputProps,
    placeholder,
  } = props;
  return (
    <Stack>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <TextField
        type={type || "text"}
        size={size || "small"}
        variant="outlined"
        label={null}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        InputProps={inputProps}
        // InputLabelProps={{ shrink: true }}
        {...(error && { error: true, helperText: error })}
      />
    </Stack>
  );
}
