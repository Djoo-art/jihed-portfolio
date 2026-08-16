"use client";

import { useState } from "react";
import Uploader from "./Uploader";
import { X } from "lucide-react";
import type { ProjectInput } from "@/app/admin/actions";

type ProjectFormProps = {
  initialData?: Partial<ProjectInput>;
  onSubmit: (data: ProjectInput) => void;
};

export default function ProjectForm({
  initialData,
  onSubmit,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [category, setCategory] = useState<"mobile" | "web">(
    initialData?.category ?? "mobile",
  );
  const [status, setStatus] = useState<"completed" | "upcoming">(
    initialData?.status ?? "completed",
  );

  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl ?? "");
  const [apkUrl, setApkUrl] = useState(initialData?.apkUrl ?? "");
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>(
    initialData?.technologies ?? [],
  );
  const [featured, setFeatured] = useState(initialData?.featured ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTech = () => {
    const value = techInput.trim();
    if (value && !technologies.includes(value)) {
      setTechnologies([...technologies, value]);
    }
    setTechInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //if (images.length === 0) {
    //alert("Please upload at least one photo before saving.");
    //return;
    //}
    setIsSubmitting(true);
    onSubmit({
      title,
      description,
      category,
      status,
      images,
      videoUrl: videoUrl || undefined,
      apkUrl: apkUrl || undefined,
      technologies,
      featured,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm text-zinc-400 mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as "mobile" | "web")}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
        >
          <option value="mobile">Mobile</option>
          <option value="web">Web</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">Status</label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "completed" | "upcoming")
          }
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"
        >
          <option value="completed">
            Completed — show in Featured Projects
          </option>
          <option value="upcoming">Upcoming — show in Upcoming Apps</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">Technologies</label>
        <input
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTech();
            }
          }}
          placeholder="e.g. Flutter — press Enter to add"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 outline-none mb-2"
        />
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="bg-zinc-800 text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() =>
                  setTechnologies(technologies.filter((t) => t !== tech))
                }
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">Photos</label>
        <Uploader
          accept="image"
          label="Upload a photo"
          onUploadComplete={(url) => setImages([...images, url])}
        />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {images.map((url) => (
              <div key={url} className="relative">
                <img src={url} className="w-24 h-24 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((i) => i !== url))}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-zinc-500 mt-2">
          First photo uploaded is used as the cover image.
        </p>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">
          Demo Video (optional)
        </label>
        <Uploader
          accept="video"
          label="Upload a video"
          onUploadComplete={setVideoUrl}
        />
        {videoUrl && (
          <p className="text-emerald-400 text-sm mt-2">Video attached ✓</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">
          APK File (optional)
        </label>
        <Uploader
          accept="apk"
          label="Upload an APK"
          onUploadComplete={setApkUrl}
        />
        {apkUrl && (
          <p className="text-emerald-400 text-sm mt-2">APK attached ✓</p>
        )}
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        <span className="text-sm text-zinc-400">Visible on public site</span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-medium transition disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}
