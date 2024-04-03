import * as z from 'zod';

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password should be 6 characters.'),
    confirmPassword: z.string().min(6, 'Password should be 6 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });
