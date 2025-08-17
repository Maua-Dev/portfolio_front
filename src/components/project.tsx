import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { cn } from "../utils/cn";
import { useRef } from "react";

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

function useParallax(value: MotionValue<number>, distance: number) {
  // valor eh o scroll, distancia eh o quanto vc quer de distancia do centro nos extremos, no caso tem q ajustar pra cada caso, e o parametro do meio eh de quanto ate quanto ele vai
  return useTransform(value, [0, 1], [0, 1.9 * distance]);
}

export default function Project({ project, side }: ProjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  return (
    <motion.div
      className={cn(
        "relative w-full h-[80vh] flex items-center justify-center mt-4 px-8",
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
          initial={{
            translateX: side === "right" ? 100 : -100,
            visibility: "hidden",
          }}
          style={{ y: useParallax(scrollYProgress, 100) }}
          whileInView={{ translateX: 0, visibility: "visible" }}
          className="h-full w-auto"
        />
      </div>
      <div className="flex w-1/2 h-full flex-col gap-4 items-center z-10 font-poppins text-coolWhite">
        <motion.img
          src={project.image}
          alt=""
          className="h-2/6 w-auto mb-1/6"
        />
        <div className="flex flex-col items-start mt-10 w-1/2">
          <h1 className="text-5xl font-bold">Tecnologias</h1>
          <p className="text-xl mt-2">Frontend: {project.frontend}</p>
          <p className="text-xl mt-2">Backend: {project.backend}</p>
          <p className="text-sm mt-8 text-justify">{project.description}</p>
          <button className="mt-8 mx-auto hover:cursor-pointer rounded-full px-4 py-2 bg-transparent border-2 border-coolWhite  hover:bg-coolWhite hover:text-black transition-colors duration-300 ">
            <p>Saiba Mais</p>
          </button>
        </div>
      </div>
      <motion.div
        className={cn(
          `absolute h-[80%] w-10/11 bottom-0 z-0`,
          side === "left" ? "left-0 rounded-r-xl" : "right-0 rounded-l-xl",
        )}
        style={{
          y: useParallax(scrollYProgress, 300),
          backgroundColor: project.color,
        }}
      />
    </motion.div>
  );
}
