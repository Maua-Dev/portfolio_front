import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { cn } from "../utils/cn";
import { useRef } from "react";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

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
  isLoggedIn?: boolean;
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

export default function Project({ project, side, isLoggedIn }: ProjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const parallaxY = useParallax(scrollYProgress, 200);
  const parallaxXLeft40 = useParallaxXLeft(scrollYProgress, 40);
  const parallaxXRight40 = useParallaxXRight(scrollYProgress, 40);
  const parallaxXLeft50 = useParallaxXLeft(scrollYProgress, 50);
  const parallaxXRight50 = useParallaxXRight(scrollYProgress, 50);

  const cellX = side === "right" ? parallaxXLeft40 : parallaxXRight40;
  const imageX = side === "right" ? parallaxXRight50 : parallaxXLeft50;

  return (
    <motion.div
      className={cn(
        "relative w-full h-[80vh] flex items-center justify-center mt-4 px-8",
        { "flex-row-reverse": side === "right" }
      )}
      ref={ref}
    >
      <div className="flex w-1/2 z-10 h-full flex-col">
        <motion.img
          src={project.cellImage}
          alt=""
          style={{ opacity, x: cellX }}
          className="h-full w-auto"
        />
      </div>

      <div className="flex w-1/2 h-full flex-col gap-4 items-center z-10 font-poppins text-coolWhite">
        <motion.img
          src={project.image}
          alt=""
          style={{ opacity, x: imageX }}
          className="h-2/6 w-auto mb-1/6"
        />

        <div className="flex flex-col items-start mt-10 w-1/2">
          <h1 className="text-5xl font-bold">Tecnologias</h1>
          <p className="text-xl mt-2">Frontend: {project.frontend}</p>
          <p className="text-xl mt-2">Backend: {project.backend}</p>
          <p className="text-sm mt-8 text-justify">{project.description}</p>
          <button className="mt-8 mx-auto hover:cursor-pointer rounded-full px-4 py-2 bg-transparent border-2 border-coolWhite hover:bg-coolWhite hover:text-black transition-colors duration-300">
            <p>Saiba Mais</p>
          </button>
        </div>
      </div>

      <motion.div
        className={cn(
          "absolute h-[90%] w-10/11 bottom-0 z-0 duration-75",
          side === "left" ? "left-0 rounded-r-xl" : "right-0 rounded-l-xl"
        )}
        style={{ y: parallaxY, backgroundColor: project.color }}
      >
        {isLoggedIn && (
          <div
            className={cn(
              "absolute flex gap-3",
              side === "left"
                ? "top-4 right-4"
                : "bottom-4 left-4"
            )}
          >
            <button
              aria-label="Editar projeto"
              className="hover:brightness-75 transition-all duration-200"
            >
              <img src={editIcon} alt="Editar" className="w-6 h-6" />
            </button>
            <button
              aria-label="Deletar projeto"
              className="hover:brightness-75 transition-all duration-200"
            >
              <img src={deleteIcon} alt="Deletar" className="w-6 h-6" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}