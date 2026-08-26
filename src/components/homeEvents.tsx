import React from "react"; // Import do React (não obrigatório com novo JSX runtime, mantido por compatibilidade
import { Link } from "react-router-dom"; // Usado para navegação interna sem reload de página
import imgQuantum from "../assets/quantumComp.png"; // Imagens usadas nos cards de evento
import imgUI from "../assets/UI.png";
import imgBusiness from "../assets/business.png";
import imgComunicacao from "../assets/comunica.png";
import imgEstrategia from "../assets/strategie.png";
import imgLideranca from "../assets/leadership.png";

/**
 * Interface Evento
 * Define o formato/shape que cada item de evento deve ter:
 * - titulo: texto exibido no card
 * - imagem: caminho para a imagem do evento
 * - descricao: texto de descrição exibido no corpo do card
 */
interface Evento {
  titulo: string;
  imagem: string;
  descricao: string;
}

/**
 * Mock de eventos
 * Array local usado apenas para renderizar os cards.
 * Em produção, substituir por dados vindos de API ou props.
 */
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

/**
 * Componente HomeEvents
 * - Renderiza a seção de eventos com título e um grid responsivo de cards.
 * - Cada card é um Link que aponta para '/events' (todos levam à mesma rota por enquanto).
 * - Usa index como key no map (idealmente usar um id único no futuro).
 */
const HomeEvents: React.FC = () => {
  return (
    // Seção principal com padding e cor de fundo
    <section className="bg-coolWhite py-16 px-6 md:px-12">
      {/* Título centrado da seção */}
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Eventos
      </h2>

      {/* Grid responsivo: 1 coluna mobile, 2 em sm, 3 em lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {eventos.map((evento, index) => (
          // Cada card é um Link para permitir navegação interna sem recarregar a página
          // Key baseada em index — trocar para id único quando disponível
          <Link
            key={index}
            to="/events" // Todos os cards atualmente apontam para a mesma rota
            className="block transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-lg overflow-hidden bg-white"
          >
            {/* Container da imagem com overlay para título */}
            <div className="relative h-48 w-full overflow-hidden">
              {/* Imagem do evento — usar alt descritivo para acessibilidade */}
              <img
                src={evento.imagem}
                alt={evento.titulo}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
              {/* Overlay preta semi-transparente com o título do evento */}
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-4 py-2 font-semibold text-lg">
                {evento.titulo}
              </div>
            </div>

            {/* Corpo do card: descrição e metadados (aqui exemplo estático de professores) */}
            <div className="p-4">
              {/* Descrição do evento */}
              <p className="text-gray-600 text-sm mb-4">{evento.descricao}</p>
              {/* Área para informações adicionais - atualmente hardcoded */}
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

export default HomeEvents; // Export default do componente
