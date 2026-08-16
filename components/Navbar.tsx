"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Devoloper</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => scrollTo("about")}
            className="hover:text-emerald-400 transition"
          >
            About
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className="hover:text-emerald-400 transition"
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo("upcoming")}
            className="hover:text-emerald-400 transition"
          >
            Upcoming
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hover:text-emerald-400 transition"
          >
            Contact
          </button>
          <Button variant="primary" onClick={() => scrollTo("contact")}>
            Hire Me
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 py-6">
          <div className="flex flex-col gap-6 px-6 text-lg">
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => scrollTo("projects")}>Projects</button>
            <button onClick={() => scrollTo("upcoming")}>Upcoming Apps</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
            <Button variant="primary" className="w-full">
              Hire Me for Freelance
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
