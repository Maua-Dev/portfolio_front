type MemberCardProps = {
  image: string;
  name: string;
  area: string;
};

export default function MemberCard({ image, name, area }: MemberCardProps) {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="flex w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-52">
        <div className="relative w-full h-full flex flex-col inset-0 bottom-0 bg-red-500 rounded-xl scale-110">
          <img
            src={image}
            className="absolute bottom-0 w-full rounded-b-xl h-full object-cover"
          />
          <div className="absolute top-2 right-1 sm:top-4 sm:right-2 font-bold bg-blue-500/50 text-white/70 rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center text-[8px] sm:text-[10px] break-words">
            {area}
          </div>
          <p className="relative left-[50%] -translate-x-1/2 top-[100%] mt-2 w-2/3 text-xs sm:text-sm md:text-base font-bold">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}