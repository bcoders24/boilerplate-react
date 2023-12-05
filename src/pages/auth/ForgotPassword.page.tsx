import { Fragment, useState } from 'react';
import withAuthLayout from '@/hoc/withAuthLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ForgotPasswordSchema } from '@/utils/Validations';
import * as z from 'zod';
import { Paths } from '@/constants';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@/components/common/LoadingButton';
import SEO from '@/components/common/SEO';

const ForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const email = form.getValues('email');

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Success',
        description: 'Please verify your email account',
      });
      form.reset();
      navigate(Paths.OTP, { state: { email } });
    }, 2000);
  };
  return (
    <Fragment>
      <SEO
        title="Forgot password | Project Name"
        description="Forgot password page for project name"
        name="Company name."
        type="webapp"
      />
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
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
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
