import { IError } from "models/general/ErrorType";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import withAuthLayout from "src/hoc/withAuthLayout";
import { Paths } from "constants/index";
import { Stack, Box, Typography, CircularProgress } from "@mui/material";
import Controls from "src/components/controls/Controls";
import OtpInput from "src/components/common/OtpInput/OtpInput";
import { useVerifyCodeMutation } from "src/store/services/authService";
import { IOtp } from "src/models/data/VerifyOtpModel";
import { IOtpResponse } from "src/models/api/OtpResponse";
import { useNotification } from "src/hooks/useNotification";

type OtpVerificationResponseData = {
  data: IOtpResponse;
  error: IError;
};

const VerifyEmail = () => {
  const { displayNotification } = useNotification();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyCodeMutation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const onChange = (value: string) => setOtp(value);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.split(" ")[0].length !== 4) {
      setError("Otp is not valid");
      return;
    } else if (otp.split(" ")[0].length === 4) {
      setError("");
    }
    const otpData: IOtp = {
      otp: otp,
    };
    try {
      const { data, error } = (await verifyOtp(
        otpData
      )) as OtpVerificationResponseData;
      if (error) {
        console.error("Login failed:", error);
        return;
      }
      // Access the data returned by the mutation
      console.log("Login successful:", data);
      displayNotification({ message: "Otp is not correct" });
      // Handle the data (e.g., update the UI, navigate to another page)
      // navigate(Paths.RESET_PASSWORD);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (!!state?.email === false) {
    return <Navigate to={Paths.FORGOT_PASSWORD} replace />;
  }

  useEffect(() => {
    if (otp.split(" ")[0].length === 4) {
      setError("");
    }
  }, [otp]);

  return (
    <Stack
      justifyContent="center"
      width="270px"
      height="100%"
      mx="auto"
      gap="8px"
    >
      <Link
        className="pb-4 gap-x-2 items-center cursor-pointer flex w-max"
        to={Paths.FORGOT_PASSWORD}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png"
          width={15}
          alt="back-arrow"
        />
        <Typography fontSize="12px" fontWeight={500}>
          Back
        </Typography>
      </Link>
      <h2 className="font-bold text-base heading">Verify Email</h2>
      <h4 className="2xl:text-base font-semibold text-xs">OTP Verification</h4>
      <p className="text-[12px] 2xl:text-base text-input-placeholder">
        Enter the OTP sent to your registered email address.
      </p>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Box>
          <Stack mt="8px" alignItems="center">
            <OtpInput value={otp} valueLength={4} onChange={onChange} />
          </Stack>
          {error && (
            <Typography fontSize="12px" color="red" lineHeight={1.6}>
              {error}
            </Typography>
          )}
        </Box>

        <Box mx="auto">
          <Controls.Button type="submit" disabled={isLoading}>
            Verify
            {isLoading && (
              <CircularProgress size={16} sx={{ marginLeft: "10px" }} />
            )}
          </Controls.Button>
        </Box>
      </form>
    </Stack>
  );
};

export default withAuthLayout(VerifyEmail);
