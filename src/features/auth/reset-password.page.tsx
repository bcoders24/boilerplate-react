import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { TypeOf } from 'zod';
import LoadingButton from '@/components/common/loading-button';
import SEO from '@/components/common/seo';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import toast from 'react-hot-toast';
import withAuthLayout from '@/hoc/withAuthLayout';
import { Paths } from '@/constants';
import FormInput from '@/components/common/form-input';
import { ResetPasswordSchema } from '@/schemas/reset-password.schema';

export type ResetPasswordInput = TypeOf<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!!state?.OTPverified === false) {
    return <Navigate to={Paths.FORGOT_PASSWORD} replace />;
  }

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInput> = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(data);
      setIsLoading(false);
      toast.success('Password changed successfully, Log in to continue');
      form.reset();
      navigate(Paths.LOGIN);
    }, 2000);
  };

  return (
    <Fragment>
      <SEO
        title="Reset password | Project Name"
        description="Reset password page for project name"
        name="Company name."
        type="article"
      />
      <div className="w-[260px] space-y-6">
        <h1 className="font-bold text-2xl text-center leading-none">Reset Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormInput type="password" placeholder="Enter new password" field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormInput type="password" placeholder="Confirm new password" field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-xs font-medium w-max ml-auto block">
              <Link to={Paths.LOGIN} replace>
                Back to login ?
              </Link>
            </span>
            <div className="flex items-center justify-center">
              <LoadingButton isLoading={isLoading}>Continue</LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(ResetPassword);
