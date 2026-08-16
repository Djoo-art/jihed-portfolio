"use client";

import { useState } from "react";
import Uploader from "./Uploader";
import type { ProfileInput } from "@/app/admin/profile/actions";

export default function ProfileForm({
  initialData,
  onSubmit,
}: {
  initialData: ProfileInput;
  onSubmit: (data: ProfileInput) => void;
}) {
  const [name, setName] = useState(initialData.name);
  const [title, setTitle] = useState(initialData.title);
  const [bio, setBio] = useState(initialData.bio);
  const [email, setEmail] = useState(initialData.email);
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit({ name, title, bio, email, avatarUrl: avatarUrl || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm text-zinc-400 mb-2">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">
          Title / Tagline
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">
          About Me / Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
          rows={5}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">
          Contact Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">
          Profile Photo (optional)
        </label>
        <Uploader
          accept="image"
          label="Upload a profile photo"
          onUploadComplete={setAvatarUrl}
        />
        {avatarUrl && (
          <img
            src={avatarUrl}
            className="w-24 h-24 object-cover rounded-full mt-3"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-medium transition disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
