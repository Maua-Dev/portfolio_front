import MemberCard from "./memberCard";
import { useEffect, useRef, useState } from "react";

type Member = {
  profileImage: string;
  name: string;
  area: string;
};

type MembersCarouselProps = {
  members: Member[];
};

export default function MembersCarousel({ members }: MembersCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [centerIndex, setCenterIndex] = useState(2);

  const updateCenterIndex = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.clientWidth / 5;
    const scrollLeft = track.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
    setCenterIndex(index + 2);
  };

  const scrollByOneCard = (dir: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.clientWidth / 5;
    const delta = cardWidth * (dir === "left" ? -1 : 1);
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    updateCenterIndex();
    const handleResize = () => updateCenterIndex();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full">
      <button
        aria-label="Anterior"
        onClick={() => scrollByOneCard("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                   rounded-full p-2 bg-white/80 shadow hover:bg-white
                   focus:outline-none"
      >
        ‹
      </button>
      <button
        aria-label="Próximo"
        onClick={() => scrollByOneCard("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                   rounded-full p-2 bg-white/80 shadow hover:bg-white
                   focus:outline-none"
      >
        ›
      </button>
      <div
        ref={trackRef}
        onScroll={updateCenterIndex}
        className="w-full overflow-x-auto scroll-smooth
                   snap-x snap-mandatory
                   [scrollbar-width:none] [-ms-overflow-style:none]
                   px-4 py-6"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex items-end gap-2 min-w-full [ &::-webkit-scrollbar ]:hidden">
          {members.map((m, idx) => {
            const offset = idx - centerIndex;
            const scales = [0.5, 0.75, 1, 0.75, 0.5];
            let scale = 0.5;
            if (offset >= -2 && offset <= 2) scale = scales[offset + 2];

            return (
              <div
                key={`${m.name}-${idx}`}
                className="basis-1/5 shrink-0 snap-start flex justify-center items-end"
              >
                <div
                  className="transition-transform will-change-transform"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "bottom center",
                  }}
                >
                  <MemberCard
                    image={m.profileImage}
                    name={m.name}
                    area={m.area}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
