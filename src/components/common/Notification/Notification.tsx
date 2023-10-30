import { SnackbarCloseReason, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import Controls from "src/components/controls/Controls";
import { StoreModel } from "store/store";
import { useNotification } from "src/hooks/useNotification";
import CloseIcon from "@mui/icons-material/Close";

export const Notification = (): JSX.Element => {
  const notification = useSelector((state: StoreModel) => state.notification);
  const { clearNotification } = useNotification();

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) =>
    reason !== "clickaway" && clearNotification();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={notification.open}
      autoHideDuration={notification.timeout}
      onClose={handleClose}
      message={notification.message}
      action={
        <Controls.IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </Controls.IconButton>
      }
    />
  );
};
