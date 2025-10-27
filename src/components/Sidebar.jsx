import { NavLink } from 'react-router-dom';
import { HomeIcon, BikeIcon, UsersIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const items = [
  { to: '/admin', label: 'Dashboard', icon: HomeIcon },
  { to: '/admin/bicycles', label: 'Bicycles', icon: BikeIcon },
  { to: '/admin/users', label: 'Users', icon: UsersIcon },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCartIcon },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 hidden lg:block">
      <h2 className="text-xl font-bold mb-8">Admin Menu</h2>
      <ul className="space-y-2">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition ${
                  isActive ? 'bg-indigo-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}