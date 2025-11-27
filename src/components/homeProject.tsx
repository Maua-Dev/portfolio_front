import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "../utils/cn";
import { useNavigate } from "react-router-dom";

/* Tipagem do projeto para garantir props consistentes */
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

/* Props esperadas pelo componente: projeto e lado (left | right) */
interface ProjectProps {
  project: Project;
  side: "left" | "right";
}

/* Hook utilitário para parallax vertical (retorna MotionValue transformado) */
function useParallax(value: MotionValue<number>, distance: number) {
  // mapeia [0,1] -> [-1.9*distance, 1.9*distance] para movimento vertical suave
  return useTransform(value, [0, 1], [-1.9 * distance, 1.9 * distance]);
}

/* Hook utilitário para parallax X quando a imagem está à esquerda */
function useParallaxXLeft(value: MotionValue<number>, distance: number) {
  // mapeia [0,1] -> [0, 1.9*distance] para deslocamento horizontal crescente
  return useTransform(value, [0, 1], [0, 1.9 * distance]);
}

/* Hook utilitário para parallax X quando a imagem está à direita */
function useParallaxXRight(value: MotionValue<number>, distance: number) {
  // mapeia [1,0] -> [-1.9*distance, 0] para deslocamento horizontal invertido
  return useTransform(value, [1, 0], [-1.9 * distance, 0]);
}

/* Componente principal que apresenta um projeto com efeito parallax */
export default function HomeProjetos({ project, side }: ProjectProps) {
  // referência ao container para observar progresso de scroll relativo
  const ref = useRef(null);
  // useScroll do framer-motion fornece scrollYProgress relativo ao target
  const { scrollYProgress } = useScroll({ target: ref });

  /* opacity: fade-out quando o scrollYProgress estiver entre 0.8 e 1 */
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // hook do react-router para navegar ao clicar em botão
  const navigate = useNavigate();

  /* Handler que navega para a rota de projetos */
  function handleMoreProjects() {
    navigate("/projects");
  }

  return (
    <div className="w-full px-8">
      {/* Título da seção de projetos */}
      <h1 className="text-6xl font-bold text-center mb-8" style={{ color: "#464646" }}>
        Projetos
      </h1>

      {/* Container motion que usa ref para calcular parallax com base no scroll */}
      <motion.div
        className={cn(
          "relative w-full h-[80vh] flex items-center justify-center mt-4",
          {
            // inverte a ordem visual quando side === "right"
            "flex-row-reverse": side === "right",
          },
        )}
        ref={ref}
      >
        {/* Coluna da esquerda/direita que contém a imagem do "cell" */}
        <div className="flex w-1/2 z-10 h-full flex-col">
          <motion.img
            src={project.cellImage}
            alt=""
            style={{
              // aplica fade com base em opacity e deslocamento X via parallax
              opacity: opacity,
              x:
                side === "right"
                  ? useParallaxXLeft(scrollYProgress, 40) // quando a imagem está à direita, usar parallax left
                  : useParallaxXRight(scrollYProgress, 40), // caso contrário, parallax right
            }}
            className="h-full w-auto"
          />
        </div>

        {/* Coluna com conteúdo textual e imagem principal do projeto */}
        <div className="flex w-1/2 h-full flex-col gap-4 items-center z-10 font-poppins text-coolWhite">
          <motion.img
            src={project.image}
            alt=""
            style={{
              // imagem principal também participa do parallax horizontal + fade
              opacity: opacity,
              x:
                side === "right"
                  ? useParallaxXRight(scrollYProgress, 50)
                  : useParallaxXLeft(scrollYProgress, 50),
            }}
            className="h-2/6 w-auto mb-1/6"
          />
          {/* Conteúdo textual com informações do projeto */}
          <div className="flex flex-col items-start mt-10 w-1/2">
            <h1 className="text-5xl font-bold">Tecnologias</h1>
            <p className="text-xl mt-2">Frontend: {project.frontend}</p>
            <p className="text-xl mt-2">Backend: {project.backend}</p>
            <p className="text-sm mt-8 text-justify">{project.description}</p>

            {/* Botão que navega para a página de projetos */}
            <button
              onClick={handleMoreProjects}
              className="mt-8 mx-auto rounded-full px-4 py-2 bg-transparent border-2 border-coolWhite hover:bg-coolWhite hover:text-black transition-colors duration-300"
            >
              MAIS PROJETOS
            </button>
          </div>
        </div>

        {/* Painel de fundo que recebe cor do projeto e movimento parallax vertical */}
        <motion.div
          className={cn(
            `absolute h-[90%] w-10/11 bottom-0 z-0 duration-75`,
            side === "left" ? "left-0 rounded-r-xl" : "right-0 rounded-l-xl",
          )}
          style={{
            // y usa useParallax para subir/descer suavemente com o scroll
            y: useParallax(scrollYProgress, 200),
            backgroundColor: project.color, // cor de destaque do projeto
          }}
        />
      </motion.div>
    </div>
  );
}

