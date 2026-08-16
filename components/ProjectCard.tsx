"use client";
import Image from "next/image";
import Button from "./Button";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  apkUrl?: string;
  videoUrl?: string;
  images?: string[];
  category: "mobile" | "web";
};

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onViewDetails,
}: ProjectCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
      <div className="relative h-56">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-black/70 text-xs px-3 py-1 rounded-full">
          {project.category.toUpperCase()}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
        <p className="text-zinc-400 line-clamp-2 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <Button variant="outline" onClick={() => onViewDetails(project)}>
          View Details
        </Button>
      </div>
    </div>
  );
}
