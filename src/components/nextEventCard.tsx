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
    <div className="flex flex-col gap-0 rounded-lg bg-gray-300">
      <img src={image} />
      <div className="p-5 flex flex-row gap-12 h-full">
        <div className="flex flex-col text-center text-xl text-red-950">
          <p className="text-3xl font-bold">{day}</p>
          <p>{month}</p>
        </div>
        <div className="flex-1 flex-col">
          <p className="text-2xl font-bold text-red-950 mb-2">{name}</p>
          <p className="mb-1">{description}</p>
          <div className="flex flex-row gap-2 mb-3">
            <p className="font-bold">Local:</p>
            <div className="flex flex-col">
              <p>{place}</p>
              <p>Às {time}</p>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <button className="bg-transparent hover:bg-red-950 text-red-950 font-semibold hover:text-white py-2 px-4 border border-red-950 hover:border-transparent rounded">
              Saiba mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
