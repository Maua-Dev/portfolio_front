type NextEventCardProps = {
  image: string;
  name: string;
  day: number;
  month: string;
  description: string;
  place: string;
  time: string;
};

export default function NextEventCardMobile({
  image,
  name,
  day,
  month,
  description,
  place,
  time,
}: NextEventCardProps) {
  return (
    <div className="flex flex-col gap-0 rounded-lg bg-gray-300 w-full overflow-hidden shadow-md">
      <img src={image} alt={name} className="w-full h-48 sm:h-56 object-cover" />
      <div className="p-4 sm:p-5 flex flex-row gap-4 sm:gap-6 h-full">
        <div className="flex flex-col text-center text-red-950 min-w-[50px]">
          <p className="text-2xl sm:text-3xl font-bold">{day}</p>
          <p className="text-sm sm:text-base capitalize">{month}</p>
        </div>
        
        <div className="flex-1 flex flex-col">
          <p className="text-xl sm:text-2xl font-bold text-red-950 mb-2">{name}</p>
          <p className="mb-3 text-sm sm:text-base">{description}</p>
          
          <div className="flex flex-col sm:flex-row sm:gap-2 mb-4 text-sm sm:text-base">
            <p className="font-bold text-red-950">Local:</p>
            <div className="flex flex-col">
              <p>{place}</p>
              <p>Às {time}</p>
            </div>
          </div>
          <div className="flex flex-row-reverse mt-auto">
            <button className="bg-transparent hover:bg-red-950 text-red-950 font-semibold hover:text-white py-1.5 px-4 text-sm sm:text-base border border-red-950 hover:border-transparent rounded transition-colors duration-300">
              Saiba mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}