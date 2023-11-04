import { useState } from "react";
import dataJSON from "components/data.json";
import { columnDef } from "./ColumnDef";
import CustomTable from "src/components/controls/Table";
import ConfirmationPopup from "src/components/common/Dialogs/ConfirmationPopup";
import Popup from "src/components/common/Dialogs/Popup";
import UserForm from "./AddEditUser";

const UserData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(dataJSON);

  const changeData = (params) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // console.log(params);
  };

  const deleteRecord = (record) => {
    setSelectedRecord(record);
    setConfirmation(true);
  };

  const editRecord = (record) => {
    setSelectedRecord(record);
    setEditing(true);
  };

  const handleClose = () => {
    setEditing(false);
    setConfirmation(false);
    setTimeout(() => {
      setSelectedRecord(null);
    }, 0);
  };

  return (
    <>
      <CustomTable
        addUser={() => setEditing(true)}
        columnDef={columnDef(editRecord, deleteRecord)}
        data={data}
        changeData={changeData}
        loading={loading}
      />
      <Popup
        openPopup={editing}
        onClose={handleClose}
        title={selectedRecord ? "Edit User" : "Add User"}
      >
        <UserForm
          addOrEdit={() => {}}
          recordForEdit={selectedRecord ? selectedRecord : undefined}
          handleClose={handleClose}
        />
      </Popup>
      <ConfirmationPopup
        open={confirmation}
        onConfirm={() => {}}
        onClose={handleClose}
        title="Confirmation"
        message="Are you sure you want to peform this action?"
      />
    </>
  );
};

export default UserData;
