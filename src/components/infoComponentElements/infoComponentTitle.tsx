type InfoComponentTitleProps = {
    title: string;
};

export default function InfoComponentTitle({title}: InfoComponentTitleProps) {
    return (
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 md:mb-12">{title}</h1>
    );
}