import { NavLink } from "react-router-dom";
import { LayoutDashboard, Bike, Users, ShoppingBag } from "lucide-react";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/bicycles", label: "Bicycles", icon: Bike },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 hidden lg:block">
      <h2 className="text-xl font-bold mb-8">Admin Menu</h2>
      <ul className="space-y-2">
        {items.map((item) => {
          const { to, label, icon: Icon } = item;
          return (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition ${
                    isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
