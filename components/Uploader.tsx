"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, CheckCircle2 } from "lucide-react";

type UploaderProps = {
  accept: "image" | "video" | "apk";
  label?: string;
  onUploadComplete: (url: string) => void;
};

const ACCEPT_MAP: Record<UploaderProps["accept"], string> = {
  image: "image/png,image/jpeg,image/webp",
  video: "video/mp4,video/quicktime",
  apk: ".apk",
};

export default function Uploader({
  accept,
  label,
  onUploadComplete,
}: UploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleFile = (file: File) => {
    setError(null);
    setDone(false);
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        const result = JSON.parse(xhr.responseText);
        onUploadComplete(result.url);
        setDone(true);
      } else {
        const result = JSON.parse(xhr.responseText || "{}");
        setError(result.error ?? "Upload failed. Try a smaller file.");
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      setError("Upload failed — network error.");
    };

    xhr.send(formData);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_MAP[accept]}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="w-full border-2 border-dashed border-zinc-700 rounded-2xl py-8 flex flex-col items-center gap-2 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors disabled:opacity-50"
      >
        {isUploading ? (
          <>
            <Loader2 className="animate-spin" size={28} />
            <span>{progress}%</span>
          </>
        ) : done ? (
          <>
            <CheckCircle2 className="text-emerald-400" size={28} />
            <span>Uploaded — click to replace</span>
          </>
        ) : (
          <>
            <UploadCloud size={28} />
            <span>{label ?? `Upload ${accept}`}</span>
          </>
        )}
      </button>

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}
