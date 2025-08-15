import { cn } from "../utils/cn";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  cellImage: string;
  frontend: string;
  backend: string;
  color: string;
}
interface ProjectProps {
  project: Project;
  side: string;
}

export default function Project({ project, side }: ProjectProps) {
  return (
    <div className="bg-red-300 relative w-full h-[80vh] flex items-center justify-center mt-4">
      <div className="flex w-1/2 h-full flex-col">
        <img src={project.cellImage} alt="" />
      </div>
      <div className="flex w-1/2 h-full flex-col items-center justify-center z-10 font-poppins text-coolWhite">
        <img src={project.image} alt="" />
        <h1 className="text-4xl">Tecnologias</h1>
        <p className="text-2xl">Frontend: {project.frontend}</p>
        <p className="text-2xl">Backend: {project.backend}</p>
        <p className="text-xl">{project.description}</p>
        <button className="rounded-full px-4 py-2 bg-transparent border-2 border-coolWhite  hover:bg-coolWhite hover:text-black transition-colors duration-300 ">
          <p>Saiba Mais</p>
        </button>
      </div>
      <div
        className={cn(
          `absolute h-5/6 w-10/11 bottom-0 z-0`,
          side === "left" ? "left-0 rounded-r-xl" : "right-0 rounded-l-xl",
        )}
        style={{ backgroundColor: project.color }}
      />
    </div>
  );
}
