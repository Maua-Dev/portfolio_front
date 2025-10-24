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
    <section className="bg-coolWhite py-16 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Eventos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {eventos.map((evento, index) => (
          <Link
            key={index}
            to="/events" // 🔗 Todos os cards levam à mesma página
            className="block transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-lg overflow-hidden bg-white"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={evento.imagem}
                alt={evento.titulo}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-4 py-2 font-semibold text-lg">
                {evento.titulo}
              </div>
            </div>

            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4">{evento.descricao}</p>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-700">Professores</p>
                <p className="text-gray-500 text-sm">Lorem Ipsum</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeEvents;
