import React from "react";
import { Link } from "react-router-dom";
import imgQuantum from "../assets/quantumComp.png";
import imgUI from "../assets/UI.png";
import imgBusiness from "../assets/business.png";
import imgComunicacao from "../assets/comunica.png";
import imgEstrategia from "../assets/strategie.png";
import imgLideranca from "../assets/leadership.png";

interface Evento {
  titulo: string;
  imagem: string;
  descricao: string;
}

const eventos: Evento[] = [
  {
    titulo: "Computação Quântica",
    imagem: imgQuantum,
    descricao:
      "Explore os projetos da nossa entidade! Iniciativas que conectam, inovam e trazem grandes resultados.",
  },
  {
    titulo: "UX/UI",
    imagem: imgUI,
    descricao:
      "Explore os projetos da nossa entidade! Iniciativas que conectam, inovam e trazem grandes resultados.",
  },
  {
    titulo: "Business",
    imagem: imgBusiness,
    descricao:
      "Explore os projetos da nossa entidade! Iniciativas que conectam, inovam e trazem grandes resultados.",
  },
  {
    titulo: "Comunicação",
    imagem: imgComunicacao,
    descricao:
      "Explore os projetos da nossa entidade! Iniciativas que conectam, inovam e trazem grandes resultados.",
  },
  {
    titulo: "Estratégias",
    imagem: imgEstrategia,
    descricao:
      "Explore os projetos da nossa entidade! Iniciativas que conectam, inovam e trazem grandes resultados.",
  },
  {
    titulo: "Liderança",
    imagem: imgLideranca,
    descricao:
      "Explore os projetos da nossa entidade! Iniciativas que conectam, inovam e trazem grandes resultados.",
  },
];

const HomeEvents: React.FC = () => {
  return (
    <section className="bg-coolWhite">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          Eventos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {eventos.map((evento, index) => (
            <Link
              key={index}
              to="/events"
              className="block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
            >
              <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                <img
                  src={evento.imagem}
                  alt={evento.titulo}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-[1.03]"
                />
                <div className="absolute bottom-0 left-0 bg-black/60 text-white px-4 py-2 font-semibold text-base sm:text-lg">
                  {evento.titulo}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <p className="text-gray-600 text-sm mb-4">{evento.descricao}</p>

                <div className="flex flex-col">
                  <p className="font-semibold text-gray-700">Professores</p>
                  <p className="text-gray-500 text-sm">Lorem Ipsum</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeEvents;
