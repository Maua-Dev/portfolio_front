import { useState } from "react";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    login();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[520px] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(160deg, #2e3250 0%, #4a4f72 50%, #6b6f8a 100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white/50 hover:text-white text-2xl font-light transition-colors z-10"
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="flex justify-center items-center py-5 px-8 bg-gray-900/60 rounded-t-2xl">
          <img src={logo} alt="Dev Community Logo" className="h-12 w-auto" />
        </div>
        <div className="px-14 py-10 flex flex-col gap-7">
          <div className="flex items-center gap-4">
            <label className="text-white font-semibold text-lg w-24 shrink-0 text-right">
              Usuário:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 rounded-full px-5 py-2.5 bg-gray-200 text-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-white font-semibold text-lg w-24 shrink-0 text-right">
              Senha:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 rounded-full px-5 py-2.5 bg-gray-200 text-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition-all text-sm"
            />
          </div>
          <div className="flex justify-center pt-2">
            <button
              onClick={handleLogin}
              className="bg-red-950 hover:bg-red-800 text-white font-semibold px-14 py-2.5 rounded-xl transition-colors text-sm"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}