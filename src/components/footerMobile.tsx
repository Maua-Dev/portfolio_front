import { useNavigate } from "react-router-dom";

export default function FooterMobile() {
  const navigate = useNavigate();
  function goToPage(page: string) { navigate(page); }

  return (
    <footer className="bg-gray-800 text-white w-full py-10 px-6">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 max-w-6xl mx-auto">
        
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <img src="src/assets/logo.png" className="w-auto h-[60px]" alt="Logo" />
          <p className="max-w-[250px] text-sm text-gray-400">
            Todos direitos reservados à Dev Community Mauá, 2025
          </p>
          <div className="flex flex-row gap-4">
            <a href="https://www.instagram.com/..." target="_blank" rel="noopener noreferrer">
              <img src="src/assets/instagramLogo.png" className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/..." target="_blank" rel="noopener noreferrer">
              <img src="src/assets/linkedinLogo.png" className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 md:gap-20 text-center md:text-left items-center sm:items-start">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl mb-1">Sobre nós</p>
            <span className="cursor-pointer hover:underline" onClick={() => goToPage("/homeMobile")}>Conheça a dev</span>
            <span className="cursor-pointer hover:underline" onClick={() => goToPage("/membersMobile")}>Membros</span>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl mb-1">Portfólio</p>
            <span className="cursor-pointer hover:underline" onClick={() => goToPage("/projectsMobile")}>Projetos</span>
            <span className="cursor-pointer hover:underline" onClick={() => goToPage("/eventsMobile")}>Eventos</span>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-bold text-xl mb-1">Contatos</p>
            <div className="relative w-full max-w-[250px]">
              <input 
                className="bg-gray-700 text-gray-300 px-3 py-2 pr-10 rounded w-full text-sm focus:outline-none focus:ring-1 focus:ring-white" 
                placeholder="Seu email" 
                type="email" 
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}