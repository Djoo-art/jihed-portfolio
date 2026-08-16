"use client";

import Button from "./Button";

export default function HeroActions() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="flex gap-4 justify-center">
      <Button variant="primary" onClick={() => scrollTo("projects")}>
        See My Work
      </Button>
      <Button variant="secondary" onClick={() => scrollTo("contact")}>
        Hire Me
      </Button>
    </div>
  );
}
