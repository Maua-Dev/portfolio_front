import { WheelEvent, useEffect, useRef, useState } from "react";
import membersMock from "../utils/membersMock.json";
import "../assets/scrollbar.css";

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

  const MAX_VISIBLE_DOTS = 7;

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMembers(membersMock as Member[]);
    const uniqueAreas = Array.from(new Set(membersMock.map((m) => m.area)));
    setAreas(["All", ...uniqueAreas]);
  }, []);

  const filteredMembers =
    areaFilter === "All"
      ? members
      : members.filter((m) => m.area === areaFilter);

  // Mede o "passo" real: largura do card + gap do track (gap-6)
  const getCardStep = () => {
    const card = cardRef.current;
    const track = trackRef.current;
    if (!card) return 0;

    let gap = 0;
    if (track) {
      const style = window.getComputedStyle(track);
      gap = parseInt(style.columnGap || style.gap || "0", 10);
    }

    return card.offsetWidth + gap;
  };

  const scrollToCard = (index: number) => {
    const container = carouselRef.current;
    const step = getCardStep();
    if (!container || !step) return;

    container.scrollTo({
      left: index * step,
      behavior: "smooth",
    });
  };

  const handlePrev = () => scrollToCard(Math.max(0, currentPage - 1));
  const handleNext = () => scrollToCard(Math.min(pagesCount - 1, currentPage + 1));
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const container = carouselRef.current;
    if (!container) return;

    e.preventDefault();
    e.stopPropagation();

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    container.scrollLeft += delta;
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const updatePagination = () => {
      const step = getCardStep();
      if (!step) {
        setPagesCount(1);
        setCurrentPage(0);
        return;
      }

      // quantidade de "páginas" pelo passo (1 card por passo)
      const count = Math.max(1, Math.ceil(container.scrollWidth / step));
      setPagesCount(count);
      setCurrentPage((prev) => Math.min(prev, count - 1));
    };

    const handleScroll = () => {
      const step = getCardStep();
      if (!step) return;

      const current = Math.round(container.scrollLeft / step);
      setCurrentPage(Math.max(0, Math.min(current, pagesCount - 1)));
    };

    updatePagination();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updatePagination);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePagination);
    };
  }, [filteredMembers, pagesCount]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, pagesCount]);

  const getVisibleDots = () => {
    if (pagesCount <= MAX_VISIBLE_DOTS) return { start: 0, end: pagesCount };

    const half = Math.floor(MAX_VISIBLE_DOTS / 2);
    let start = currentPage - half;
    let end = currentPage + half + 1;

    if (start < 0) {
      start = 0;
      end = MAX_VISIBLE_DOTS;
    }

    if (end > pagesCount) {
      end = pagesCount;
      start = pagesCount - MAX_VISIBLE_DOTS;
    }

    return { start, end };
  };

  const { start, end } = getVisibleDots();
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < pagesCount - 1;

  useEffect(() => {
    setCurrentPage(0);
    scrollToCard(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaFilter]);

  return (
    <section className="bg-gray-50">
      <div className="w-full py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 px-4 sm:px-6 lg:px-8">
          Membros
        </h2>

        {/* Filtros */}
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-4 mb-10 px-4 sm:px-6 lg:px-8">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setAreaFilter(area)}
              className={`pb-2 text-sm sm:text-base font-bold transition-colors bg-transparent rounded-none
                ${
                  areaFilter === area
                    ? "text-gray-800 border-b-2 border-purple-700"
                    : "text-gray-600 border-b-2 border-transparent hover:text-gray-800"
                }`}
            >
              {area}
            </button>
          ))}
        </div>

        <div className="relative w-full">
          {/* Setas: escondidas no mobile (pra não atrapalhar swipe/toque) */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Anterior"
            className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10
              h-10 w-10 rounded-full shadow-md border bg-white
              items-center justify-center transition-opacity
              ${canGoPrev ? "opacity-100 hover:opacity-90" : "opacity-40 cursor-not-allowed"}
            `}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Próximo"
            className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10
              h-10 w-10 rounded-full shadow-md border bg-white
              items-center justify-center transition-opacity
              ${canGoNext ? "opacity-100 hover:opacity-90" : "opacity-40 cursor-not-allowed"}
            `}
          >
            ›
          </button>

          {/* Carrossel */}
          <div
            className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide focus:outline-none"
            ref={carouselRef}
            tabIndex={0}
            onWheelCapture={handleWheel}
            onWheel={handleWheel}
          >
            <div
              ref={trackRef}
              className="flex gap-6 flex-nowrap scroll-smooth snap-x snap-mandatory py-2"
            >
              {filteredMembers.map((m, i) => (
                <div
                  key={m.email ?? m.name ?? i}
                  ref={i === 0 ? cardRef : null}
                  className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex-shrink-0 snap-start flex flex-col items-center text-center
                  min-w-[240px] sm:min-w-[300px] md:min-w-[340px] lg:min-w-[380px] min-h-[300px]"
                >
                  <img
                    src={m.profileImage}
                    alt={m.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-5 sm:mb-6"
                  />

                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {m.name}
                  </h3>

                  {m.phone && (
                    <p className="text-sm sm:text-base text-gray-700 mb-1">
                      {m.phone}
                    </p>
                  )}

                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="text-sm sm:text-base text-purple-700 underline mb-1 break-all"
                    >
                      {m.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bolinhas */}
          {pagesCount > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {start > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => scrollToCard(0)}
                    className="h-2 w-2 rounded-full bg-gray-300 hover:opacity-80"
                    aria-label="Ir para o início"
                  />
                  <span className="text-gray-400 select-none px-1">…</span>
                </>
              )}

              {Array.from({ length: end - start }, (_, idx) => {
                const page = start + idx;
                const isActive = page === currentPage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => scrollToCard(page)}
                    aria-label={`Ir para página ${page + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition-all
                      ${
                        isActive
                          ? "bg-purple-700 scale-110"
                          : "bg-gray-300 hover:opacity-80"
                      }
                    `}
                  />
                );
              })}

              {end < pagesCount && (
                <>
                  <span className="text-gray-400 select-none px-1">…</span>
                  <button
                    type="button"
                    onClick={() => scrollToCard(pagesCount - 1)}
                    className="h-2 w-2 rounded-full bg-gray-300 hover:opacity-80"
                    aria-label="Ir para o fim"
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
