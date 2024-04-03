import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { TypeOf } from 'zod';
import LoadingButton from '@/components/common/loading-button';
import SEO from '@/components/common/seo';
import { Typography } from '@/components/common/typography';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import withAuthLayout from '@/hoc/withAuthLayout';
import { Paths } from '@/constants';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { useLogin } from '@/services/queries/auth.query';
import FormInput from '@/components/common/form-input';
import LoginSchema from '@/schemas/login.schema';

export type LoginInput = TypeOf<typeof LoginSchema>;

const Login = () => {
  const requestLoading = useLoadingStore((store) => store.requestLoading);
  const loginUser = useLogin();

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <Fragment>
      <SEO title="Login | Project Name" description="Login page for project name" name="Company name." type="webapp" />
      <div className="w-[260px] space-y-6">
        <div className="flex flex-col gap-2">
          <Typography variant="h3">Login</Typography>
          <Typography variant="body-small" className="font-semibold">
            Welcome back!
          </Typography>
          <Typography variant="small">Please enter your Email and Password to sign in.</Typography>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormInput type="email" placeholder="Enter email" field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormInput type="password" placeholder="Enter password" field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-xs font-medium w-max ml-auto block">
              <Link to={Paths.FORGOT_PASSWORD}>Forgot Password ?</Link>
            </span>
            <div className="flex items-center justify-center">
              <LoadingButton isLoading={requestLoading}>Sign In</LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(Login);
