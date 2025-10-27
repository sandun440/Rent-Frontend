import { AlertTriangle } from "lucide-react"; // modern warning icon

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-4">
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-6 bg-gray-800 rounded-full shadow-lg">
            <AlertTriangle className="w-16 h-16 text-red-400 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold text-red-400">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold">Oops! Page Not Found</h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto">
          The page you’re looking for might have been moved, deleted, or never existed.
        </p>

        {/* Button */}
        <div className="pt-4">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-red-500 hover:bg-red-400 text-gray-900 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <footer className="text-gray-400 text-sm pt-10">
          © {new Date().getFullYear()} Bicycle Safari Udawalawa. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
