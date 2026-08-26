export default function InfoComponentTags() {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 font-bold text-sm sm:text-base">
            <p>5 projetos</p>
            <img className="hidden sm:block h-[40px] w-[2px]" src="src/assets/separator.png"/>
            <p>Palestras</p>
            <img className="hidden sm:block h-[40px] w-[2px]" src="src/assets/separator.png"/>
            <p>+2000 usuários</p>
        </div>
    );
}