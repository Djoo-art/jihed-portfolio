"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { destroySession } from "@/lib/auth";

export type ProjectInput = {
  title: string;
  description: string;
  category: "mobile" | "web";
  status: "completed" | "upcoming";
  images: string[];
  videoUrl?: string;
  apkUrl?: string;
  technologies: string[];
  featured: boolean;
};

export async function createProject(data: ProjectInput) {
  await prisma.project.create({ data });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProject(id: string, data: ProjectInput) {
  await prisma.project.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}