import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function goToPage(page: string) {
    navigate(page);
    setOpen(false);
  }

  return (
    <header className="bg-gray-800 text-white w-full shadow-md">
      {/* Barra principal */}
      <div className="relative w-full h-[84px] px-6 flex items-center">
        
        {/* Logo EXTREMA esquerda */}
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => goToPage("/")}
          aria-label="Ir para a página inicial"
        >
          <img src={logo} alt="Dev Community Logo" className="h-10 w-auto" />
        </button>

        {/* Menu desktop CENTRALIZADO */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-sm font-medium">
          <button
            onClick={() => goToPage("/")}
            className="hover:text-red-400 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => goToPage("/projects")}
            className="hover:text-red-400 transition-colors"
          >
            Projetos
          </button>
          <button
            onClick={() => goToPage("/members")}
            className="hover:text-red-400 transition-colors"
          >
            Membros
          </button>
          <button
            onClick={() => goToPage("/events")}
            className="hover:text-red-400 transition-colors"
          >
            Eventos
          </button>
        </nav>

        {/* Botão hambúrguer (mobile) */}
        <button
          type="button"
          className="md:hidden ml-auto inline-flex items-center justify-center rounded-lg p-2 hover:bg-white/10 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1">
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t border-white/10">
          <nav className="w-full px-6 py-3 flex flex-col gap-2 text-sm font-medium">
            <button
              onClick={() => goToPage("/")}
              className="text-left rounded-lg px-3 py-2 hover:bg-white/10 transition"
            >
              Home
            </button>
            <button
              onClick={() => goToPage("/projects")}
              className="text-left rounded-lg px-3 py-2 hover:bg-white/10 transition"
            >
              Projetos
            </button>
            <button
              onClick={() => goToPage("/members")}
              className="text-left rounded-lg px-3 py-2 hover:bg-white/10 transition"
            >
              Membros
            </button>
            <button
              onClick={() => goToPage("/events")}
              className="text-left rounded-lg px-3 py-2 hover:bg-white/10 transition"
            >
              Eventos
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}