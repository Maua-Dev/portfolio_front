import { useEffect, useRef, useState } from "react";
import membersMock from "../utils/membersMock.json";
import "../assets/scrollbar.css"; // CSS para esconder a scrollbar do carrossel

// Define a forma esperada de cada membro (tipagem TypeScript)
type Member = {
  profileImage: string;
  name: string;
  course: string;
  courseYear: number;
  area: string;
  phone?: string; // opcional
  email?: string; // opcional
};

export default function Members() {
  // Estado com a lista completa de membros (inicialmente vazia)
  const [members, setMembers] = useState<Member[]>([]);
  // Estado com as áreas únicas para os botões de filtro (inicia com "All")
  const [areas, setAreas] = useState<string[]>(["All"]);
  // Área atualmente selecionada no filtro
  const [areaFilter, setAreaFilter] = useState("All");
  // Página/bolinha ativa do carrossel
  const [currentPage, setCurrentPage] = useState(0);
  // Quantidade de "páginas" (bolinhas) do carrossel
  const [pagesCount, setPagesCount] = useState(1);
  // Referência ao container que faz scroll (carrossel)
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Efeito de inicialização: popula membros e extrai áreas únicas do mock
  useEffect(() => {
    setMembers(membersMock as Member[]);
    const uniqueAreas = Array.from(new Set(membersMock.map((m) => m.area)));
    setAreas(["All", ...uniqueAreas]);
  }, []);

  // Lista de membros depois de aplicar o filtro por área
  const filteredMembers =
    areaFilter === "All" ? members : members.filter((m) => m.area === areaFilter);

  // Efeito que atualiza paginação e index da página ativa quando o conteúdo
  // muda, e também adiciona listeners para scroll e resize do container.
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    // Calcula quantas "páginas" cabem no container com base na largura do scroll
    const updatePagination = () => {
      const containerWidth = container.offsetWidth;
      // Proteção: se largura 0, mantém 1 página e página 0
      if (!containerWidth) {
        setPagesCount(1);
        setCurrentPage(0);
        return;
      }
      const totalScrollWidth = container.scrollWidth;
      const pageCount = Math.max(1, Math.ceil(totalScrollWidth / containerWidth));
      setPagesCount(pageCount);
      // Ajusta a página atual para não ultrapassar o novo máximo
      setCurrentPage((prev) => Math.min(prev, pageCount - 1));
    };

    // Ao rolar, atualiza currentPage calculando a "página" atual
    const handleScroll = () => {
      const containerWidth = container.offsetWidth;
      if (!containerWidth) return;
      const scrollLeft = container.scrollLeft;
      const current = Math.round(scrollLeft / containerWidth);
      // Garante que current fique dentro do intervalo válido [0, pageCount-1]
      setCurrentPage((_) =>
        Math.max(
          0,
          Math.min(
            current,
            Math.max(0, Math.ceil(container.scrollWidth / containerWidth) - 1)
          )
        )
      );
    };

    // Inicializa paginação e adiciona listeners
    updatePagination();
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updatePagination);

    // Cleanup: remove listeners quando o componente desmonta ou filteredMembers muda
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePagination);
    };
  }, [filteredMembers]);

  return (
    // Seção principal com título, filtros, carrossel e paginação
    <section className="py-12 bg-gray-50">
      {/* Título */}
      <h2 className="text-3xl font-bold text-center mb-8">Membros</h2>

      {/* Botões de filtro por área (All + áreas únicas) */}
      <div className="flex justify-center flex-wrap gap-8 mb-10 px-4">
        {areas.map((area) => (
          <button
            key={area} // usar área como key (única)
            onClick={() => setAreaFilter(area)}
            className={`pb-2 text-base font-bold transition-colors bg-transparent rounded-none
              ${
                areaFilter === area
                  ? "text-gray-800 border-b-2 border-purple-700" // estilo ativo
                  : "text-gray-600 border-b-2 border-transparent hover:text-gray-800" // estilo inativo
              }`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Carrossel horizontal com scroll (container referenciado por carouselRef) */}
      <div className="w-full overflow-x-auto px-4 scrollbar-hide" ref={carouselRef}>
        {/* Linha flexível que contém os cards; usa snap para melhor UX ao rolar */}
        <div className="flex gap-4 flex-nowrap scroll-smooth snap-x snap-mandatory">
          {filteredMembers.map((m, i) => (
            // Cada card representa um membro
            <div
              key={m.email ?? m.name ?? i} // prioriza email/name como chave, fallback para index
              className="bg-white rounded-xl shadow-md p-6 flex-shrink-0 snap-start flex flex-col items-center text-center
                min-w-[220px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[320px] min-h-[250px]"
            >
              {/* Foto do membro */}
              <img
                src={m.profileImage}
                alt={m.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              {/* Nome */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {m.name}
              </h3>
              {/* Telefone (se disponível) */}
              {m.phone && (
                <p className="text-base text-gray-700 mb-1">{m.phone}</p>
              )}
              {/* Email (se disponível) — link mailto para fácil contato */}
              {m.email && (
                <a
                  href={`mailto:${m.email}`}
                  className="text-base text-purple-700 underline mb-1"
                >
                  {m.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de página (bolinhas) que refletem pagesCount e currentPage */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: pagesCount }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentPage ? "bg-purple-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}