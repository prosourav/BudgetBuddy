'use server'

import { signIn, signOut } from "@/auth";
import storage from "@/utils/storage";
import { cookies } from "next/headers";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialRegister(formData: Record<string, string>) {
  try {
    const response = await signIn("register", {
      email: formData.email,
      password: formData.password,
      username: formData.name,
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}


export async function doCredentialLogin(formData: Record<string, string>) {
  try {
    const response = await signIn("login", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    console.log("D################################");
    return response;
  } catch (err) {
    console.log("Invoked................................................................",err);
    throw err;
  }
}