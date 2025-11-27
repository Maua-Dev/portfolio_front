import React from "react"; // Import do React (não obrigatório com novo JSX runtime, mas mantido)
import imgQuantum from "../assets/quantumComp.png";
import imgUI from "../assets/UI.png";
import imgBusiness from "../assets/business.png";
import imgComunicacao from "../assets/comunica.png";
import imgEstrategia from "../assets/strategie.png";
import imgLideranca from "../assets/leadership.png";

// Define o shape de cada evento usado no array abaixo
interface Evento {
  titulo: string;
  imagem: string;
  descricao: string;
}

// Lista mock de eventos — usada para renderizar os cards
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

// Componente funcional que renderiza a seção de eventos
const Cards: React.FC = () => {
  return (
    // Seção contendo título e grid de cards
    <section className="bg-coolWhite py-16 px-6 md:px-12">
      {/* Título da seção */}
      <h2 className="text-4xl font-bold text-left text-gray-800 mb-12 max-w-6xl mx-auto">
        Últimos Eventos
      </h2>

      {/* Grid responsiva que mapeia o array de eventos para cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {eventos.map((evento, index) => (
          // Card do evento — usa index como key (melhor usar id único se disponível)
          <div
            key={index}
            className="block transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-lg overflow-hidden bg-white"
          >
            {/* Imagem do evento com overlay de título */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={evento.imagem}
                alt={evento.titulo}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
              {/* Overlay semi-transparente com o título do evento */}
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-4 py-2 font-semibold text-lg">
                {evento.titulo}
              </div>
            </div>

            {/* Corpo do card com descrição e informação adicional */}
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4">{evento.descricao}</p>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-700">Professores</p>
                <p className="text-gray-500 text-sm">Lorem Ipsum</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
