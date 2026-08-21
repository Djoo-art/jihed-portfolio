"use client";
import { useEffect, useState } from "react";
import { X, Download, Play } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./Button";

type Project = {
  id: string;
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
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setLightboxOpen(false);
  }, [project?.id]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!project || !isOpen) return null;

  const gallery =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];

  return (
    <div className="fixed inset-0 bg-black/90 z-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-zinc-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl"
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
          <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-4 relative">
            {project.videoUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={project.videoUrl}
                title="Project Video"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={gallery[activeImage]}
                  alt={`${project.title} — photo ${activeImage + 1}`}
                  onClick={() => setLightboxOpen(true)}
                  className="w-full h-full object-contain cursor-zoom-in"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage(
                          (activeImage - 1 + gallery.length) % gallery.length,
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 text-white"
                      aria-label="Previous photo"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage((activeImage + 1) % gallery.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 text-white"
                      aria-label="Next photo"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/60 text-xs text-white px-2 py-1 rounded-full">
                      {activeImage + 1} / {gallery.length}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Thumbnail strip — only when there's more than one photo */}
          {!project.videoUrl && gallery.length > 1 && (
            <div className="flex gap-2 mb-8 overflow-x-auto">
              {gallery.map((url, i) => (
                <button
                  type="button"
                  key={url}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeImage
                      ? "border-emerald-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={url}
                    alt={`${project.title} thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
          {(project.videoUrl || gallery.length <= 1) && (
            <div className="mb-4" />
          )}

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

      {lightboxOpen && !project.videoUrl && (
        <div
          className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            aria-label="Close full-size photo"
          >
            <X size={32} />
          </button>

          <img
            src={gallery[activeImage]}
            alt={`${project.title} — photo ${activeImage + 1} full size`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(
                    (activeImage - 1 + gallery.length) % gallery.length,
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-3 text-white"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((activeImage + 1) % gallery.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-3 text-white"
                aria-label="Next photo"
              >
                ›
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-sm text-white px-3 py-1 rounded-full">
                {activeImage + 1} / {gallery.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
