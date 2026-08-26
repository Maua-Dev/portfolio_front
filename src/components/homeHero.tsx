import React from "react";

const HomeHero: React.FC = () => {
  return (
    <section className="flex justify-center sm:justify-between items-center bg-gray-100 px-6 py-16 sm:px-12 sm:py-24 lg:px-20 lg:py-32 gap-x-16 flex-wrap">
      <div className="max-w-xl text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold text-[#2b2b2b]">
          Soluções ágeis{" "}
          <span className="hidden sm:inline">
            <br />
          </span>
          criadas por{" "}
          <span className="text-[#4b0000] font-extrabold">quem vive</span>{" "}
          <span className="hidden sm:inline">
            <br />
          </span>
          tecnologia.
        </h1>
      </div>
    </section>
  );
};

export default HomeHero;