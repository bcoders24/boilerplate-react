import {
  FormControl,
  FormLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function Select(props) {
  const { name, label, value, size, error = null, onChange, options } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <MuiSelect
        size={size || "small"}
        name={name}
        label={null}
        value={value}
        onChange={onChange}
      >
        {options.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
