import Link from "next/link";
import projects from "../projects";

export default function Projects() {
  return (
    <div className="h-screen flex-center">
      <ul className="">
        {projects.map((project) => (
          <li key={project.id} className="">
            <div className="">
              <span>&#8594;</span>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
