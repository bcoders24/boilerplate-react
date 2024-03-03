import { Box } from "@mui/material";
import { useState } from "react";
import ConfirmationPopup from "src/components/common/Dialogs/ConfirmationPopup";
import Popup from "src/components/common/Dialogs/Popup";
import Button from "src/components/controls/Button";
import EmployeeForm from "src/pages/EmpForm";

const Users = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openC, setOpenC] = useState<boolean>(false);
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Button onClick={() => setOpen(true)}>Add or Edit</Button>
        <Button onClick={() => setOpenC(true)}>Confirmation Popup</Button>
      </Box>
      <ConfirmationPopup
        open={openC}
        onConfirm={() => {}}
        onClose={() => setOpenC(false)}
        title="Confirmation"
        message="Are you sure you want to peform this action?"
      />
      <Popup openPopup={open} onClose={() => setOpen(false)} title="My popup">
        <EmployeeForm addOrEdit={() => {}} recordForEdit={undefined} />
      </Popup>
    </Box>
  );
};

export default Users;
