import { useEffect, useMemo, useRef, useState } from "react";
import "../assets/scrollbar.css";
import { fetchMemberInfo } from "../services/memberInfoService";
import type { MemberCarouselMember } from "../types/memberInfo";
import { FALLBACK_PROFILE_IMAGE_URL } from "../utils/constants";

export default function Members() {
  const [members, setMembers] = useState<MemberCarouselMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [areaFilter, setAreaFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMemberInfo()
      .then((data) => setMembers(data.memberCarousel))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const areas = useMemo(() => {
    const uniqueRoles = Array.from(new Set(members.map((m) => m.role)));
    return ["All", ...uniqueRoles];
  }, [members]);

  const filteredMembers = useMemo(() => {
    if (areaFilter === "All") return members;
    return members.filter((m) => m.role === areaFilter);
  }, [areaFilter, members]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const updatePagination = () => {
      const containerWidth = container.offsetWidth;
      if (!containerWidth) {
        setPagesCount(1);
        setCurrentPage(0);
        return;
      }
      const totalScrollWidth = container.scrollWidth;
      const pageCount = Math.max(
        1,
        Math.ceil(totalScrollWidth / containerWidth),
      );
      setPagesCount(pageCount);
      setCurrentPage((prev) => Math.min(prev, pageCount - 1));
    };

    const handleScroll = () => {
      const containerWidth = container.offsetWidth;
      if (!containerWidth) return;
      const scrollLeft = container.scrollLeft;
      const current = Math.round(scrollLeft / containerWidth);
      setCurrentPage((_) =>
        Math.max(
          0,
          Math.min(
            current,
            Math.max(0, Math.ceil(container.scrollWidth / containerWidth) - 1),
          ),
        ),
      );
    };

    updatePagination();
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updatePagination);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePagination);
    };
  }, [filteredMembers]);

  const scrollByPage = (direction: 1 | -1) => {
    const container = carouselRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    container.scrollBy({
      left: direction * containerWidth,
      behavior: "smooth",
    });
  };

  const canScrollLeft = currentPage > 0;
  const canScrollRight = currentPage < pagesCount - 1;

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Membros</h2>

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {!isLoading && !error && (
        <>
          <div className="flex justify-center flex-wrap gap-8 mb-10 px-4">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setAreaFilter(area)}
                className={`pb-2 text-base font-bold transition-colors bg-transparent rounded-none
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

          <div className="relative">
            {/* Left arrow */}
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 items-center justify-center
                w-10 h-10 rounded-full bg-white shadow-md transition-opacity
                ${canScrollLeft ? "opacity-100 hover:bg-gray-100" : "opacity-0 pointer-events-none"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-purple-700"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 items-center justify-center
                w-10 h-10 rounded-full bg-white shadow-md transition-opacity
                ${canScrollRight ? "opacity-100 hover:bg-gray-100" : "opacity-0 pointer-events-none"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-purple-700"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div
              className="w-full overflow-x-auto px-4 scrollbar-hide"
              ref={carouselRef}
            >
              <div
                className={`flex gap-4 flex-nowrap scroll-smooth snap-x snap-mandatory ${
                  pagesCount <= 1 ? "justify-center" : ""
                }`}
              >
                {filteredMembers.map((m, i) => (
                  <div
                    key={m.email ?? m.name ?? i}
                    className="bg-white rounded-xl shadow-md p-6 flex-shrink-0 snap-start flex flex-col items-center text-center
                      min-w-[220px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[320px] min-h-[250px]"
                  >
                    <img
                      src={m.photoPath ?? FALLBACK_PROFILE_IMAGE_URL}
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
          </div>

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
        </>
      )}
    </section>
  );
}
