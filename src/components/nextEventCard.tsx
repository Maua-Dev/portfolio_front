type NextEventCardProps = {
  image: string;
  name: string;
  day: number;
  month: string;
  description: string;
  place: string;
  time: string;
};

export default function NextEventCard({
  image,
  name,
  day,
  month,
  description,
  place,
  time,
}: NextEventCardProps) {
  return (
    <div className="flex flex-col gap-0 rounded-lg bg-gray-300 overflow-hidden w-full max-w-md mx-auto lg:mx-0">
      <img src={image} className="w-full h-40 sm:h-48 object-cover" />
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 h-full">
        <div className="flex sm:flex-col flex-row items-center sm:items-stretch gap-2 sm:gap-0 text-center text-lg sm:text-xl text-red-950">
          <p className="text-2xl sm:text-3xl font-bold">{day}</p>
          <p>{month}</p>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-xl sm:text-2xl font-bold text-red-950 mb-2">{name}</p>
          <p className="mb-1 text-sm sm:text-base">{description}</p>
          <div className="flex flex-row gap-2 mb-3 text-sm sm:text-base">
            <p className="font-bold">Local:</p>
            <div className="flex flex-col">
              <p>{place}</p>
              <p>Às {time}</p>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <button className="w-full sm:w-auto bg-transparent hover:bg-red-950 text-red-950 font-semibold hover:text-white py-2 px-4 border border-red-950 hover:border-transparent rounded transition-colors duration-200">
              Saiba mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}