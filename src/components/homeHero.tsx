import React from "react";

/**
 * HomeHero
 * Seção hero da página inicial (responsiva).
 */
const HomeHero: React.FC = () => {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28 flex items-center justify-between gap-8 md:gap-16 flex-col md:flex-row">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-[#2b2b2b]">
            Soluções ágeis <br />
            criadas por{" "}
            <span className="text-[#4b0000] font-extrabold">quem vive</span>{" "}
            <br />
            tecnologia.
          </h1>
        </div>

        {/* Espaço para imagem/CTA no futuro */}
        {/* <div className="w-full md:w-[420px]">...</div> */}
      </div>
    </section>
  );
};

export default HomeHero;
