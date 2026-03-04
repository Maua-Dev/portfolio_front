import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring,
} from "framer-motion";
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
  side: "left" | "right";
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

export default function HomeProjetos({ project, side }: ProjectProps) {
  const ref = useRef<HTMLDivElement | null>(null);
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
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.75,
  });

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
    <section className="w-full bg-coolWhite">
      <div className="w-full py-10 sm:py-14">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-6 sm:mb-8 px-4 sm:px-6 md:px-8"
          style={{ color: "#464646" }}
        >
          Projetos
        </h1>

        <motion.div
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden",
            // Mobile: altura automática (não trava em 80vh)
            "min-h-[540px] md:min-h-[74vh]",
            // Mobile: coluna | Desktop: duas colunas
            "flex flex-col md:flex-row items-center justify-center",
            // espaçamento
            "gap-6 md:gap-0",
            {
              // No desktop, mantém a inversão quando side === "right"
              "md:flex-row-reverse": side === "right",
            },
          )}
        >
          {/* Coluna "cell" */}
          <div className="flex w-full md:w-1/2 z-10 md:h-full flex-col items-center justify-center overflow-hidden">
            <motion.img
              src={project.cellImage}
              alt=""
              style={{ opacity: contentOpacity, x: xCell, y: cellRevealY, scale: cellScale }}
              className={cn(
                // Mobile: limita altura pra não estourar
                "h-[38vh] sm:h-[44vh] md:h-[74%] w-auto",
                // garante que não vaze
                "max-w-full drop-shadow-[0_18px_34px_rgba(0,0,0,0.35)]",
              )}
            />
          </div>

          {/* Coluna conteúdo */}
          <div className="flex w-full md:w-1/2 z-10 md:h-full flex-col gap-3 items-start font-poppins text-[#3f4650] overflow-visible px-4 sm:px-6 md:px-0">
            <motion.img
              src={project.image}
              alt=""
              style={{ opacity: contentOpacity, x: xLogo, y: logoRevealY, scale: logoScale }}
              className={cn(
                "w-auto max-w-full",
                // Logo menor para equilibrar com o mockup do celular
                "h-14 sm:h-16 md:h-[24%]",
                // espaçamento
                "mt-1 md:mt-2",
              )}
            />

            <motion.div
              style={{ opacity: textOpacity, y: logoRevealY }}
              className={cn(
                "flex flex-col",
                // Mobile: centraliza e usa largura maior
                "w-full max-w-md px-2 sm:px-0",
                // Desktop: mantém sua largura mais estreita
                "md:w-[62%] md:max-w-none",
                // alinhamento do texto
                "text-left",
                // no desktop você tinha mt-10; no mobile isso vira menor
                "mt-3 sm:mt-4 md:mt-6",
              )}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Tecnologias
              </h2>

              <p className="text-base sm:text-lg md:text-xl mt-3">
                Frontend: {project.frontend}
              </p>
              <p className="text-base sm:text-lg md:text-xl mt-2">
                Backend: {project.backend}
              </p>

              <p className="text-sm sm:text-base mt-5 md:mt-6 text-left leading-relaxed">
                {project.description}
              </p>

            </motion.div>
          </div>

          {/* Painel de fundo */}
          <motion.div
            className={cn(
              "absolute bottom-0 z-0",
              // altura do painel
              "h-[60%] md:h-[50%]",
              // largura correta (w-10/11 não é padrão)
              "w-[94%] md:w-[95%]",
              // arredondamento e posição
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
      </div>
    </section>
  );
}
