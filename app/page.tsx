import Navbar from "../components/Navbar";
import HeroActions from "../components/HeroActions";
import ProjectsGrid from "../components/ProjectsGrid";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function Home() {
  const [completedProjects, upcomingProjects, profile] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true, status: "completed" },
      orderBy: { order: "asc" },
    }),
    prisma.project.findMany({
      where: { featured: true, status: "upcoming" },
      orderBy: { order: "asc" },
    }),
    prisma.profile.upsert({
      where: { id: "profile" },
      update: {},
      create: { id: "profile" },
    }),
  ]);

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="min-h-screen flex items-center px-6">
          <div className="max-w-5xl mx-auto text-center">
            {profile.avatarUrl && (
              <img
                src={profile.avatarUrl}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-8"
              />
            )}
            <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tighter">
              Hi, I&apos;m{" "}
              <span className="text-emerald-400">{profile.name}</span>
            </h1>
            <p className="text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              {profile.title}
            </p>
            <HeroActions />
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 bg-zinc-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-5xl font-bold mb-10">About Me</h2>
            <p className="text-xl text-zinc-300 leading-relaxed whitespace-pre-line">
              {profile.bio}
            </p>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-5xl font-bold">Featured Projects</h2>
              <p className="text-zinc-400 mt-2">
                Click on any project to see details, video, and download APK
                when available
              </p>
            </div>

            <ProjectsGrid projects={completedProjects} />
          </div>
        </section>

        {/* Upcoming Apps */}
        {upcomingProjects.length > 0 && (
          <section id="upcoming" className="py-24 bg-zinc-900 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-5xl font-bold">Upcoming Apps</h2>
                <p className="text-zinc-400 mt-2">Currently in development</p>
              </div>
              <ProjectsGrid projects={upcomingProjects} />
            </div>
          </section>
        )}

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
              href={`mailto:${profile.email}`}
              className="text-2xl underline hover:text-emerald-400"
            >
              {profile.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center text-zinc-500 text-sm border-t border-zinc-800">
        Built with Next.js 15 • Learning in Public
      </footer>
    </>
  );
}
