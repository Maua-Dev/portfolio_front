import { useEffect, useRef, useState } from "react";
import membersMock from "../utils/membersMock.json";
import "../assets/scrollbar.css"; // Importando o CSS para esconder scrollbar

type Member = {
  profileImage: string;
  name: string;
  course: string;
  courseYear: number;
  area: string;
  phone?: string;
  email?: string;
};

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [areas, setAreas] = useState<string[]>(["All"]);
  const [areaFilter, setAreaFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMembers(membersMock as Member[]);
    const uniqueAreas = Array.from(new Set(membersMock.map((m) => m.area)));
    setAreas(["All", ...uniqueAreas]);
  }, []);

  const filteredMembers =
    areaFilter === "All"
      ? members
      : members.filter((m) => m.area === areaFilter);

  // Atualiza número de páginas e página atual ao redimensionar ou ao rolar
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const updatePagination = () => {
      const containerWidth = container.offsetWidth;
      const totalScrollWidth = container.scrollWidth;
      const pageCount = Math.ceil(totalScrollWidth / containerWidth);
      setPagesCount(pageCount);
    };

    const handleScroll = () => {
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const current = Math.round(scrollLeft / containerWidth);
      setCurrentPage(current);
    };

    updatePagination();
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updatePagination);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePagination);
    };
  }, [filteredMembers]);

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

      {/* Carrossel com scroll */}
      <div className="w-full overflow-x-auto px-4 scrollbar-hide" ref={carouselRef}>
        <div className="flex gap-4 flex-nowrap scroll-smooth snap-x snap-mandatory">
          {filteredMembers.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 flex-shrink-0 snap-start flex flex-col items-center text-center
                min-w-[220px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[320px] min-h-[250px]"
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
      </div>

      {/* Bolinhas de paginação */}
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