import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import instagramLogo from "../assets/instagramLogo.png";
import linkedinLogo from "../assets/linkedinLogo.png";

export default function FooterMobile() {
  const navigate = useNavigate();
  function goToPage(page: string) {
    navigate(page);
  }

return (
  <footer className="bg-gray-800 text-white w-screen">
    <div className="w-full py-14 px-6 sm:px-8">
      <div className="mx-auto w-full lg:max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-14 lg:gap-10">
          <div className="flex flex-col gap-6 max-w-sm lg:max-w-xs">
            <img
              src={logo}
              alt="Dev Community Mauá"
              className="h-16 w-auto object-contain select-none"
            />

            <p className="text-sm text-white/80 leading-relaxed">
              Todos direitos reservados à Dev Community Mauá, 2025
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/devcommunitymaua?igsh=ZDMwYWFsMmpvd3Zn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <img src={instagramLogo} alt="" className="h-6 w-6 object-contain" />
              </a>

              <a
                href="https://www.linkedin.com/company/dev-community-mau%C3%A1/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <img src={linkedinLogo} alt="" className="h-6 w-6 object-contain" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-14 lg:gap-12 w-full lg:w-auto">
            <div className="flex flex-col gap-3">
              <p className="font-bold text-lg">Sobre nós</p>

              <button
                type="button"
                onClick={() => goToPage("/")}
                className="text-left text-sm text-white/80 hover:text-white transition"
              >
                Conheça a dev
              </button>

              <button
                type="button"
                onClick={() => goToPage("/members")}
                className="text-left text-sm text-white/80 hover:text-white transition"
              >
                Membros
              </button>

              <button
                type="button"
                onClick={() => goToPage("/")}
                className="text-left text-sm text-white/80 hover:text-white transition"
              >
                Processo seletivo
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-bold text-lg">Portfólio</p>

              <button
                type="button"
                onClick={() => goToPage("/projects")}
                className="text-left text-sm text-white/80 hover:text-white transition"
              >
                Projetos
              </button>

              <button
                type="button"
                onClick={() => goToPage("/events")}
                className="text-left text-sm text-white/80 hover:text-white transition"
              >
                Eventos
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 border-t border-white/10 pt-6 text-xs text-white/60 w-full">
        <div className="mx-auto w-full lg:max-w-6xl">
          © 2025 Dev Community Mauá
        </div>
      </div>
    </div>
  </footer>
);
}
