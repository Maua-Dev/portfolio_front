import QuoteCard from "./quoteCard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MemberData = {
  profileImage: string;
  name: string;
  course: string;
  courseYear: number;
  area: string;
  quote: string;
};

type QuoteCarouselProps = {
  members: MemberData[];
};

const CYCLES = 5;
const MID_CYCLE = Math.floor(CYCLES / 2);
const CARD_WIDTH = 400;
const GAP = 8;
const ITEM_WIDTH = CARD_WIDTH + GAP;

export default function QuoteCarousel({ members }: QuoteCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [centerLogicalIndex, setCenterLogicalIndex] = useState(0);
  const [instantMode, setInstantMode] = useState(false);

  const scrollTimeout = useRef<number | null>(null);
  const isJumping = useRef(false);
  const displayMembers = useMemo(() => {
    if (!members.length) return [];
    return Array.from({ length: CYCLES }, () => members).flat();
  }, [members]);

  const itemsPerCycle = members.length;

  const getCardWidth = useCallback(() => {
    return ITEM_WIDTH;
  }, []);

  const updateCenterLogicalIndex = useCallback(() => {
    const track = trackRef.current;
    const w = getCardWidth();
    if (!track || !w || !itemsPerCycle) return;

    const scrollCenter = track.scrollLeft + track.clientWidth / 2;
    const visualIndexCenter = Math.round((scrollCenter - w / 2) / w);
    const logical =
      ((visualIndexCenter % itemsPerCycle) + itemsPerCycle) % itemsPerCycle;

    setCenterLogicalIndex(logical);
  }, [getCardWidth, itemsPerCycle]);

  const getScrollIndex = () => {
    const track = trackRef.current;
    const w = getCardWidth();
    if (!track || !w) return 0;
    return track.scrollLeft / w;
  };

  const jumpWithoutAnimation = useCallback(
    (left: number) => {
      const track = trackRef.current;
      if (!track) return;

      isJumping.current = true;
      setInstantMode(true);

      const prevSnap = track.style.scrollSnapType;
      const prevBehavior = track.style.scrollBehavior;

      track.style.scrollSnapType = "none";
      track.style.scrollBehavior = "auto";
      track.scrollTo({ left });
      track.getBoundingClientRect();

      requestAnimationFrame(() => {
        track.style.scrollSnapType = prevSnap || "";
        track.style.scrollBehavior = prevBehavior || "";
        isJumping.current = false;
        setInstantMode(false);
        updateCenterLogicalIndex();
      });
    },
    [updateCenterLogicalIndex]
  );

  const handleScroll = () => {
    if (isJumping.current) return;

    updateCenterLogicalIndex();

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = window.setTimeout(() => {
      const track = trackRef.current;
      const w = getCardWidth();
      if (!track || !w || !itemsPerCycle) return;

      const idx = getScrollIndex();
      const firstKeep = itemsPerCycle * (MID_CYCLE - 1);
      const lastKeep = itemsPerCycle * (MID_CYCLE + 1);

      if (idx < firstKeep) {
        jumpWithoutAnimation(track.scrollLeft + itemsPerCycle * w);
        return;
      }
      if (idx > lastKeep) {
        jumpWithoutAnimation(track.scrollLeft - itemsPerCycle * w);
        return;
      }
    }, 120);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !displayMembers.length || !itemsPerCycle) return;

    const setInitialPosition = () => {
      const w = getCardWidth();
      if (!w) return;
      const initialLeft = w * itemsPerCycle * MID_CYCLE;
      jumpWithoutAnimation(initialLeft);
    };
    setTimeout(setInitialPosition, 0);

    const handleResize = () => setInitialPosition();
    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [displayMembers, itemsPerCycle, getCardWidth, jumpWithoutAnimation]);

  const handleArrowClick = (dir: "left" | "right") => {
    const track = trackRef.current;
    const w = getCardWidth();
    if (!track || !w) return;
    const newLeft = track.scrollLeft + w * (dir === "left" ? -1 : 1);
    track.scrollTo({ left: newLeft, behavior: "smooth" });
  };

  const circularDistance = (a: number, b: number, mod: number) => {
    let d = ((a - b) % mod + mod) % mod;
    if (d > mod / 2) d -= mod;
    return d;
  };

  return (
    <div className="relative w-full">
      <button
        aria-label="Anterior"
        onClick={() => handleArrowClick("left")}
        className="absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/80 shadow hover:bg-white focus:outline-none" 
      >
        ‹
      </button>
      <button
        aria-label="Próximo"
        onClick={() => handleArrowClick("right")}
        className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/80 shadow hover:bg-white focus:outline-none"
      >
        ›
      </button>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] px-4 py-6 pb-20"
      >
        <div className="flex items-end gap-2 min-w-full [&::-webkit-scrollbar]:hidden">
          {displayMembers.map((member, idx) => {
            const logicalIdx =
              itemsPerCycle > 0
                ? ((idx % itemsPerCycle) + itemsPerCycle) % itemsPerCycle
                : 0;

            const dist = circularDistance(
              logicalIdx,
              centerLogicalIndex,
              itemsPerCycle || 1
            );

            const scales = [0.5, 0.75, 1, 0.75, 0.5];
            let scale = 0.5;
            if (dist >= -2 && dist <= 2) scale = scales[dist + 2];

            return (
              <div
                key={`${member.name}-${idx}`}
                className="shrink-0 snap-start flex justify-center items-end"
              >
                <div
                  className={`${instantMode ? "" : "transition-transform duration-300"} will-change-transform`}
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "bottom center",
                    transition: instantMode ? "none" : undefined,
                  }}
                >
                  <QuoteCard
                    image={member.profileImage}
                    name={member.name}
                    area={member.area}
                    quote={member.quote}
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