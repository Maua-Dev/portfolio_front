import Project from "../components/project";
import cell1 from "../assets/cellImage1.png";
import img1 from "../assets/image1.png";
import cell2 from "../assets/cellImage2.png";
import img2 from "../assets/image2.png";
import { motion } from "motion/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import InfoComponent from "../components/infoComponent";
import InfoComponentImages from "../components/infoComponentElements/infoComponentImages";

import projectsImage1 from "../assets/projectsImage1.png";
import projectsImage2 from "../assets/projectsImage2.png";
import projectsImage3 from "../assets/projectsImage3.png";

const images = [
  { src: projectsImage1, alt: "Projetos da dev" },
  { src: projectsImage2, alt: "Projetos da dev" },
  { src: projectsImage3, alt: "Projetos da dev" },
];

const projects = [
  {
    id: "1",
    title: "Project 1",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem lorem lorem lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: img1,
    cellImage: cell1,
    frontend: "React",
    backend: "Node.js",
    color: "#AE0404E5",
  },
  {
    id: "2",
    title: "Project 2",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem lorem lorem lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: img2,
    cellImage: cell2,
    frontend: "React",
    backend: "Node.js",
    color: "#0080F591",
  },
];

export default function Projects() {
  return (
    <div className="flex flex-col overflow-x-hidden justify-center gap-32 bg-coolWhite min-h-screen">
      <Navbar />

      <div className="p-4 sm:p-6">
        <main className="flex-grow mx-auto w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex w-full flex-col">
            <InfoComponent
              title="Projetos"
              description="Bem-vindo a Dev Community: o espaco onde estudantes de tecnologia se conectam, aprendem e criam solucoes inovadoras juntos."
            />
          </div>

          <div className="w-full flex justify-center">
            <InfoComponentImages quantity={3} images={images} />
          </div>
        </main>
      </div>

      <h1> </h1>

      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ visibility: "hidden", translateY: 100 }}
          animate={{ visibility: "visible", translateY: 0 }}
          className="w-full h-[80vh] flex items-center justify-center"
        >
          <Project project={project} side={index % 2 === 0 ? "left" : "right"} />
        </motion.div>
      ))}

      <Footer />
    </div>
  );
}
