import { Wrench } from "lucide-react"; // modern icon library

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-6 bg-gray-800 rounded-full shadow-lg">
            <Wrench className="w-16 h-16 text-yellow-400 animate-pulse" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">Site Under Maintenance</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto">
          We’re currently performing some updates to improve your experience.  
          Please check back soon.
        </p>

        <div className="pt-4">
          <a
            href="/"
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Go Back Home
          </a>
        </div>

        <footer className="text-gray-400 text-sm pt-10">
          © {new Date().getFullYear()} Bicycle Safari Udawalawa. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
