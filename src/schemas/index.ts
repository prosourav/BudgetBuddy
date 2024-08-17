import { z } from "zod";

export const userformSchema = z
  .object({
    email: z.string().trim().nonempty({ message: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string().trim().nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)"),
  });

export const userCreateFormSchema = z
  .object({
    name: z.string().trim().nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().trim().nonempty({ message: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string().trim().nonempty({ message: "Password is required" })
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().trim().nonempty({ message: "Confirm password is required" })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const transactionSchema = z.object({
  date: z.string().trim().min(1, "Date cannot be empty"),
  amount: z.string().refine(value => value > '0', {
    message: "Amount must be greater than 0",
  }),
  name: z.string().min(1, "Name cannot be empty"),
  tag: z.string().trim().nonempty({ message: "Tag is required" }),
});