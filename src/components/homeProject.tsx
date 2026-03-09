import ProjectCard from "./project";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  cellImage: string;
  frontend: string;
  backend: string;
  color: string;
}

interface HomeProjectProps {
  project: ProjectData;
  side: "left" | "right";
}

export default function HomeProjetos({ project, side }: HomeProjectProps) {
  return (
    <section className="w-full bg-coolWhite py-10 sm:py-14">
      <h1
        className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-6 sm:mb-8 px-4 sm:px-6 md:px-8"
        style={{ color: "#464646" }}
      >
        Projetos
      </h1>

      <ProjectCard project={project} side={side} />
    </section>
  );
}
