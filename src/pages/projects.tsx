import Project from "../components/project";
import cell1 from "../assets/newCellImage1.png";
import img1 from "../assets/image1.png";
import cell2 from "../assets/newCellImage2.png";
import img2 from "../assets/image2.png";
import { motion } from "motion/react";
import Navbar from "../components/navbarMobile";
import Footer from "../components/footerMobile";
import InfoComponent from "../components/infoComponent";
import InfoComponentImages from "../components/infoComponentElements/infoComponentImages";
import projectsImage1 from "../assets/projectsImage1.png";
import projectsImage2 from "../assets/projectsImage2.png";
import projectsImage3 from "../assets/projectsImage3.png";
import { useAuth } from "../hooks/useAuth";

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
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col overflow-x-hidden justify-center gap-16 md:gap-32 bg-coolWhite min-h-screen">
      <Navbar />
      <div className="p-4 sm:p-6 md:p-10">
        <main className="flex-grow flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
          <InfoComponent
            title="Projetos"
            description="Bem-vindo à Dev Community: o espaço onde estudantes de tecnologia se conectam, aprendem e criam soluções inovadoras juntos."
          />
          <InfoComponentImages quantity={3} images={images} />
        </main>
      </div>
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ visibility: "hidden", translateY: 100 }}
          animate={{ visibility: "visible", translateY: 0 }}
          className="w-full min-h-[70vh] md:h-[80vh] flex items-center justify-center py-8 md:py-0"
        >
          <Project
            project={project}
            side={index % 2 === 0 ? "left" : "right"}
            isLoggedIn={isLoggedIn}
          />
        </motion.div>
      ))}
      <Footer />
    </div>
  );
}