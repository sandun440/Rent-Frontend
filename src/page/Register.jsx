import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Bike, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/users", formData);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1e293b] rounded-24 p-8 shadow-2xl border border-slate-700/50 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-20 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
            <Bike className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join our bicycle rental community</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                required
                className="w-full bg-[#0f172a] border border-slate-700 rounded-16 py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="email"
                required
                className="w-full bg-[#0f172a] border border-slate-700 rounded-16 py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="password"
                required
                className="w-full bg-[#0f172a] border border-slate-700 rounded-16 py-3 px-12 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-16 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:scale-100 mt-4"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Register <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
