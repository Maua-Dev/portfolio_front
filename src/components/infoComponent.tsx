import InfoComponentDescription from "./infoComponentElements/infoComponentDescription";
import InfoComponentTitle from "./infoComponentElements/infoComponentTitle";
import InfoComponentTags from "./infoComponentElements/infoComponentTags";

type InfoComponentProps = {
    title: string;
    description: string;
};

export default function InfoComponent({title, description}: InfoComponentProps) {
    return (
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <InfoComponentTitle title={title}/>
            <InfoComponentDescription description={description}/>
            <InfoComponentTags/>
        </div>
    );
}