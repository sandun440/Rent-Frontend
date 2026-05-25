// Modified Orders.jsx
import { useEffect, useState } from "react";
import OrderRow from "../../components/OrderRow";
import { toast } from "react-toastify";

const API_BASE = "/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sorted);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const change = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      toast.success(`Order ${status}`);
      load();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order");
    }
  };

  const cancel = async (id) => {
    if (!window.confirm("Cancel order?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      toast.success("Cancelled");
      load();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <OrderRow
            key={o._id}
            order={o}
            onStatusChange={change}
            onCancel={cancel}
          />
        ))}
      </div>
    </div>
  );
}
