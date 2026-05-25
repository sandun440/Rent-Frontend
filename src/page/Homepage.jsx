import React, { useState, useEffect, useRef } from "react";
import {
  Bike,
  MapPin,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  ChevronRight,
  Menu,
  X,
  Star,
  Shield,
  ArrowRight,
  Info,
  CheckCircle2,
  Camera,
  Compass,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const API_BASE = "/api";

export default function HomePage() {
  const [bicycles, setBicycles] = useState([]);
  const [selectedBicycle, setSelectedBicycle] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    startTime: "",
    endTime: "",
    rentalType: "hourly",
  });

  const calculateTotalCost = () => {
    if (!bookingForm.startTime || !bookingForm.endTime || !selectedBicycle)
      return null;
    const start = new Date(bookingForm.startTime);
    const end = new Date(bookingForm.endTime);
    if (end <= start) return null;

    const durationHours = (end - start) / (1000 * 60 * 60);
    const durationDays = (end - start) / (1000 * 60 * 60 * 24);
    const durationWeeks = (end - start) / (1000 * 60 * 60 * 24 * 7);

    switch (bookingForm.rentalType) {
      case "hourly":
        return Math.ceil(durationHours) * selectedBicycle.pricePerHour;
      case "daily":
        return Math.ceil(durationDays) * selectedBicycle.pricePerDay;
      case "weekly":
        return Math.ceil(durationWeeks) * selectedBicycle.pricePerWeek;
      default:
        return null;
    }
  };

  const revealingRefs = useRef([]);

  useEffect(() => {
    fetchBicycles();

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.05 },
    ); // Lower threshold for better sensitivity

    const currentRefs = revealingRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const fetchBicycles = async () => {
    try {
      const res = await fetch(`${API_BASE}/bicycles`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setBicycles(data.filter((bike) => bike.isAvailable));
      } else {
        console.warn("Expected array for bicycles, got:", data);
        setBicycles([]);
      }
    } catch (error) {
      console.error("Error fetching bicycles:", error);
      setBicycles([]);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.startTime || !bookingForm.endTime) {
      toast.error("Please select start and end time");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail: bookingForm.email,
          name: bookingForm.name,
          bicyclenumber: selectedBicycle.bicyclenumber,
          startTime: bookingForm.startTime,
          endTime: bookingForm.endTime,
          rentalType: bookingForm.rentalType,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Booking successful! Enjoy your safari ride!");
        setShowBooking(false);
        setSelectedBicycle(null);
        setBookingForm({
          name: "",
          email: "",
          phone: "",
          startTime: "",
          endTime: "",
          rentalType: "hourly",
        });
        fetchBicycles();
      } else {
        toast.error(result.error || "Booking failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-emerald-500/30">
      <Navbar />

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Parallax Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.png"
            alt="Udawalawa Safari"
            className="w-full h-full object-cover scale-110 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/20 via-[#0f172a]/60 to-[#0f172a]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">
              Sri Lanka's Best Bicycle Safari
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            Ride Into The
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Wild Heart
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Unleash your inner explorer. Navigate the hidden trails of Udawalawa
            with our premium fleet of adventure-ready bicycles.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#fleet"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/20 flex items-center gap-2 group"
            >
              Start Adventure{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#experience"
              className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all border border-slate-700 flex items-center gap-2"
            >
              Watch Safari <Compass className="text-emerald-400" />
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-emerald-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ==================== STATS / TRUST ==================== */}
      <section className="py-20 relative px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Safari Bikes", val: "50+" },
            { label: "Happy Tourists", val: "10K+" },
            { label: "Scenic Trails", val: "25+" },
            { label: "Avg Rating", val: "4.9/5" },
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <h3 className="text-4xl md:text-6xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {s.val}
              </h3>
              <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section
        id="experience"
        className="py-24 px-4 overflow-hidden reveal-on-scroll"
        ref={(el) => (revealingRefs.current[0] = el)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full"></div>
              <img
                src="/images/safari_vibe_AI.png"
                alt="Udawalawa Scenery"
                className="relative rounded-[3rem] shadow-2xl border border-slate-800 grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
              />
              <div className="absolute -bottom-8 -right-8 bg-[#1e293b] p-8 rounded-[2rem] border border-slate-700 shadow-2xl glass-dark animate-float">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-2xl">
                    <Camera className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Wildlife Sightings</p>
                    <p className="text-xs text-slate-400">98% Success Rate</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 border-l-4 border-emerald-500 pl-8">
                Explore Udawalawa <br /> Like Never Before
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Off-Road Trails",
                    desc: "Custom routes through teak forests and lakeside paths.",
                    icon: MapPin,
                  },
                  {
                    title: "Eco-Friendly Safari",
                    desc: "No noise, no fumes. Just you and the sounds of nature.",
                    icon: Zap,
                  },
                  {
                    title: "Expert Guidance",
                    desc: "Maps and area insights provided for every rental.",
                    icon: Compass,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-emerald-500/20 transition-colors">
                      <item.icon className="text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[1300px] h-[700px] my-auto">
              <video
                className="h-full w-full object-cover rounded-lg"
                controls
                autoPlay
                muted
              >
                <source
                  src="/images/safari_video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section
        className="py-24 bg-[#0f172a]/80 relative reveal-on-scroll"
        ref={(el) => (revealingRefs.current[1] = el)}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Simple Steps to Adventure
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Pick Your Ride",
                desc: "Browse our specialized fleet of mountain and hybrid bikes.",
                icon: Bike,
              },
              {
                step: "02",
                title: "Book Online",
                desc: "Select your duration and confirm your reservation instantly.",
                icon: Calendar,
              },
              {
                step: "03",
                title: "Ride the Wild",
                desc: "Collect your bike and start your unique safari journey.",
                icon: Zap,
              },
            ].map((s, i) => (
              <div
                key={i}
                className="relative group text-center p-10 bg-slate-800/30 rounded-[3rem] border border-slate-800 hover:border-emerald-500/50 transition-all"
              >
                <div className="text-8xl font-black text-slate-800/50 absolute top-4 left-4 -z-10 group-hover:text-emerald-500/5 transition-colors">
                  {s.step}
                </div>
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/20">
                  <s.icon className="text-slate-900" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {s.title}
                </h3>
                <p className="text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FLEET ==================== */}
      <section
        id="fleet"
        className="py-24 px-4 bg-gradient-to-b from-[#0f172a] to-[#111827] reveal-on-scroll"
        ref={(el) => (revealingRefs.current[2] = el)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase italic">
                The Beast <span className="text-emerald-500">Fleet</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Engineered for Udawalawa's diverse terrain.
              </p>
            </div>
            <div className="flex gap-4">
              {["All", "Mountain", "Road", "Hybrid"].map((cat) => (
                <button
                  key={cat}
                  className="px-6 py-2 rounded-full border border-slate-700 text-sm font-bold hover:bg-emerald-500 hover:text-slate-900 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {bicycles.map((bike) => (
              <div
                key={bike._id}
                className="group relative bg-[#1e293b] rounded-[2.5rem] overflow-hidden border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                {/* Bicycle Image with Gradient Overlay */}
                <div className="h-64 relative overflow-hidden bg-slate-800 flex items-center justify-center">
                  {bike.image ? (
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-full object-cover group-hover:scale-110 duration-500 transition-transform"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 group-hover:opacity-100 opacity-60 transition-opacity"></div>
                      <Bike
                        size={120}
                        className="text-slate-700 group-hover:text-emerald-400 transition-colors group-hover:scale-110 duration-500"
                      />
                    </>
                  )}
                  {/* Subtle Bottom Shadow overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/70 via-transparent to-transparent"></div>

                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 bg-emerald-500 text-slate-900 rounded-full text-xs font-black uppercase shadow-lg">
                      {bike.type}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">
                        {bike.name}
                      </h3>
                      <p className="text-slate-500 font-mono text-sm uppercase tracking-tighter">
                        ID: #{bike.bicyclenumber}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-900/50 p-3 rounded-2xl text-center border border-slate-800">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                        Hr
                      </p>
                      <p className="text-sm font-black text-white">
                        Rs.{bike.pricePerHour}
                      </p>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-2xl text-center border border-slate-800">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                        Day
                      </p>
                      <p className="text-sm font-black text-white">
                        Rs.{bike.pricePerDay}
                      </p>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-2xl text-center border border-slate-800">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                        Wk
                      </p>
                      <p className="text-sm font-black text-white">
                        Rs.{bike.pricePerWeek}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const user = JSON.parse(localStorage.getItem("user"));
                      if (!user) {
                        toast.info("Please login to book your ride");
                        return;
                      }
                      setSelectedBicycle(bike);
                      setBookingForm((prev) => ({
                        ...prev,
                        name: user.name,
                        email: user.email,
                      }));
                      setShowBooking(true);
                    }}
                    className="w-full bg-slate-900 hover:bg-emerald-500 hover:text-slate-900 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    Lock It In{" "}
                    <Zap size={18} className="group-hover/btn:animate-pulse" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {bicycles.length === 0 && (
            <div className="text-center py-20 bg-slate-900/30 rounded-[3rem] border border-dashed border-slate-700">
              <Bike
                size={64}
                className="mx-auto text-slate-700 mb-6 animate-pulse"
              />
              <p className="text-slate-400 text-xl font-bold">
                The fleet is currently out exploring. <br /> Check back shortly!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== BOOKING MODAL ==================== */}
      {showBooking && selectedBicycle && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#1e293b] rounded-[3rem] max-w-2xl w-full border border-slate-700 shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-10 py-10 bg-gradient-to-r from-emerald-500 to-cyan-500 flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">
                  Confirm Rental
                </h3>
                <p className="text-slate-900/70 font-bold uppercase text-xs tracking-widest">
                  {selectedBicycle.name} • {selectedBicycle.type}
                </p>
              </div>
              <button
                onClick={() => setShowBooking(false)}
                className="bg-slate-900/20 hover:bg-slate-900/40 p-3 rounded-full transition-colors"
              >
                <X className="text-slate-900" size={24} />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} className="text-emerald-400" /> Your
                    Identity
                  </label>
                  <input
                    readOnly
                    value={bookingForm.name}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-slate-300 focus:outline-none cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} className="text-emerald-400" /> Connection
                  </label>
                  <input
                    type="tel"
                    placeholder="+94 7X XXX XXXX"
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, phone: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-emerald-500/50 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Duration Preference
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["hourly", "daily", "weekly"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setBookingForm({ ...bookingForm, rentalType: type })
                      }
                      className={`py-4 rounded-2xl font-black uppercase text-xs transition-all ${bookingForm.rentalType === type ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20" : "bg-slate-900 text-slate-500 hover:text-white"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} className="text-emerald-400" />{" "}
                    Adventure Start
                  </label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        startTime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} className="text-emerald-400" />{" "}
                    Adventure End
                  </label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        endTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-6 bg-slate-900 rounded-[2rem] border border-slate-800 flex justify-between items-center group">
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    Pricing Model
                  </p>
                  <p className="text-sm font-bold text-slate-400 capitalize">
                    {bookingForm.rentalType} &bull; LKR{" "}
                    {
                      selectedBicycle[
                        `pricePer${bookingForm.rentalType.charAt(0).toUpperCase() + bookingForm.rentalType.slice(1)}`
                      ]
                    }{" "}
                    /{" "}
                    {bookingForm.rentalType === "hourly"
                      ? "hr"
                      : bookingForm.rentalType === "daily"
                        ? "day"
                        : "wk"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-emerald-500 uppercase">
                    Total Cost
                  </p>
                  {calculateTotalCost() !== null ? (
                    <p className="text-2xl font-black text-emerald-400">
                      LKR {calculateTotalCost().toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-sm font-bold text-slate-500">
                      Select dates to calculate
                    </p>
                  )}
                </div>
              </div>

              <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all">
                Complete Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#0a0f1e] pt-24 pb-12 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                <Bike className="text-slate-900" />
              </div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                Rent <span className="text-emerald-500">Bicycle</span>
              </h2>
            </div>
            <p className="text-xl text-slate-500 max-w-md leading-relaxed">
              Udawalawa's premier bicycle expedition service. We bridge the gap
              between curiosity and discovery.
            </p>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-xs tracking-[0.3em] mb-8">
              Follow Trails
            </h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#fleet"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Safety Protocols
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Community Projects
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Safari Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-xs tracking-[0.3em] mb-8">
              Headquarters
            </h4>
            <p className="text-slate-400 font-bold mb-4">
              Main Gate Road, <br />
              Udawalawa, Sri Lanka
            </p>
            <p className="text-emerald-400 font-black">+94 77 123 4567</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 font-bold text-sm">
            © 2024 Bicycle Safari Udawalawa. Adventure Certified.
          </p>
          <div className="flex gap-8">
            <span className="text-slate-600 hover:text-slate-400 cursor-pointer text-sm font-bold">
              Privacy Policy
            </span>
            <span className="text-slate-600 hover:text-slate-400 cursor-pointer text-sm font-bold">
              Rental Terms
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
