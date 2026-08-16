import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
        <EditForm
          project={{
            ...project,
            videoUrl: project.videoUrl ?? undefined,
            apkUrl: project.apkUrl ?? undefined,
          }}
        />
      </div>
    </div>
  );
}
