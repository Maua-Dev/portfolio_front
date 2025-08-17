import Project from "../components/project";
import cell1 from "../assets/cellImage1.png";
import img1 from "../assets/image1.png";
import cell2 from "../assets/cellImage2.png";
import img2 from "../assets/image2.png";
import { useTransform, MotionValue, motion, useScroll } from "motion/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useRef } from "react";

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
    <div className="flex flex-col overflow-x-hidden overflow-y-hidden justify-center gap-80 bg-coolWhite min-h-screen">
      <Navbar />
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ visibility: "hidden", translateY: 100 }}
          animate={{ visibility: "visible", translateY: 0 }}
          className="w-full h-[80vh] flex items-center justify-center"
        >
          <Project
            project={project}
            side={index % 2 === 0 ? "left" : "right"}
          />
        </motion.div>
      ))}
      <Footer />
    </div>
  );
}
