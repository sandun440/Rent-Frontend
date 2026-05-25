import { Link, useNavigate } from "react-router-dom";
import { Bike, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-emerald-500 p-2 rounded-2xl group-hover:scale-110 transition-transform">
              <Bike className="text-slate-900" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">
                Rent <span className="text-emerald-500">Bicycle</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                Udawalawa Safari
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-10">
            <a
              href="/"
              className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
            >
              Home
            </a>
            <a
              href="/#fleet"
              className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
            >
              The Fleet
            </a>
            <a
              href="/#experience"
              className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
            >
              Experience
            </a>
            {user ? (
              <div className="flex items-center gap-6">
                {user.type === "admin" && (
                  <Link
                    to="/admin"
                    className="text-emerald-400 hover:text-emerald-300 transition font-bold text-sm uppercase"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-bold"
                >
                  <UserIcon size={18} className="text-emerald-500" />
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 px-5 py-2 rounded-xl flex items-center gap-2 transition-all font-bold text-xs uppercase"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-white transition font-bold text-sm uppercase"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 font-black text-sm uppercase"
                >
                  Join Safari
                </Link>
              </div>
            )}
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden bg-[#0f172a] border-t border-slate-800 flex flex-col space-y-4 px-6 py-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <a
              href="/#fleet"
              onClick={() => setMobileOpen(false)}
              className="text-slate-400 hover:text-emerald-400 py-3 border-b border-slate-800/50 text-sm font-bold uppercase tracking-widest transition-colors"
            >
              The Fleet
            </a>
            <a
              href="/#experience"
              onClick={() => setMobileOpen(false)}
              className="text-slate-400 hover:text-emerald-400 py-3 border-b border-slate-800/50 text-sm font-bold uppercase tracking-widest transition-colors"
            >
              Experience
            </a>
            {user ? (
              <>
                {user.type === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="text-emerald-400 hover:text-emerald-300 py-3 border-b border-slate-800/50 text-sm font-bold uppercase"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-300 hover:text-white py-3 border-b border-slate-800/50 text-sm font-bold"
                >
                  My Profile
                </Link>
                <div className="flex items-center gap-2 py-4 text-emerald-500 font-black uppercase text-xs tracking-widest">
                  <UserIcon size={16} /> {user.name}
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="bg-red-500/10 text-red-400 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs uppercase transition-all"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-4 pt-4">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-400 hover:text-white py-3 text-center font-bold text-sm uppercase tracking-widest"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="bg-emerald-500 text-slate-900 px-6 py-4 rounded-2xl text-center font-black uppercase text-sm shadow-lg shadow-emerald-500/20"
                >
                  Join Safari
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
