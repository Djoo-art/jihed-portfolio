"use client";
import { X, Download, Play } from "lucide-react";
import { motion } from "framer-motion";
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

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  if (!project || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-zinc-900 max-w-4xl w-full rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-700 p-6">
          <h2 className="text-3xl font-bold">{project.title}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={28} />
          </button>
        </div>

        <div className="p-8">
          {/* Main Image / Video */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-8 relative">
            {project.videoUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={project.videoUrl}
                title="Project Video"
                allowFullScreen
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* APK Download Button - Only shows if apkUrl exists */}
          {project.apkUrl && (
            <div className="mb-8">
              <Button
                variant="secondary"
                className="w-full text-lg"
                onClick={() => window.open(project.apkUrl, "_blank")}
              >
                <Download className="mr-2" /> Download APK
              </Button>
              <p className="text-center text-xs text-emerald-500 mt-2">
                Available for Android
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-emerald-400 mb-3">ABOUT THIS PROJECT</h4>
              <p className="text-zinc-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h4 className="text-emerald-400 mb-3">TECHNOLOGIES USED</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-zinc-800 px-4 py-2 rounded-xl text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-700 p-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
