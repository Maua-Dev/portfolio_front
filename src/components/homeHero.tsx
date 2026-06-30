import React from "react";

/**
 * HomeHero
 * Componente funcional que renderiza a seção hero da página inicial.
 * - Sem props; conteúdo estático.
 * - Usa utilitários do Tailwind CSS para layout responsivo e espaçamento.
 */
const HomeHero: React.FC = () => {
  return (
    // Seção principal: container flex com espaçamento, padding e quebra em wrap
    <section className="flex justify-between items-center bg-gray-100 px-20 py-32 gap-x-16 flex-wrap">
      {/* Coluna de texto com largura máxima para controlar quebra de linha */}
      <div className="max-w-xl">
        {/* Título principal:
            - text-5xl: tamanho grande do título
            - leading-tight: reduz espaçamento entre linhas
            - font-bold: negrito
            - text-[#2b2b2b]: cor personalizada
            - Fragmentos em span para ênfase com cor/fonte diferente
        */}
        <h1 className="text-5xl leading-tight font-bold text-[#2b2b2b]">
          Soluções ágeis <br />
          criadas por{" "}
          <span className="text-[#4b0000] font-extrabold">quem vive</span>{" "}
          <br />
          tecnologia.
        </h1>
      </div>
      {/* Aqui poderia entrar uma imagem ou CTA no futuro (atualmente só texto) */}
    </section>
  );
};

export default HomeHero;
