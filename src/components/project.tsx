import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { cn } from "../utils/cn";
import { useEffect, useRef, useState } from "react";

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
  return useTransform(value, [0, 1], [-distance, distance]);
}
function useParallaxXLeft(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, distance]);
}
function useParallaxXRight(value: MotionValue<number>, distance: number) {
  return useTransform(value, [1, 0], [-distance, 0]);
}

export default function Project({ project, side }: ProjectProps) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ✅ suaviza o scroll inteiro (mais “colado” e sem mudança seca)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.75,
  });

  // Mantém o efeito visível no desktop e evita sobreposição no mobile.
  const xDistanceCell = isMobile ? 16 : 44;
  const xDistanceLogo = isMobile ? 10 : 26;
  const yDistanceBg = isMobile ? 36 : 70;

  const contentOpacity = useTransform(smoothProgress, [0.05, 0.28, 0.95], [0, 1, 1]);
  const textOpacity = useTransform(smoothProgress, [0.08, 0.32, 0.95], [0, 1, 1]);
  const cellRevealY = useTransform(
    smoothProgress,
    [0, 0.35, 1],
    [isMobile ? 40 : 55, 0, isMobile ? -12 : -20],
  );
  const logoRevealY = useTransform(
    smoothProgress,
    [0, 0.35, 1],
    [isMobile ? 18 : 26, 0, isMobile ? -8 : -14],
  );
  const cellScale = useTransform(smoothProgress, [0, 0.35, 1], [0.92, 1, 1.02]);
  const logoScale = useTransform(smoothProgress, [0, 0.35, 1], [0.95, 1, 1.01]);

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
        "min-h-[560px] md:h-[78vh] md:flex-row",
        { "md:flex-row-reverse": side === "right" }, // reverse só no desktop
      )}
    >
      {/* Coluna celular */}
      <div className="flex w-full md:w-1/2 z-10 md:h-full flex-col items-center md:items-start overflow-hidden">
        <motion.img
          src={project.cellImage}
          alt=""
          style={{ opacity: contentOpacity, x: xCell, y: cellRevealY, scale: cellScale }}
          className="w-auto h-[42vh] sm:h-[50vh] md:h-[88%] object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.35)]"
        />
      </div>

      {/* Coluna conteúdo */}
      <div className="flex w-full md:w-1/2 md:h-full flex-col gap-4 items-center z-10 font-poppins text-[#3f4650] mt-6 md:mt-0 overflow-hidden px-4 sm:px-6 md:px-0">
        <motion.img
          src={project.image}
          alt=""
          style={{ opacity: contentOpacity, x: xLogo, y: logoRevealY, scale: logoScale }}
          className="w-auto h-16 sm:h-20 md:h-[30%] object-contain mt-2 md:mt-6"
        />

        <motion.div
          style={{ opacity: textOpacity, y: logoRevealY }}
          className="flex flex-col items-start w-full sm:w-11/12 md:w-[62%] mt-2 sm:mt-4 md:mt-3"
        >
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold">
            Tecnologias
          </h1>
          <p className="text-base sm:text-lg md:text-xl mt-3">
            Frontend: {project.frontend}
          </p>
          <p className="text-base sm:text-lg md:text-xl mt-2">
            Backend: {project.backend}
          </p>

          <p className="text-sm sm:text-base md:text-sm mt-6 md:mt-7 text-justify leading-relaxed">
            {project.description}
          </p>

          <button className="mt-6 md:mt-8 md:mx-0 mx-auto rounded-md px-5 py-2 bg-coolWhite text-[#3f4650] text-xs font-medium border border-transparent hover:opacity-90 transition-opacity duration-300">
            <p>MAIS PROJETOS</p>
          </button>
        </motion.div>
      </div>

      {/* Fundo colorido */}
      <motion.div
        className={cn(
          "absolute z-0 duration-75",
          // mobile: bloco atrás de tudo
          "w-[92%] top-2 bottom-2 rounded-xl",
          // desktop: volta ao estilo original e NÃO some
          "md:w-10/11 md:h-[90%] md:bottom-0 md:top-auto md:rounded-none",
          side === "left"
            ? "left-0 rounded-r-xl md:rounded-r-2xl"
            : "right-0 rounded-l-xl md:rounded-l-2xl",
        )}
        style={{
          y: yBg,
          backgroundColor: project.color,
          boxShadow: "0 24px 45px rgba(0, 0, 0, 0.22)",
        }}
      />
    </motion.div>
  );
}
