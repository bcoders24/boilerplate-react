import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TypeOf } from 'zod';
import LoadingButton from '@/components/common/loading-button';
import SEO from '@/components/common/seo';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import toast from 'react-hot-toast';
import withAuthLayout from '@/hoc/withAuthLayout';
import { Paths } from '@/constants';
import FormInput from '@/components/common/form-input';
import { ForgotPasswordSchema } from '@/schemas/forgot-password.schema';

export type ForgotPasswordInput = TypeOf<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const email = form.getValues('email');

  const onSubmit: SubmitHandler<ForgotPasswordInput> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Please verify your email account');
      form.reset();
      navigate(Paths.OTP, { state: { email } });
    }, 2000);
  };
  return (
    <Fragment>
      <SEO title="Forgot password" description="Forgot password" name="" type="webapp" />
      <div className="w-[260px] space-y-6">
        <h1 className="font-bold text-2xl text-center leading-none">Forgot Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormInput field={field} placeholder="Enter email" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(ForgotPassword);
