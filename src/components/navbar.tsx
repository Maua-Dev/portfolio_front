import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  function goToPage(page: string) {
    navigate(page);
  }

  return (
    <header className="bg-gray-800 text-white w-full shadow-md">
      <div className="h-[84px] relative w-full flex justify-center items-center px-12 bg-gray-800 text-white">
        <div
          className="cursor-pointer absolute left-4"
          onClick={() => goToPage("/")}
        >
          <img src={logo} alt="Dev Community Logo" className="h-10 w-auto" />
        </div>

        <nav className="flex flex-1 justify-center gap-20 text-lg font-medium">
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

        <div className="w-[40px]" />
      </div>
    </header>
  );
}
