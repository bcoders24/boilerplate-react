import * as z from 'zod';

const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Email is invalid.'),
  password: z.string().min(1, 'Password is required'),
});

export default LoginSchema;
