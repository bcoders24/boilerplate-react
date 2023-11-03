import { IChangePasswordResponse } from "models/api/ChangePasswordResponse";
import { IError } from "models/general/ErrorType";
import { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import withAuthLayout from "src/hoc/withAuthLayout";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNotification } from "src/hooks/useNotification";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "src/store/services/authService";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordValidation } from "src/utils/Validations";
import { InitialValues, Paths } from "src/constants";
import { IResetPassword } from "src/models/data/auth";
import ButtonLoader from "src/components/common/Loader/ButtonLoader";
import Controls from "src/components/controls/Controls";

type ResetPasswordResponseData = {
  data: IChangePasswordResponse;
  error: IError;
};

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { displayNotification } = useNotification();
  const handleClickShowPassword = () => setPasswordVisible((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setConfirmPasswordVisible((prev) => !prev);
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useResetPasswordMutation();

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<IResetPassword>({
    resolver: yupResolver(resetPasswordValidation),
    defaultValues: InitialValues.resetPasswordValues,
  });

  const onSubmit = async (data: IResetPassword) => {
    const resetPasswordData: IResetPassword = {
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    try {
      const { data, error } = (await forgotPassword(
        resetPasswordData
      )) as ResetPasswordResponseData;
      if (error) {
        console.error("Forgot password failed:", error);
        return;
      }
      console.log("Forgot password successful:", data);
      displayNotification({ message: "Password Updated Successfully" });
      navigate(Paths.LOGIN, { replace: true });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <Stack
      justifyContent="center"
      width="270px"
      height="100%"
      mx="auto"
      gap="8px"
    >
      <Typography fontSize="16px" fontWeight={700}>
        Reset Password
      </Typography>
      <Typography fontSize="12px" fontWeight={600}>
        Please set new password
      </Typography>
      <Typography variant="body1" fontSize="12px">
        Enter new password then click select change password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack gap="10px">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Controls.Input
                label="Password"
                type={passwordVisible ? "password" : "text"}
                placeholder="Enter your password"
                value={field.value}
                onChange={field.onChange}
                error={errors.password?.message}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {passwordVisible ? (
                          <VisibilityOff sx={{ fontSize: "16px" }} />
                        ) : (
                          <Visibility sx={{ fontSize: "16px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Controls.Input
                label="Confirm Password"
                type={confirmPasswordVisible ? "password" : "text"}
                placeholder="Enter your password"
                value={field.value}
                onChange={field.onChange}
                error={errors.confirmPassword?.message}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {confirmPasswordVisible ? (
                          <VisibilityOff sx={{ fontSize: "16px" }} />
                        ) : (
                          <Visibility sx={{ fontSize: "16px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Box mx="auto">
            <Controls.Button type="submit" disabled={isLoading}>
              Submit
              {isLoading && <ButtonLoader />}
            </Controls.Button>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default withAuthLayout(ResetPassword);
