import { ILogin } from "src/models/data/auth";
import { IError } from "models/general/ErrorType";
import { ILoginResponse } from "models/api/LoginResponse";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import withAuthLayout from "src/hoc/withAuthLayout";
import { Paths } from "constants/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { loginValidation } from "utils/Validations";
import { InputAdornment, Stack, Typography, Box } from "@mui/material";
import Controls from "src/components/controls/Controls";
import IconButton from "src/components/controls/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InitialValues } from "constants/index";
import { useLoginMutation } from "src/store/services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "src/store/slices/authSlice";
import { useNotification } from "src/hooks/useNotification";
import ButtonLoader from "src/components/common/Loader/ButtonLoader";

type LoginResponseData = {
  data: ILoginResponse;
  error: IError;
};

const Login = () => {
  const { displayNotification } = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ILogin>({
    resolver: yupResolver(loginValidation),
    defaultValues: InitialValues.loginValues,
  });

  const onSubmit = async (data: ILogin) => {
    const loginData: ILogin = {
      email: data.email,
      password: data.password,
    };
    try {
      const { data, error } = (await login(loginData)) as LoginResponseData;
      if (error) {
        console.error("Login failed:", error);
        return;
      }
      console.log("Login successful:", data);
      displayNotification({ message: "Login Success" });
      dispatch(
        setUser({
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikphc3ByZWV0IHNpbmdoIiwicm9sZXMiOlsidXNlciJdfQ.c2Mc4z9SKedAj1eh1Ka9XP9QWsPDW1bgtaeROlXwYZg",
        })
      );
      navigate(Paths.PROFILE);
    } catch (error) {
      console.error("Error:", error);
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
        Log In
      </Typography>
      <Typography fontSize="12px" fontWeight={600}>
        Welcome back!
      </Typography>
      <Typography variant="body1" fontSize="12px">
        Please enter your email and password to sign in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack gap="10px">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Controls.Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={field.value}
                onChange={field.onChange}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Controls.Input
                label="Password"
                type={showPassword ? "password" : "text"}
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
                        {showPassword ? (
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
          <Link
            className="ml-auto w-max text-[12px] font-medium"
            to={Paths.FORGOT_PASSWORD}
          >
            Forgot Password ?
          </Link>
          <Box mx="auto">
            <Controls.Button type="submit" disabled={isLoading}>
              Sign In
              {isLoading && <ButtonLoader />}
            </Controls.Button>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default withAuthLayout(Login);
