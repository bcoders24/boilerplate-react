import withAuthLayout from '@/hoc/withAuthLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/utils/Validations';
import { Link } from 'react-router-dom';
import { Paths } from '@/constants';
import { Typography } from '@/components/common/Typography';
import { TypeOf } from 'zod';
import LoadingButton from '@/components/common/LoadingButton';
import { useLogin } from '@/services/queries/auth.query';
import useAuthStore from '@/stores/useAuthStore';
import SEO from '@/components/common/SEO';
import { Fragment } from 'react';

export type LoginInput = TypeOf<typeof LoginSchema>;

const Login = () => {
  const store = useAuthStore();
  const loginUser = useLogin();
  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: '', password: '' },
  });
  const onSubmit: SubmitHandler<LoginInput> = (values) => {
    const loginData = {
      authMethod: 'email',
      verificationType: 'password',
      deviceType: 'web',
      deviceId: '123',
      ...values,
    };
    loginUser(loginData);
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-xs font-medium w-max ml-auto block">
              <Link to={Paths.FORGOT_PASSWORD}>Forgot Password ?</Link>
            </span>
            <div className="flex items-center justify-center">
              <LoadingButton isLoading={store.requestLoading}>Sign In</LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(Login);
