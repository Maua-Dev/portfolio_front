import InfoComponentDescription from "./infoComponentElements/infoComponentDescription";
import InfoComponentTitle from "./infoComponentElements/infoComponentTitle";
import InfoComponentTags from "./infoComponentElements/infoComponentTags";

type InfoComponentProps = {
  title: string;
  description: string;
};

export default function InfoComponent({ title, description }: InfoComponentProps) {
  return (
    <section
      className="
        w-full
        max-w-[720px]
        mx-auto
        px-4 sm:px-6
        py-4 sm:py-6
        flex flex-col
        gap-3 sm:gap-4
        text-left
        break-words
      "
    >
      <InfoComponentTitle title={title} />
      <InfoComponentDescription description={description} />
      <div className="w-full overflow-x-auto pb-1">
        <InfoComponentTags />
      </div>
    </section>
  );
}
