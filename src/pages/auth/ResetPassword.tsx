// import { IChangePassword } from "models/data/ChangePasswordModel";
// import { IError } from "models/general/ErrorType";
import withAuthLayout from "src/hoc/withAuthLayout";

const ResetPassword = () => {
  return (
    <div>
      <h4>Change Password</h4>
    </div>
  );
};

export default withAuthLayout(ResetPassword);
