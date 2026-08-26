type QuoteCardProps = {
  image: string;
  name: string;
  area: string;
  quote: string;
};

export default function QuoteCard({
  image,
  name,
  area,
  quote,
}: QuoteCardProps) {
  return (
    <div className="flex flex-col gap-0 w-[78vw] xs:w-[320px] sm:w-[400px] max-w-[400px]">
      <div className="bg-gray-200 h-[150px] sm:h-[200px] flex justify-center items-center font-bold text-base sm:text-2xl rounded-t-2xl px-4 text-center">
        <p>{quote}</p>
      </div>
      <div className="bg-blue-950 flex flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-b-2xl">
        <img src={image} className="h-14 sm:h-20 w-auto" />
        <div className="flex flex-col text-white">
          <p className="text-base sm:text-lg">{name}</p>
          <p className="text-sm sm:text-base">{area}</p>
        </div>
      </div>
    </div>
  );
}