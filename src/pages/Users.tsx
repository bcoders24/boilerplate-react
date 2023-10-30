import { useState } from "react";
import ConfirmationPopup from "src/components/common/Dialogs/ConfirmationPopup";
import Popup from "src/components/common/Dialogs/Popup";
import Button from "src/components/controls/Button";
import EmployeeForm from "src/components/pages/EmpForm";

const Users = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openC, setOpenC] = useState<boolean>(false);
  return (
    <>
      {/* <EmployeeForm /> */}
      <Button onClick={() => setOpen(true)}>Click</Button>
      <Button onClick={() => setOpenC(true)}>Click</Button>
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
    </>
  );
};

export default Users;
