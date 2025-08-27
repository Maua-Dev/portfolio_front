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
      <div className="relative flex flex-col items-center justify-center w-full max-w-sm h-[400px]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-4/5 h-auto rounded-3xl shadow-xl overflow-hidden z-10">
          <img
            src={imagesToRender[0].src}
            alt={imagesToRender[0].alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-[calc(100%-150px)] left-[calc(50%-100px)] -translate-x-1/2 w-4/5 h-auto rounded-3xl shadow-2xl overflow-hidden z-20">
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
    <div className="relative w-full max-w-2xl h-[450px] mx-auto my-8">
      <div className="absolute top-4 left-4 w-2/5 rounded-3xl shadow-lg overflow-hidden z-10">
        <img
          src={imagesToRender[0].src}
          alt={imagesToRender[0].alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[45%] rounded-3xl shadow-xl overflow-hidden z-20">
        <img
          src={imagesToRender[1].src}
          alt={imagesToRender[1].alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-60 left-1/2 -translate-x-1/2 w-1/2 rounded-3xl shadow-2xl overflow-hidden z-30">
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
