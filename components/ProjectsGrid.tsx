"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

type Project = {
  id: string;
  title: string;
  description: string;
  images: string[];
  videoUrl?: string | null;
  apkUrl?: string | null;
  technologies: string[];
  category: "mobile" | "web";
};

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelected(project);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={{
              ...project,
              image: project.images[0] ?? "",
              videoUrl: project.videoUrl ?? undefined,
              apkUrl: project.apkUrl ?? undefined,
            }}
            onViewDetails={() => openModal(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={
          selected
            ? {
                ...selected,
                image: selected.images[0] ?? "",
                videoUrl: selected.videoUrl ?? undefined,
                apkUrl: selected.apkUrl ?? undefined,
              }
            : null
        }
        isOpen={open}
        onClose={closeModal}
      />
    </>
  );
}
