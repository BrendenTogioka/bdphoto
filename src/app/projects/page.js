import Link from "next/link";
import projects from "../projects";

export default function Projects() {
  return (
    <div className=" flex-center flex-col">
      <h1 className="text-4xl md:text-8xl pt-16 pb-10">Projects</h1>
      <ul className="relative w-full grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 px-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`}>
            <li className="relative w-full h-full aspect-square flex-center flex-row rounded-lg overflow-hidden drop-shadow-lg p-6 text-neutral-100 font-medium">
              <div className="relative z-10 flex-center gap-2">
                <span>&#8594;</span>
                <h2 className="text-4xl">{project.title}</h2>
              </div>

              <img
                src={project.finalImage}
                alt="img"
                className="absolute top-0 left-0 z-0 w-full h-full object-cover"
              />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
