import * as z from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(1, 'Email is required').email('Email is invalid'),
  password: z.string().min(1, 'Password is required'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password should be 6 characters'),
    confirmPassword: z.string().min(6, 'Password should be 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// export const resetPasswordValidation = yup.object({
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(6, "Password should be atleast 6 characters"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password"), undefined], "Passwords don't match.")
//     .required("Password is required")
//     .min(6, "Password should be atleast 6 characters"),
// });

// export const changePasswordValidation = yup.object({
//   oldPassword: yup.string().required("Old password is required"),
//   newPassword: yup.string().required("New password is required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("newPassword"), undefined], "Passwords don't match.")
//     .required("Confirm Password is required"),
// });

// export const profileValidation = yup.object({
//   name: yup.string().required("Password is required"),
//   email: emailValidation,
//   phone: yup.string().min(10, "Invalid Phone").required("Phone is required"),
// });

// export const employeeSchema = yup.object().shape({
//   id: yup.string(),
//   fullName: yup.string().required("Full Name is required"),
//   email: emailValidation,
//   mobile: yup.string().min(10, "Invalid Mobile").required("Mobile is required"),
//   city: yup.string(),
//   gender: yup.string(),
//   departmentId: yup.string(),
//   hireDate: yup.date().nullable(),
//   isPermanent: yup.boolean(),
// });

// export const userSchema = yup.object().shape({
//   id: yup.string(),
//   fullName: yup.string().required("Full Name is required"),
//   email: emailValidation,
//   phone: yup.string().min(10, "Invalid Phone").required("Phone is required"),
//   gender: yup.string(),
//   date: yup.date().nullable(),
// });
