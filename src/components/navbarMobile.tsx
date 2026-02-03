import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NavbarMobile() {
  const navigate = useNavigate();
  function goToPage(page: string) {
    navigate(page);
  }

  return (
    <header className="bg-gray-800 text-white w-full shadow-md sticky top-0 z-50">
      <div className="min-h-[70px] py-2 w-full flex flex-wrap items-center justify-between px-4 bg-gray-800">
        
        <div
          className="cursor-pointer flex-shrink-0"
          onClick={() => goToPage("/")}
        >
          <img src={logo} alt="Dev Community Logo" className="h-8 w-auto md:h-10" />
        </div>

        <nav className="flex items-center justify-end flex-1 gap-3 sm:gap-6 md:gap-10 text-sm sm:text-base font-medium">
          <div className="flex gap-3 sm:gap-6 items-center">
            <button
              onClick={() => goToPage("/")}
              className="hover:text-red-400 transition-colors whitespace-nowrap"
            >
              Home
            </button>
            <button
              onClick={() => goToPage("/projects")}
              className="hover:text-red-400 transition-colors whitespace-nowrap"
            >
              Projetos
            </button>
            <button
              onClick={() => goToPage("/members")}
              className="hover:text-red-400 transition-colors whitespace-nowrap"
            >
              Membros
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <button className="bg-white hover:bg-gray-300 text-black py-1.5 px-3 rounded text-xs sm:text-sm font-bold">
              Login
            </button>
            <button className="bg-red-800 hover:bg-red-900 text-white py-1.5 px-3 rounded text-xs sm:text-sm font-bold whitespace-nowrap">
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}