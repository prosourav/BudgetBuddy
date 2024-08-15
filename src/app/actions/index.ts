'use server'

import { signIn, signOut } from "@/auth";
import { cookies } from "next/headers";

export async function doLogout() {
  cookies().delete("user");
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData) {

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}