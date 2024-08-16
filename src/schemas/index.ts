import { z } from "zod";

export const userformSchema = z
  .object({
    email: z.string().trim().nonempty({ message: "Email is Required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string().trim().nonempty({ message: "Password is Required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)"),
  });

export const userCreateFormSchema = z
  .object({
    name: z.string().trim().nonempty({ message: "Name is Required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().trim().nonempty({ message: "Email is Required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string().trim().nonempty({ message: "Password is Required" })
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().trim().nonempty({ message: "Confirm Password is Required" })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],  
  });