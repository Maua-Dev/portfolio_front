import React from "react";

const HomeHero: React.FC = () => {
  return (
    <section className="flex justify-between items-center bg-gray-100 px-20 py-32 gap-x-16 flex-wrap">
      <div className="max-w-xl">
        <h1 className="text-5xl leading-tight font-bold text-[#2b2b2b]">
          Soluções ágeis <br />
          criadas por{" "}
          <span className="text-[#4b0000] font-extrabold">quem vive</span>{" "}
          <br />
          tecnologia.
        </h1>
      </div>
    </section>
  );
};

export default HomeHero;
