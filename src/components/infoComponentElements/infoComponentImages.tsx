type ImageData = {
  src: string;
  alt: string;
};

type InfoComponentProps = {
  quantity: number;
  images: ImageData[];
};

export default function InfoComponentImages({
  quantity,
  images,
}: InfoComponentProps) {
  if (quantity <= 0 || !images || images.length === 0) {
    return null;
  }

  const imagesToRender = images.slice(0, quantity);

  if (quantity === 2) {
    return (
      <div className="relative flex w-full max-w-xs sm:max-w-sm mx-auto h-[260px] sm:h-[340px] md:h-[400px]">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[82%] sm:w-4/5 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden z-10">
          <img
            src={imagesToRender[0].src}
            alt={imagesToRender[0].alt}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 sm:translate-y-4 w-[82%] sm:w-4/5 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-20">
          <img
            src={imagesToRender[1].src}
            alt={imagesToRender[1].alt}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
      </div>
    );
  }

  if (quantity === 3) {
    return (
      <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl h-[280px] sm:h-[360px] md:h-[450px] mx-auto my-6 sm:my-8">
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-[42%] rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden z-10">
          <img
            src={imagesToRender[0].src}
            alt={imagesToRender[0].alt}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
        <div className="absolute top-[48%] sm:top-1/2 -translate-y-1/2 right-2 sm:right-4 w-[48%] sm:w-[45%] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden z-20">
          <img
            src={imagesToRender[1].src}
            alt={imagesToRender[1].alt}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[54%] sm:w-1/2 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-30">
          <img
            src={imagesToRender[2].src}
            alt={imagesToRender[2].alt}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
      </div>
    );
  }

  return null;
}
