import { IError } from "models/general/ErrorType";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import withAuthLayout from "src/hoc/withAuthLayout";
import { Images, Paths } from "constants/index";
import { Stack, Box, Typography } from "@mui/material";
import Controls from "src/components/controls/Controls";
import OtpInput from "src/components/common/OtpInput/OtpInput";
import { useVerifyCodeMutation } from "src/store/services/authService";
import { IOtp } from "src/models/data/auth";
import { IOtpResponse } from "src/models/api/OtpResponse";
import { useNotification } from "src/hooks/useNotification";
import ButtonLoader from "src/components/common/Loader/ButtonLoader";

type OtpVerificationResponseData = {
  data: IOtpResponse;
  error: IError;
};

const VerifyEmail = () => {
  const { displayNotification } = useNotification();
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyCodeMutation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const onChange = (value: string) => setOtp(value);

  if (!!state?.email === false) {
    return <Navigate to={Paths.FORGOT_PASSWORD} replace />;
  }

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
      console.log("Verified OTP:", data);
      displayNotification({ message: "OTP verfied successfully" });
      // Handle the data (e.g., update the UI, navigate to another page)
      navigate(Paths.RESET_PASSWORD, { replace: true });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
        replace
      >
        <img src={Images.BACK_ARROW} width={15} alt="back-arrow" />
        <Typography fontSize="12px" fontWeight={500}>
          Back
        </Typography>
      </Link>
      <Typography fontSize="16px" fontWeight={700}>
        Verify Email
      </Typography>
      <Typography fontSize="12px" fontWeight={600}>
        OTP Verification
      </Typography>
      <Typography variant="body1" fontSize="12px">
        Enter the OTP sent to your registered email address.
      </Typography>
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
            {isLoading && <ButtonLoader />}
          </Controls.Button>
        </Box>
      </form>
    </Stack>
  );
};

export default withAuthLayout(VerifyEmail);
