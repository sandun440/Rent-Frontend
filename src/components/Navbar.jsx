import { Link } from 'react-router-dom';
import { Bike, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-linear-to-br from-green-500 to-teal-600 p-2 rounded-full">
              <Bike className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Bicycle Safari
              </h1>
              <p className="text-xs text-gray-600">Udawalawa</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="#bikes" className="text-gray-700 hover:text-green-600 transition">Bikes</Link>
            <Link to="#about" className="text-gray-700 hover:text-green-600 transition">About</Link>
            <Link to="#contact" className="text-gray-700 hover:text-green-600 transition">Contact</Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden bg-white border-t flex flex-col space-y-4 px-4 py-4">
            <a href="#bikes" className="text-gray-700 hover:text-green-600">Bikes</a>
            <a href="#about" className="text-gray-700 hover:text-green-600">ABOUT</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600">Contact</a>
          </nav>
        )}
      </div>
    </header>
  );
}