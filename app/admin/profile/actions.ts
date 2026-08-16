"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProfileInput = {
  name: string;
  title: string;
  bio: string;
  email: string;
  avatarUrl?: string;
};

export async function getOrCreateProfile() {
  return prisma.profile.upsert({
    where: { id: "profile" },
    update: {},
    create: { id: "profile" },
  });
}

export async function updateProfile(data: ProfileInput) {
  await prisma.profile.upsert({
    where: { id: "profile" },
    update: data,
    create: { id: "profile", ...data },
  });
  revalidatePath("/");
  revalidatePath("/admin/profile");
  redirect("/admin");
}