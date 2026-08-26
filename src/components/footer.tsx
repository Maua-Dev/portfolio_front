import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  function goToPage(page: string) {
    navigate(page);
  }

  return (
    <footer>
      <div className="h-[300px] w-full flex items-center justify-between px-12 py-4 bg-gray-800 text-white columns-3">
        <div className="flex flex-col items-start gap-6 logoContainer">
          <img src="src/assets/logo.png" className="w-auto h-[75px]" />
          <p>Todos direitos reservados à Dev Community Mauá, 2025</p>
          <div className="flex flex-row gap-4">
            <a
              href="https://www.instagram.com/devcommunitymaua?igsh=ZDMwYWFsMmpvd3Zn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="src/assets/instagramLogo.png" />
            </a>

            <a
              href="https://www.linkedin.com/company/dev-community-mau%C3%A1/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="src/assets/linkedinLogo.png" />
            </a>
          </div>
        </div>
        <div className="flex flex-row gap-24">
          <div className="flex flex-col items-start gap-2 aboutContainer">
            <p className="font-bold text-xl mb-1">Sobre nós</p>
            <span
              onClick={() => {
                goToPage("/");
              }}
            >
              Conheça a dev
            </span>
            <span
              onClick={() => {
                goToPage("/members");
              }}
            >
              Membros
            </span>
            <span
              onClick={() => {
                goToPage("/");
              }}
            >
              Processo seletivo
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 portfolioContainer">
            <p className="font-bold text-xl mb-1">Portfólio</p>
            <span
              onClick={() => {
                goToPage("/projects");
              }}
            >
              Projetos
            </span>
            <span
              onClick={() => {
                goToPage("/events");
              }}
            >
              Eventos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
