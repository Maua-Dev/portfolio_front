type InfoComponentDescriptionTypes = {
    description: string;
}

export default function InfoComponentDescription({description}: InfoComponentDescriptionTypes) {
    return(
        <p className="mb-12">{description}</p>
    );
}