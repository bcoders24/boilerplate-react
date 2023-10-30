import { Button as MuiButton } from "@mui/material";
import { ButtonProps } from "src/models/general/ButtonType";

export default function Button(props: ButtonProps) {
  const { type, children, size, text, color, variant, onClick, sx, disabled } =
    props;

  return (
    <MuiButton
      type={type}
      size={size || "small"}
      variant={variant || "contained"}
      color={color || "primary"}
      onClick={onClick}
      disabled={disabled}
      sx={sx}
    >
      {text || children}
    </MuiButton>
  );
}
