"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { motion } from "framer-motion";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  apkUrl?: string;
  videoUrl?: string;
  category: "mobile" | "web";
};

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Fitness Tracker App",
    description:
      "A beautiful mobile fitness application with workout plans, progress tracking, and social features. Built with React Native and Firebase.",
    image: "https://picsum.photos/id/1015/600/400",
    technologies: ["React Native", "Firebase", "Redux", "Tailwind"],
    apkUrl: "https://example.com/fitness.apk",
    videoUrl: "https://www.youtube.com/embed/dQw4w9wgccc",
    category: "mobile",
  },
  {
    id: 2,
    title: "E-commerce Mobile App",
    description:
      "Modern shopping experience for fashion brands with AR try-on feature, payment integration, and order tracking.",
    image: "https://picsum.photos/id/106/600/400",
    technologies: ["Flutter", "Stripe", "Node.js"],
    apkUrl: "",
    category: "mobile",
  },
  {
    id: 3,
    title: "Portfolio Dashboard",
    description:
      "A web dashboard to manage all my projects, clients, and analytics. Built with Next.js 15 and TypeScript.",
    image: "https://picsum.photos/id/201/600/400",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    category: "web",
  },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Simple CRUD functions (frontend only for now)
  const addProject = () => {
    const newProject: Project = {
      id: Date.now(),
      title: "New Project " + (projects.length + 1),
      description: "Describe your project here. You can edit this later.",
      image: "https://picsum.photos/id/237/600/400",
      technologies: ["React", "Next.js"],
      category: "mobile",
    };
    setProjects([...projects, newProject]);
  };

  const deleteProject = (id: number) => {
    if (confirm("Delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="min-h-screen flex items-center px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tighter">
              Hi, I&apos;m{" "}
              <span className="text-emerald-400">Jihed Ghozzi</span>
            </h1>
            <p className="text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Aspiring Full-Stack &amp; Mobile Developer.
              <br />
              Currently open for freelance work while building my portfolio.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See My Work
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Hire Me
              </Button>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 bg-zinc-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-5xl font-bold mb-10">About Me</h2>
            <p className="text-xl text-zinc-300 leading-relaxed">
              I&apos;m learning React and Next.js from zero. This entire
              portfolio is being built as I learn. My goal is to become good
              enough to take on freelance projects — especially mobile apps.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-5xl font-bold">Featured Projects</h2>
                <p className="text-zinc-400 mt-2">
                  Click on any project to see details, video, and download APK
                  when available
                </p>
              </div>
              <Button onClick={addProject}>
                <Plus className="mr-2" /> Add Project
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={openModal}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Apps */}
        <section id="upcoming" className="py-24 bg-zinc-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-5xl font-bold mb-8">Upcoming Apps</h2>
            <p className="text-zinc-400 text-lg">
              Projects I am currently developing or planning. These will be
              added to the main projects section once completed.
            </p>
            <div className="mt-12 text-center text-zinc-500 italic">
              (You can add real upcoming projects here later)
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-zinc-400 mb-10">
              I&apos;m currently open to small freelance projects while I
              continue learning.
              <br />
              Feel free to reach out!
            </p>
            <a
              href="mailto:your.email@gmail.com"
              className="text-2xl underline hover:text-emerald-400"
            >
              your.email@gmail.com
            </a>
          </div>
        </section>
      </main>

      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={closeModal}
      />

      <footer className="py-12 text-center text-zinc-500 text-sm border-t border-zinc-800">
        Built with Next.js 15 • Learning in Public
      </footer>
    </>
  );
}
