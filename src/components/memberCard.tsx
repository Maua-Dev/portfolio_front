type MemberCardProps = {
  image: string;
  name: string;
  area: string;
};

export default function MemberCard({ image, name, area }: MemberCardProps) {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="flex w-56 h-80">
        <div className="relative w-full h-72 flex flex-col inset-0 bottom-0 bg-red-500 rounded-2xl scale-110">
          <img
            src={image}
            className="absolute bottom-0 w-full rounded-b-2xl h-full object-cover"
          />

          <div className="absolute top-4 right-4 font-bold bg-blue-500/50 text-white/70 rounded-full w-16 h-16 flex items-center justify-center text-xs break-words">
            {area}
          </div>

          <p className="relative left-[50%] -translate-x-1/2 top-[100%] mt-3 w-2/3 font-bold text-lg">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
