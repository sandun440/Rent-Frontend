import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Shield,
  Save,
  Loader2,
  ArrowLeft,
  Lock,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
          navigate("/login");
          return;
        }

        const [userRes, ordersRes] = await Promise.all([
          axios.get(`/api/users/${storedUser.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`/api/orders/user/${storedUser.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUserData(userRes.data);
        setName(userRes.data.name);
        setOrders(ordersRes.data);
      } catch (err) {
        toast.error("Failed to load profile");
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const payload = { name };
      if (newPassword) payload.password = newPassword;

      if (!userData?.email) throw new Error("User email not found");

      const res = await axios.put(`/api/users/${userData.email}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = {
        ...JSON.parse(localStorage.getItem("user")),
        name: res.data.user.name,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setNewPassword("");
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="bg-[#1e293b] rounded-3xl p-8 border border-slate-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <User size={200} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-24 h-24 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <User className="text-white w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {userData?.name}
                </h1>
                <p className="text-slate-400 flex items-center gap-2">
                  <Mail size={16} /> {userData?.email}
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8 max-w-lg">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="text"
                    required
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl py-4 px-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">
                  New Password (Leave blank to keep current)
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="password"
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl py-4 px-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2 opacity-60">
                <label className="text-sm font-medium text-slate-400 ml-1">
                  Account Type
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="text"
                    disabled
                    className="w-full bg-[#0f172a]/50 border border-slate-800 rounded-2xl py-4 px-12 text-slate-500 cursor-not-allowed"
                    value={
                      userData?.type === "admin" ? "Administrator" : "Customer"
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updating}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl flex items-center gap-3 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {updating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ==================== BOOKING HISTORY ==================== */}
        <div className="mt-12 reveal-on-scroll active">
          <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3 italic uppercase">
            <Bike className="text-emerald-500" /> Adventure{" "}
            <span className="text-emerald-500">History</span>
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-[#1e293b] rounded-[2rem] p-8 border border-slate-700/50 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-700">
                        <Bike className="text-emerald-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-xl font-black text-white uppercase italic">
                            Rent ID: #{order.bicyclenumber}
                          </h4>
                          <span
                            className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${
                              order.status === "active"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : order.status === "completed"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-slate-500 text-sm font-bold flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} className="text-slate-600" />{" "}
                            {new Date(order.startTime).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1 uppercase tracking-widest text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                            {order.rentalType}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <p className="text-slate-500 text-xs font-black uppercase tracking-widest">
                        Investment
                      </p>
                      <p className="text-3xl font-black text-white italic tracking-tighter">
                        LKR {order.totalCost}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-900/30 rounded-[3rem] border border-dashed border-slate-700">
                <Bike
                  size={48}
                  className="mx-auto text-slate-700 mb-6 opacity-40"
                />
                <p className="text-slate-500 text-lg font-bold uppercase tracking-widest">
                  No adventures logged yet.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-6 text-emerald-500 hover:text-emerald-400 font-black uppercase text-xs flex items-center gap-2 mx-auto decoration-emerald-500 hover:underline underline-offset-8"
                >
                  Start Your First Safari{" "}
                  <ArrowLeft className="rotate-180" size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
