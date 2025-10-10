import { useMemo, useState } from "react";
import Footer from "../components/footer";
import InfoComponent from "../components/infoComponent";
import Navbar from "../components/navbar";
import InfoComponentImages from "../components/infoComponentElements/infoComponentImages";
import MembersCarousel from "../components/memberCarousel";

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

export default function Members() {
  const [filter, setFilter] = useState<Filter>("ALL");

  const filteredMembers = useMemo(() => {
    if (filter === "ALL") return members;
    return members.filter((m) => (m.area || "").toUpperCase() === filter);
  }, [filter]);

  return (
    <div className="bg-coolWhite flex flex-col min-h-screen">
      <Navbar />
      <div className="p-6">
        <main>
          <div className="flex-grow flex flex-row items-center justify-center gap-24 mb-24">
            <div className="flex flex-col">
              <InfoComponent
                title="Membros"
                description="Conheça os membros da Dev Community! Eles fazem tudo acontecer, colaborando e inovando juntos."
              />
            </div>
            <InfoComponentImages quantity={2} images={images} />
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
        </main>
      </div>
      <Footer />
    </div>
  );
}
