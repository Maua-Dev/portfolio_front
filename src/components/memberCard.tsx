type MemberCardProps = {
  image: string;
  name: string;
  area: string;
};

export default function MemberCard({ image, name, area }: MemberCardProps) {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="flex w-40 h-52">
        <div className="relative w-full h-48 flex flex-col inset-0 bottom-0 bg-red-500 rounded-xl scale-110">
          <img
            src={image}
            className="absolute bottom-0 w-full rounded-b-xl h-full object-cover"
          />
          <div className="absolute top-4 right-2 font-bold bg-blue-500/50 text-white/70 rounded-full w-12 h-12 flex items-center justify-center text-[10px] break-words">
            {area}
          </div>
          <p className="relative left-[50%] -translate-x-1/2 top-[100%] mt-2 w-2/3 font-bold">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}