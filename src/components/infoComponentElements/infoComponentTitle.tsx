type InfoComponentTitleProps = {
  title: string;
};

export default function InfoComponentTitle({ title }: InfoComponentTitleProps) {
  return (
    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-gray-800 mb-4 sm:mb-6 md:mb-8 break-words">
      {title}
    </h1>
  );
}
