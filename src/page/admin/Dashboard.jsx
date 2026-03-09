// Modified Dashboard.jsx
import { useEffect, useState } from "react";

const API_BASE = "/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    bicycles: 0,
    orders: 0,
    active: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const [usersRes, bicyclesRes, ordersRes] = await Promise.all([
          fetch(`${API_BASE}/users`, { headers }),
          fetch(`${API_BASE}/bicycles`, { headers }),
          fetch(`${API_BASE}/orders`, { headers }),
        ]);

        if (!usersRes.ok) throw new Error(`Users HTTP ${usersRes.status}`);
        if (!bicyclesRes.ok)
          throw new Error(`Bicycles HTTP ${bicyclesRes.status}`);
        if (!ordersRes.ok) throw new Error(`Orders HTTP ${ordersRes.status}`);

        const [usersData, bicyclesData, ordersData] = await Promise.all([
          usersRes.json(),
          bicyclesRes.json(),
          ordersRes.json(),
        ]);

        setStats({
          users: usersData.length,
          bicycles: bicyclesData.length,
          orders: ordersData.length,
          active: ordersData.filter((x) => x.status === "active").length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Users</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Bicycles</h3>
          <p className="text-3xl font-bold text-green-600">{stats.bicycles}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.orders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Active</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.active}</p>
        </div>
      </div>
    </div>
  );
}
