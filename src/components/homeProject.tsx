import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "../utils/cn";
import { useNavigate } from "react-router-dom";

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
  side: "left" | "right";
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-1.9 * distance, 1.9 * distance]);
}
function useParallaxXLeft(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, 1.9 * distance]);
}
function useParallaxXRight(value: MotionValue<number>, distance: number) {
  return useTransform(value, [1, 0], [-1.9 * distance, 0]);
}

export default function HomeProjetos({ project, side }: ProjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const navigate = useNavigate();

  function handleMoreProjects() {
    navigate("/projects");
  }

  return (
    <div className="w-full px-8">
      <h1 className="text-6xl font-bold text-center mb-8" style={{ color: "#464646" }}>
        Projetos
      </h1>


      <motion.div
        className={cn(
          "relative w-full h-[80vh] flex items-center justify-center mt-4",
          {
            "flex-row-reverse": side === "right",
          },
        )}
        ref={ref}
      >
        <div className="flex w-1/2 z-10 h-full flex-col">
          <motion.img
            src={project.cellImage}
            alt=""
            style={{
              opacity: opacity,
              x:
                side === "right"
                  ? useParallaxXLeft(scrollYProgress, 40)
                  : useParallaxXRight(scrollYProgress, 40),
            }}
            className="h-full w-auto"
          />
        </div>
        <div className="flex w-1/2 h-full flex-col gap-4 items-center z-10 font-poppins text-coolWhite">
          <motion.img
            src={project.image}
            alt=""
            style={{
              opacity: opacity,
              x:
                side === "right"
                  ? useParallaxXRight(scrollYProgress, 50)
                  : useParallaxXLeft(scrollYProgress, 50),
            }}
            className="h-2/6 w-auto mb-1/6"
          />
          <div className="flex flex-col items-start mt-10 w-1/2">
            <h1 className="text-5xl font-bold">Tecnologias</h1>
            <p className="text-xl mt-2">Frontend: {project.frontend}</p>
            <p className="text-xl mt-2">Backend: {project.backend}</p>
            <p className="text-sm mt-8 text-justify">{project.description}</p>
            <button
              onClick={handleMoreProjects}
              className="mt-8 mx-auto rounded-full px-4 py-2 bg-transparent border-2 border-coolWhite hover:bg-coolWhite hover:text-black transition-colors duration-300"
            >
              MAIS PROJETOS
            </button>
          </div>
        </div>
        <motion.div
          className={cn(
            `absolute h-[90%] w-10/11 bottom-0 z-0 duration-75`,
            side === "left" ? "left-0 rounded-r-xl" : "right-0 rounded-l-xl",
          )}
          style={{
            y: useParallax(scrollYProgress, 200),
            backgroundColor: project.color,
          }}
        />
      </motion.div>
    </div>
  );
}

