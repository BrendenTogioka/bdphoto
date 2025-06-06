import * as React from "react";
import projects from "@/app/projects";
import ProjectClient from "./project-client";

export default function ProjectPage({ params }) {
  const { slug } = React.use(params);
  const project = projects.find((p) => p.slug === slug);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextIndex = (currentIndex + 1) % projects.length;
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

  const nextProject = projects[nextIndex];
  const prevProject = projects[prevIndex];

  return (
    <ProjectClient
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  );
}
