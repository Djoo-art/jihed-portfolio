import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "px-8 py-3.5 rounded-2xl font-medium transition-all active:scale-95";

  const styles = {
    primary: "bg-white text-black hover:bg-zinc-100",
    secondary: "bg-emerald-500 hover:bg-emerald-600 text-white",
    outline: "border border-zinc-700 hover:bg-zinc-900",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
