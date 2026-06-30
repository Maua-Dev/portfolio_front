import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";
import LoginModal from "./loginModal";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  function goToPage(page: string) {
    navigate(page);
  }

  return (
    <>
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
          <div className="absolute right-12 flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="bg-gray-100 text-gray-800 font-medium px-5 py-2 rounded-xl hover:bg-white transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-gray-100 text-gray-800 font-medium px-5 py-2 rounded-xl hover:bg-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => goToPage("/signup")}
                  className="bg-red-950 text-white font-medium px-5 py-2 rounded-xl hover:bg-red-900 transition-colors"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}