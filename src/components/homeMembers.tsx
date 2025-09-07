import { useEffect, useState } from "react";
import membersMock from "../utils/membersMock.json";

type Member = {
  profileImage: string;
  name: string;
  course: string;
  courseYear: number;
  area: string;
  phone?: string;
  email?: string;
};

const cardsPerPage = 5;

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [areas, setAreas] = useState<string[]>(["All"]);
  const [areaFilter, setAreaFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Carregar os dados do JSON mockado
    setMembers(membersMock as Member[]);

    // Gerar lista de áreas únicas
    const uniqueAreas = Array.from(new Set(membersMock.map((m) => m.area)));
    setAreas(["All", ...uniqueAreas]);
  }, []);

  const filteredMembers =
    areaFilter === "All"
      ? members
      : members.filter((m) => m.area === areaFilter);

  const totalPages = Math.ceil(filteredMembers.length / cardsPerPage);

  const getCurrentMembers = () => {
    const start = currentPage * cardsPerPage;
    const end = start + cardsPerPage;
    return filteredMembers.slice(start, end);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [areaFilter]);

  const currentMembers = getCurrentMembers();

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Membros</h2>

      {/* Filtros */}
      <div className="flex justify-center flex-wrap gap-8 mb-10 px-4">
        {areas.map((area) => (
          <button
            key={area}
            onClick={() => setAreaFilter(area)}
            className={`pb-2 text-base font-bold transition-colors
              ${
                areaFilter === area
                  ? "text-gray-800 border-b-2 border-purple-700"
                  : "text-gray-600 border-b-2 border-transparent hover:text-gray-800"
              }`}
            style={{ background: "none", borderRadius: 0 }}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Carrossel com botões */}
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 px-4 relative">
        {/* Botão Anterior */}
        <button
          onClick={handlePrev}
          aria-label="Anterior"
          className="absolute left-0 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition"
        >
          ←
        </button>

        <div className="flex gap-4 overflow-hidden">
          {currentMembers.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
              style={{ width: "220px", minHeight: "250px" }}
            >
              <img
                src={m.profileImage}
                alt={m.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {m.name}
              </h3>
              {m.phone && (
                <p className="text-base text-gray-700 mb-1">{m.phone}</p>
              )}
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

        {/* Botão Próximo */}
        <button
          onClick={handleNext}
          aria-label="Próximo"
          className="absolute right-0 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition"
        >
          →
        </button>
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-6 space-x-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === currentPage ? "bg-purple-600" : "bg-gray-300"
            }`}
            aria-label={`Página ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
