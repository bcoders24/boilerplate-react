import { IconButton as MuiIconButton } from "@mui/material";

export default function IconButton(props) {
  const { children, size, color, onClick, disabled, ...other } = props;

  return (
    <MuiIconButton
      size={size || "inherit"}
      color={color}
      onClick={onClick}
      disabled={disabled}
      {...other}
    >
      {children}
    </MuiIconButton>
  );
}
