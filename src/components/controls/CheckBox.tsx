import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";

export default function Checkbox(props) {
  const { label, size, checked, onChange } = props;
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            size={size || "small"}
            color="primary"
            checked={checked}
            onChange={onChange}
          />
        }
        label={label}
      />
    </FormControl>
  );
}
