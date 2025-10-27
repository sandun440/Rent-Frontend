import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

// Correct: Uses Vite proxy → no CORS, works in dev & prod
const API_BASE = '/api';

export default function HomePage() {
  const [bicycles, setBicycles] = useState([]);
  const [selectedBicycle, setSelectedBicycle] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    startTime: '',
    endTime: '',
    rentalType: 'hourly',
  });

  // -------------------------------------------------
  // Fetch available bicycles
  // -------------------------------------------------
  useEffect(() => {
    fetchBicycles();
  }, []);

  const fetchBicycles = async () => {
    try {
      const res = await fetch(`${API_BASE}/bicycles`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setBicycles(data.filter((bike) => bike.isAvailable));
    } catch (error) {
      console.error('Error fetching bicycles:', error);
    }
  };

  // -------------------------------------------------
  // Submit booking
  // -------------------------------------------------
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!bookingForm.startTime || !bookingForm.endTime) {
      alert('Please select start and end time');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        alert('Booking successful! Enjoy your ride!');
        setShowBooking(false);
        setSelectedBicycle(null);
        setBookingForm({
          name: '',
          email: '',
          phone: '',
          startTime: '',
          endTime: '',
          rentalType: 'hourly',
        });
        fetchBicycles(); // Refresh list
      } else {
        alert(result.error || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Network error. Please check your connection.');
    }
  };

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-teal-50">
      
      {/* ==================== HEADER ==================== */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-green-500 to-teal-600 p-2 rounded-full">
                <Bike className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Bicycle Safari
                </h1>
                <p className="text-xs text-gray-600">Udawalawa</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#bikes" className="text-gray-700 hover:text-green-600 transition">
                Bikes
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition">
                Contact
              </a>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col space-y-4 px-4 py-4">
              <a href="#bikes" className="text-gray-700 hover:text-green-600 transition">
                Bikes
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition">
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full">
            <span className="text-green-700 font-semibold text-sm">
              Explore Udawalawa on Two Wheels
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Adventure Awaits in
            <span className="block bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Udawalawa Wildlife
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the beauty of nature at your own pace. Premium bicycles for unforgettable journeys.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#bikes"
              className="bg-linear-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all inline-flex items-center"
            >
              Browse Bikes <ChevronRight className="ml-2" />
            </a>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-green-600 transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-green-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-teal-300 rounded-full opacity-20 blur-xl"></div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Bike, title: 'Quality Bikes', desc: 'Well-maintained, premium bicycles for all terrains' },
              { icon: MapPin, title: 'Best Routes', desc: 'Explore scenic trails and wildlife hotspots' },
              { icon: Clock, title: 'Flexible Rental', desc: 'Hourly, daily, or weekly rental options' },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="bg-linear-to-br from-green-100 to-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <f.icon className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FLEET ==================== */}
      <section id="bikes" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Fleet</h2>
            <p className="text-gray-600 text-lg">Choose your perfect ride</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bicycles.map((bike) => (
              <div
                key={bike._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="bg-linear-to-br from-green-400 to-teal-500 h-48 flex items-center justify-center">
                  <Bike size={80} className="text-white opacity-80" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{bike.name}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {bike.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">#{bike.bicyclenumber}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Hourly</span>
                      <span className="font-bold text-gray-900">LKR {bike.pricePerHour}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Daily</span>
                      <span className="font-bold text-gray-900">LKR {bike.pricePerDay}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Weekly</span>
                      <span className="font-bold text-gray-900">LKR {bike.pricePerWeek}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedBicycle(bike);
                      setShowBooking(true);
                    }}
                    className="w-full bg-linear-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {bicycles.length === 0 && (
            <div className="text-center py-12">
              <Bike size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No bicycles available at the moment</p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== BOOKING MODAL ==================== */}
      {showBooking && selectedBicycle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-linear-to-r from-green-600 to-teal-600 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Book Your Ride</h3>
                  <p className="opacity-90">
                    {selectedBicycle.name} - {selectedBicycle.type}
                  </p>
                </div>
                <button
                  onClick={() => setShowBooking(false)}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <User className="inline mr-2" size={18} /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <Mail className="inline mr-2" size={18} /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <Phone className="inline mr-2" size={18} /> Phone Number
                </label>
                <input
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                  placeholder="+94 77 123 4567"
                />
              </div>

              {/* Rental Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Rental Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['hourly', 'daily', 'weekly'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBookingForm({ ...bookingForm, rentalType: type })}
                      className={`py-3 px-4 rounded-xl font-semibold capitalize transition ${
                        bookingForm.rentalType === type
                          ? 'bg-linear-to-r from-green-600 to-teal-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start & End Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <Calendar className="inline mr-2" size={18} /> Start Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={bookingForm.startTime}
                    onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <Calendar className="inline mr-2" size={18} /> End Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={bookingForm.endTime}
                    onChange={(e) => setBookingForm({ ...bookingForm, endTime: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="bg-linear-to-br from-green-50 to-teal-50 p-6 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-3">Pricing Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hourly Rate:</span>
                    <span className="font-semibold">LKR {selectedBicycle.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Rate:</span>
                    <span className="font-semibold">LKR {selectedBicycle.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekly Rate:</span>
                    <span className="font-semibold">LKR {selectedBicycle.pricePerWeek}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-linear-to-br from-green-500 to-teal-600 p-2 rounded-full">
                  <Bike className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Bicycle Safari</h3>
                  <p className="text-sm text-gray-400">Udawalawa</p>
                </div>
              </div>
              <p className="text-gray-400">
                Your gateway to adventure in Udawalawa's beautiful wilderness.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#bikes" className="hover:text-green-400 transition">Our Bikes</a></li>
                <li><a href="#about" className="hover:text-green-400 transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-green-400 transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><MapPin size={16} className="mr-2" /> Udawalawa, Sri Lanka</li>
                <li className="flex items-center"><Phone size={16} className="mr-2" /> +94 77 123 4567</li>
                <li className="flex items-center"><Mail size={16} className="mr-2" /> info@bicyclesafari.lk</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bicycle Safari Udawalawa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}