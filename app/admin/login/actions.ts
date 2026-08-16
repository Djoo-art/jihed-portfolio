"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";

console.log("HASH loaded:", process.env.ADMIN_PASSWORD_HASH);

export async function login(
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const password = formData.get("password") as string;

  const isValid = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH ?? ""
  );

  if (!isValid) {
    return { error: "Incorrect password" };
  }

  await createSession();
  redirect("/admin");
}