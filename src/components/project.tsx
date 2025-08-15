interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  cellImage: string;
  frontend: string;
  backend: string;
}
interface ProjectProps {
  project: Project;
  side: string;
}

export default function Project({ project, side }: ProjectProps) {
  return (
    <div className="bg-red-300 w-full h-screen flex items-center justify-center">
      <div
        className={`max-w-md p-4 bg-white rounded shadow-md ${side === "left" ? "mr-4" : "ml-4"}`}
      >
        <h2 className="text-xl font-bold">{project.title}</h2>
        <p className="text-gray-700">{project.description}</p>
        <img src={project.image} alt={project.title} className="mt-2 rounded" />
      </div>
    </div>
  );
}
