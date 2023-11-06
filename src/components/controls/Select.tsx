import {
  FormControl,
  FormLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function Select(props) {
  const {
    name,
    label,
    placeholder,
    value,
    size,
    error = null,
    onChange,
    options,
  } = props;

  console.log(value);
  console.log(placeholder);

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <MuiSelect
        size={size || "small"}
        name={name}
        label={null}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      >
        <MenuItem disabled selected>
          {placeholder}
        </MenuItem>
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
