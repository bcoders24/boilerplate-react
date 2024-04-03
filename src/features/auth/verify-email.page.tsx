import { Fragment, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '@/components/common/loading-button';
import OtpInput from '@/components/common/otp-input';
import SEO from '@/components/common/seo';
import toast from 'react-hot-toast';
import withAuthLayout from '@/hoc/withAuthLayout';
import { Paths } from '@/constants';

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!!state?.email === false) {
    return <Navigate to={Paths.FORGOT_PASSWORD} replace />;
  }

  const onChange = (value: string) => setOtp(value);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.split(' ')[0].length !== 4) {
      // setError("OTP is not valid");
      setIsLoading(false);
      return;
    } else if (otp.split(' ')[0].length === 4) {
      setError('');
    }
    setIsLoading(true);
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('Verified OTP', otp);
      toast.success('Email verified successfully');
      navigate(Paths.RESET_PASSWORD, {
        replace: true,
        state: { OTPverified: true },
      });
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (otp.split(' ')[0].length === 4) {
      setError('');
    }
  }, [otp]);

  return (
    <Fragment>
      <SEO
        title="Verify email | Project Name"
        description="Verify email page for project name"
        name="Company name."
        type="article"
      />
      <div className="w-[300px] space-y-6">
        <h1 className="font-bold text-2xl text-center leading-none">Verify OTP</h1>
        <OtpInput value={otp} valueLength={4} onChange={onChange} />
        <div className="flex items-center justify-center">
          <LoadingButton isLoading={isLoading} onClick={onSubmit}>
            Verify
          </LoadingButton>
        </div>
        <span className="text-sm font-medium text-destructive">{error}</span>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(VerifyEmail);
