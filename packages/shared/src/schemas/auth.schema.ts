import { z } from 'zod';

const EMAIL_ERROR = 'Invalid email address';
const PASSWORD_ERROR = 'Password must be at least 6 characters';
const PASSWORD_MIN = 6;

export const registerSchema = z
  .object({
    name: z.string().min(6, 'Name must be at least 6 characters'),
    email: z.email(EMAIL_ERROR),
    password: z.string().min(PASSWORD_MIN, PASSWORD_ERROR),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.email(EMAIL_ERROR),
  password: z.string().min(PASSWORD_MIN, PASSWORD_ERROR),
});

export type RegisterInputs = z.infer<typeof registerSchema>;
export type LoginInputs = z.infer<typeof loginSchema>;
