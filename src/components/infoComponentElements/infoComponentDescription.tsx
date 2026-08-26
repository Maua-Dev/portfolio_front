type InfoComponentDescriptionTypes = {
    description: string;
}

export default function InfoComponentDescription({description}: InfoComponentDescriptionTypes) {
    return(
        <p className="mb-6 md:mb-12 text-sm sm:text-base max-w-md mx-auto md:mx-0">{description}</p>
    );
}