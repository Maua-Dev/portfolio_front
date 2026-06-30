import { useMemo, useState } from "react";
import FooterMobile from "../components/footerMobile";
import InfoComponent from "../components/infoComponent";
import NavbarMobile from "../components/navbarMobile";
import InfoComponentImagesMobile from "../components/infoComponentElements/infoComponentImagesMobile";
import MembersCarousel from "../components/memberCarousel";
import QuoteCarousel from "../components/quoteCarousel";

import membersImage1 from "../assets/membersImage1.png";
import membersImage2 from "../assets/membersImage2.png";

import membersMock from "../utils/membersMock.json";

const images = [
  { src: membersImage1, alt: "Membros da dev" },
  { src: membersImage2, alt: "Membros da dev" },
];

const members = membersMock.map(({ profileImage, name, area }) => ({
  profileImage,
  name,
  area,
}));

type Filter = "ALL" | "DEV" | "PO" | "UI/UX" | "BUSINESS";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "Geral", value: "ALL" },
  { label: "Dev", value: "DEV" },
  { label: "PO", value: "PO" },
  { label: "UX/UI", value: "UI/UX" },
  { label: "Business", value: "BUSINESS" },
];

export default function MembersMobile() {
  const [filter, setFilter] = useState<Filter>("ALL");

  const filteredMembers = useMemo(() => {
    if (filter === "ALL") return members;
    return members.filter((m) => (m.area || "").toUpperCase() === filter);
  }, [filter]);

  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <NavbarMobile />
      <div className="p-6">
        <main>
          <div className="flex-grow flex flex-row items-center justify-center gap-24 mb-24">
            <div className="flex flex-col">
              <InfoComponent
                title="Membros"
                description="Conheça os membros da Dev Community! Eles fazem tudo acontecer, colaborando e inovando juntos."
              />
            </div>
            <InfoComponentImagesMobile quantity={2} images={images} />
          </div>
          <div className="flex flex-col justify-center items-center gap-6">
            <div
              role="tablist"
              aria-label="Filtrar membros por área"
              className="flex flex-wrap items-center justify-center gap-2"
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
                      "px-4 py-2 rounded-full border-none bg-transparent text-base transition-colors font-bold",
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
            <div className="w-full max-w-6xl mt-12">
              <QuoteCarousel members={membersMock} />
            </div>
          </div>
        </main>
      </div>
      <FooterMobile />
    </div>
  );
}