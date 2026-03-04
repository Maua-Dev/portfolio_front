export default function InfoComponentTags() {
  return (
    <div className="min-w-max flex flex-row gap-3 sm:gap-4 font-bold items-center text-xs sm:text-sm md:text-base text-gray-600">
      <p className="whitespace-nowrap">5 projetos</p>
      <img
        className="h-5 sm:h-7 md:h-10 w-px object-cover"
        src="src/assets/separator.png"
        alt="separador"
      />
      <p className="whitespace-nowrap">Palestras</p>
      <img
        className="h-5 sm:h-7 md:h-10 w-px object-cover"
        src="src/assets/separator.png"
        alt="separador"
      />
      <p className="whitespace-nowrap">+2000 usuarios</p>
    </div>
  );
}
