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
      <div className="relative flex flex-col items-center justify-center w-full max-w-[260px] sm:max-w-sm h-[260px] sm:h-[400px] mx-auto">
        <div className="absolute top-0 sm:top-1/4 left-1/2 -translate-x-1/2 w-3/5 sm:w-4/5 h-auto rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden z-10">
          <img
            src={imagesToRender[0].src}
            alt={imagesToRender[0].alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 sm:bottom-auto sm:top-[calc(100%-150px)] left-1/2 sm:left-[calc(50%-100px)] -translate-x-1/2 w-3/5 sm:w-4/5 h-auto rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden z-20">
          <img
            src={imagesToRender[1].src}
            alt={imagesToRender[1].alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  if (quantity === 3) {
    return (
      <div className="relative w-full max-w-[280px] sm:max-w-md md:max-w-xl lg:max-w-2xl h-[280px] sm:h-[380px] md:h-[420px] lg:h-[450px] mx-auto my-4 sm:my-8">
        <div className="absolute top-0 sm:top-4 left-0 sm:left-4 w-3/5 sm:w-2/5 rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg overflow-hidden z-10">
          <img
            src={imagesToRender[0].src}
            alt={imagesToRender[0].alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-8 sm:top-1/2 sm:-translate-y-1/2 right-0 sm:right-4 w-1/2 sm:w-[45%] rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden z-20">
          <img
            src={imagesToRender[1].src}
            alt={imagesToRender[1].alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 sm:bottom-auto sm:top-60 left-1/4 sm:left-1/2 sm:-translate-x-1/2 w-3/5 sm:w-1/2 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden z-30">
          <img
            src={imagesToRender[2].src}
            alt={imagesToRender[2].alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
}