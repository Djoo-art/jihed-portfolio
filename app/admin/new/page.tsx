"use client";

import ProjectForm from "@/components/ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">New Project</h1>
        <ProjectForm onSubmit={(data) => createProject(data)} />
      </div>
    </div>
  );
}
