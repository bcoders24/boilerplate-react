import * as z from 'zod';

export const EditProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required.').max(255),
  lastName: z.string().max(255),
  role: z.enum(['admin', 'manager', 'employee']),
  department: z.string().optional(),
  mobile: z.string().min(1, 'Mobile is required.').max(15, 'Mobile is not valid.'),
  email: z.string().min(1, 'Email is required').email('Email is not valid.'),
});
