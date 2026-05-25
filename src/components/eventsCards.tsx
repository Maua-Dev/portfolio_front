import React from "react";
import imgQuantum from "../assets/quantumComp.png";
import imgUI from "../assets/UI.png";
import imgBusiness from "../assets/business.png";
// import imgComunicacao from "../assets/comunica.png";
// import imgEstrategia from "../assets/strategie.png";
// import imgLideranca from "../assets/leadership.png";
import devinthedark from "../assets/devinthedark.jpg";
import designityourself from "../assets/designityourself.jpg";
import battlesnake from "../assets/battlesnake.jpg";
import deleteEvent from "../assets/deleteEvents.png";
import editEvent from "../assets/editEvents.png";
import { useAuth } from "../hooks/useAuth";

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
  // {
  //   titulo: "Comunicação",
  //   imagem: imgComunicacao,
  //   descricao:
  //     "Explore os projetos da nossa entidade! Iniciativas que conectam, inovam e trazem grandes resultados.",
  // },
  // {
  //   titulo: "Estratégias",
  //   imagem: imgEstrategia,
  //   descricao:
  //     "Explore os projetos da nossa entidade! Iniciativas que conectam, inovam e trazem grandes resultados.",
  // },
  // {
  //   titulo: "Liderança",
  //   imagem: imgLideranca,
  //   descricao:
  //     "Explore os projetos da nossa entidade! Iniciativas que conectam, inovam e trazem grandes resultados.",
  // },
  {
    titulo: "BattleSnake",
    imagem: battlesnake,
    descricao:
      "No campeonato BattleSnake, você não joga, você PROGRAMA a estratégia da sua cobra para lutar pela sobrevivência contra outras IAs no tabuleiro. É uma competição de lógica, criatividade e habilidade de back-end.",
  },
  {
    titulo: "Dev in the Dark",
    imagem: devinthedark,
    descricao:
      "Os participantes receberão uma captura de tela de uma interface e deverão reproduzir essa tela usando HTML e CSS, sem visualizar o resultado do código enquanto programam. A visualização será liberada apenas após a finalização do tempo, revelando o quão perto (ou longe) você chegou do layout original.",
  },
  {
    titulo: "Design it Yourself",
    imagem: designityourself,
    descricao:
      "Os participantes, em grupo, irão desenvolver uma interface do zero baseado em um briefing proposto para cada grupo. Vocês irão passar por todas as etapas que integram o desenvolvimento de um design, sempre levando em conta a experiência do usuário e a área de interação.",
  },
];

const Cards: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <section className="bg-coolWhite py-16 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-left text-gray-800 mb-12 max-w-6xl mx-auto">
        Últimos Eventos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {eventos.map((evento, index) => (
          <div
            key={index}
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
                <p className="font-semibold text-gray-700">Palestrantes</p>
                <p className="text-gray-500 text-sm mb-4">Dev Community Mauá</p>
                {isLoggedIn && (
                  <div className="flex flex-row gap-2">
                    <button className="hover:brightness-75 transition-all duration-200">
                      <img src={deleteEvent} alt="Deletar" className="w-6 h-6" />
                    </button>
                    <button className="hover:brightness-75 transition-all duration-200">
                      <img src={editEvent} alt="Editar" className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
