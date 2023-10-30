export interface ButtonProps {
  children?: any;
  type?: "submit" | "reset" | "button";
  text?: string;
  size?: "small" | "medium" | "large";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant?: "contained" | "outlined" | "text";
  onClick?: () => void;
  disabled?: boolean;
  sx?: object;
}

export type ButtonType = "submit" | "reset" | "button" | undefined;
