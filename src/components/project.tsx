import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
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
  return useTransform(value, [0, 1], [-1.4 * distance, 1.4 * distance]);
}
function useParallaxXLeft(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, 1.4 * distance]);
}
function useParallaxXRight(value: MotionValue<number>, distance: number) {
  return useTransform(value, [1, 0], [-1.4 * distance, 0]);
}

export default function Project({ project, side }: ProjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // suaviza o scroll inteiro (mais “colado” e sem mudança seca)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 58,
    damping: 30,
    mass: 1.05,
  });

  // distância menor no mobile pra não “empurrar” pra fora
  const xDistanceCell = 24;
  const xDistanceLogo = 28;
  const yDistanceBg = 90;

  const contentOpacity = useTransform(smoothProgress, [0.02, 0.24, 1], [0, 1, 1]);
  const textOpacity = useTransform(smoothProgress, [0.08, 0.3, 1], [0, 1, 1]);
  const revealY = useTransform(smoothProgress, [0, 0.3, 1], [26, 0, -10]);
  const revealScale = useTransform(smoothProgress, [0, 0.3, 1], [0.96, 1, 1.01]);

  const xCell =
    side === "right"
      ? useParallaxXLeft(smoothProgress, xDistanceCell)
      : useParallaxXRight(smoothProgress, xDistanceCell);

  const xLogo =
    side === "right"
      ? useParallaxXRight(smoothProgress, xDistanceLogo)
      : useParallaxXLeft(smoothProgress, xDistanceLogo);

  const yBg = useParallax(smoothProgress, yDistanceBg);

  return (
    <motion.div
      ref={ref}
      className={cn(
        // mobile-first
        "relative w-full overflow-hidden flex flex-col items-center justify-center mt-4 px-4 sm:px-6 md:px-8",
        // desktop
        "md:h-[80vh] md:flex-row",
        { "md:flex-row-reverse": side === "right" }, // reverse só no desktop
      )}
    >
      {/* Coluna celular */}
      <div className="flex w-full md:w-1/2 z-10 md:h-full flex-col items-center md:items-start">
        <motion.img
          src={project.cellImage}
          alt=""
          style={{ opacity: contentOpacity, x: xCell, y: revealY, scale: revealScale }}
          className="w-auto h-[38vh] sm:h-[45vh] md:h-full object-contain"
        />
      </div>

      {/* Coluna conteúdo */}
      <div className="flex w-full md:w-1/2 md:h-full flex-col gap-4 items-center z-10 font-poppins text-coolWhite mt-6 md:mt-0">
        <motion.img
          src={project.image}
          alt=""
          style={{ opacity: contentOpacity, x: xLogo, y: revealY, scale: revealScale }}
          className="w-auto h-[10vh] sm:h-[12vh] md:h-2/6 object-contain"
        />

        <motion.div
          style={{ opacity: textOpacity, y: revealY }}
          className="flex flex-col items-start w-full sm:w-11/12 md:w-1/2 mt-2 md:mt-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Tecnologias
          </h1>
          <p className="text-base sm:text-lg md:text-xl mt-2">
            Frontend: {project.frontend}
          </p>
          <p className="text-base sm:text-lg md:text-xl mt-2">
            Backend: {project.backend}
          </p>

          <p className="text-sm sm:text-base md:text-sm mt-6 md:mt-8 text-justify">
            {project.description}
          </p>

          <button className="mt-6 md:mt-8 mx-auto hover:cursor-pointer rounded-full px-4 py-2 bg-transparent border-2 border-coolWhite hover:bg-coolWhite hover:text-black transition-colors duration-300">
            <p>Saiba Mais</p>
          </button>
        </motion.div>
      </div>

      {/* Fundo colorido */}
      <motion.div
        className={cn(
          "absolute z-0",
          // mobile: bloco atrás de tudo
          "w-[94%] top-6 bottom-6 rounded-xl",
          // desktop: volta ao estilo original e NÃO some
          "md:w-[96%] md:h-[74%] md:bottom-0 md:top-auto md:rounded-none",
          side === "left"
            ? "md:left-0 md:rounded-r-xl"
            : "md:right-0 md:rounded-l-xl",
        )}
        style={{
          y: yBg,
          backgroundColor: project.color,
        }}
      />
    </motion.div>
  );
}
