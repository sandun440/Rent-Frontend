import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
