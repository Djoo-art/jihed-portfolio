import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProject, logout } from "./actions";
import { Plus } from "lucide-react";

export default async function AdminPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/new"
              className="bg-white text-black px-6 py-3 rounded-2xl font-medium hover:bg-zinc-100 transition flex items-center gap-2"
            >
              <Plus size={18} /> New Project
            </Link>

            <Link
              href="/admin/profile"
              className="border border-zinc-700 px-6 py-3 rounded-2xl hover:bg-zinc-900 transition"
            >
              Edit Profile
            </Link>
            
            <form action={logout}>
              <button className="border border-zinc-700 px-6 py-3 rounded-2xl hover:bg-zinc-900 transition">
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                {project.images[0] && (
                  <img
                    src={project.images[0]}
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <p className="text-zinc-400 text-sm">
                    {project.category} •{" "}
                    {project.featured ? "visible" : "hidden"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Link
                  href={`/admin/${project.id}/edit`}
                  className="text-emerald-400 hover:underline"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deleteProject(project.id);
                  }}
                >
                  <button className="text-red-400 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-zinc-500">
              No projects yet — add your first one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
