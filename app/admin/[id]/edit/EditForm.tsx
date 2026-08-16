"use client";

import ProjectForm from "@/components/ProjectForm";
import { updateProject, type ProjectInput } from "../../actions";

type Project = ProjectInput & { id: string };

export default function EditForm({ project }: { project: Project }) {
  return (
    <ProjectForm
      initialData={{
        title: project.title,
        description: project.description,
        category: project.category,
        images: project.images,
        videoUrl: project.videoUrl ?? "",
        apkUrl: project.apkUrl ?? "",
        technologies: project.technologies,
        featured: project.featured,
      }}
      onSubmit={(data) => updateProject(project.id, data)}
    />
  );
}
