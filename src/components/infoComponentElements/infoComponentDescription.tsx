type InfoComponentDescriptionTypes = {
  description: string;
};

export default function InfoComponentDescription({ description }: InfoComponentDescriptionTypes) {
  return (
    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 mb-6 sm:mb-8 md:mb-10 break-words">
      {description}
    </p>
  );
}
