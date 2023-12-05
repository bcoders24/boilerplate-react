import { Fragment, useState } from 'react';
import withAuthLayout from '@/hoc/withAuthLayout';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ResetPasswordSchema } from '@/utils/Validations';
import * as z from 'zod';
import { Paths } from '@/constants';
import { useToast } from '@/components/ui/use-toast';
import LoadingButton from '@/components/common/LoadingButton';
import SEO from '@/components/common/SEO';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!!state?.OTPverified === false) {
    return <Navigate to={Paths.FORGOT_PASSWORD} replace />;
  }

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      toast({
        description: 'Password changed successfully, Log in to continue',
      });
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
                  <FormControl>
                    <Input type="password" placeholder="Enter new password" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input type="password" placeholder="Confirm new password" {...field} />
                  </FormControl>
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
