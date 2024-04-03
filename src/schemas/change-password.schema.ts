import * as z from 'zod';

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { message: 'Password is required.' }),
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' })
      .refine((value) => value.trim().length > 0, { message: 'New password is required.' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required.' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });
