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
    <div className="flex flex-col gap-0 w-[400px]">
      <div className="bg-gray-200 h-[200px] flex justify-center items-center font-bold text-2xl">
        <p>{quote}</p>
      </div>
      <div className="bg-blue-950 flex flex-row gap-4 p-4">
        <img src={image} className="h-20 w-auto"/>
        <div className="flex flex-col text-white">
          <p className="text-lg">{name}</p>
          <p>{area}</p>
        </div>
      </div>
    </div>
  );
}
