type MemberCardProps = {
  image: string;
  name: string;
  area: string;
};

export default function MemberCard({ image, name, area }: MemberCardProps) {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="relative w-40 h-52">
        <div className="absolute inset-0 bg-red-500 rounded-xl scale-110" />
        <img
          src={image}
          className="relative w-full h-full object-cover"
        />
        <div className="absolute top-1/2 right-2 font-bold translate-y-1 bg-blue-500/50 text-white/70 rounded-full w-12 h-12 flex items-center justify-center text-xs">
          {area}
        </div>
      </div>
      <p className="mt-2 font-bold">{name}</p>
    </div>
  );
}
