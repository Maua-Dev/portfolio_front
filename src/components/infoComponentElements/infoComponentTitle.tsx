type InfoComponentTitleProps = {
    title: string;
};

export default function InfoComponentTitle({title}: InfoComponentTitleProps) {
    return (
        <h1 className="font-bold text-4xl mb-12">{title}</h1>
    );
}