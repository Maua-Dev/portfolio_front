import { useEffect, useMemo, useState } from "react";
import Footer from "../components/footerMobile";
import InfoComponent from "../components/infoComponent";
import Navbar from "../components/navbarMobile";
import InfoComponentImages from "../components/infoComponentElements/infoComponentImages";
import MembersCarousel from "../components/memberCarousel";
import QuoteCarousel from "../components/quoteCarousel";

import membersImage1 from "../assets/membersImage1.png";
import membersImage2 from "../assets/membersImage2.png";

import { fetchMemberInfo } from "../services/memberInfoService";
import type { HomeCarouselMember, QuoteCarouselMember } from "../types/memberInfo";

const images = [
  { src: membersImage1, alt: "Membros da dev" },
  { src: membersImage2, alt: "Membros da dev" },
];

type Filter = "ALL" | "BACKEND" | "FRONTEND" | "RH";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "Geral", value: "ALL" },
  { label: "Backend", value: "BACKEND" },
  { label: "Frontend", value: "FRONTEND" },
  { label: "RH", value: "RH" },
];

export default function Members() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [homeMembers, setHomeMembers] = useState<HomeCarouselMember[]>([]);
  const [quoteMembers, setQuoteMembers] = useState<QuoteCarouselMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMemberInfo()
      .then((data) => {
        setHomeMembers(data.homeCarousel);
        setQuoteMembers(data.quoteCarousel);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredMembers = useMemo(() => {
    if (filter === "ALL") return homeMembers;
    return homeMembers.filter((m) => (m.area || "").toUpperCase() === filter);
  }, [filter, homeMembers]);

  return (
    <div className="bg-coolWhite flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="p-4 sm:p-6">
        <main>
          <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 mb-12 md:mb-24">
            <InfoComponent
              title="Membros"
              description="Conheça os membros da Dev Community! Eles fazem tudo acontecer, colaborando e inovando juntos."
            />
            <InfoComponentImages quantity={2} images={images} />
          </div>
          {isLoading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-600">Error: {error}</p>}
          {!isLoading && !error && (
            <>
              <div className="flex flex-col justify-center items-center gap-4 sm:gap-6">
                <div
                  role="tablist"
                  aria-label="Filtrar membros por área"
                  className="flex flex-wrap items-center justify-center gap-1 sm:gap-2"
                >
                  {FILTERS.map(({ label, value }) => {
                    const active = value === filter;
                    return (
                      <button
                        key={value}
                        role="tab"
                        aria-selected={active}
                        aria-pressed={active}
                        onClick={() => setFilter(value)}
                        className={[
                          "px-3 sm:px-4 py-2 rounded-full border-none bg-transparent text-sm sm:text-base transition-colors font-bold",
                          active
                            ? "text-blue-600"
                            : "text-gray-700 hover:text-black",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <div className="w-full max-w-6xl">
                  <MembersCarousel members={filteredMembers} />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center mb-6">
                <div className="w-full max-w-6xl mt-8 md:mt-12">
                  <QuoteCarousel members={quoteMembers} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}