import * as z from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Email is invalid.'),
});
