// Modified Bicycles.jsx
import { useEffect, useState } from "react";
import BicycleForm from "../../components/BicycleForm";
import { toast } from "react-toastify";
import { Bike } from "lucide-react";

const API_BASE = "/api";

export default function Bicycles() {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);

  const load = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/bicycles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error("Error fetching bicycles:", error);
      toast.error("Failed to fetch bicycles");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (payload) => {
    try {
      let currentPayload = { ...payload };
      
      // If the image is a newly uploaded Base64 file, upload it to server first
      if (currentPayload.image && currentPayload.image.startsWith("data:")) {
        toast.info("Uploading image...", { autoClose: 1000 });
        const token = localStorage.getItem("token");
        const uploadRes = await fetch(`${API_BASE}/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: currentPayload.image }),
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload image to server");
        }
        
        const uploadData = await uploadRes.json();
        currentPayload.image = uploadData.url;
      }

      let res;
      const token = localStorage.getItem("token");
      if (edit) {
        res = await fetch(`${API_BASE}/bicycles/${currentPayload.bicyclenumber}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(currentPayload),
        });
      } else {
        res = await fetch(`${API_BASE}/bicycles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(currentPayload),
        });
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success(edit ? "Updated" : "Added");
      setShow(false);
      setEdit(null);
      load();
    } catch (error) {
      console.error("Error saving bicycle:", error);
      toast.error(error.message || "Error");
    }
  };

  const del = async (num) => {
    if (!window.confirm("Delete?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/bicycles/${num}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      toast.success("Deleted");
      load();
    } catch (error) {
      console.error("Error deleting bicycle:", error);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Bicycles</h1>
        <button
          onClick={() => {
            setEdit(null);
            setShow(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {edit ? "Edit" : "Add"} Bicycle
            </h2>
            <BicycleForm
              bicycle={edit}
              onSubmit={save}
              onCancel={() => {
                setShow(false);
                setEdit(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((b) => (
          <div key={b.bicyclenumber} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 flex flex-col">
            {/* Card Header Image */}
            <div className="h-44 relative bg-slate-100 border-b border-slate-200 overflow-hidden flex items-center justify-center">
              {b.image ? (
                <img 
                  src={b.image} 
                  alt={b.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                  <Bike size={48} className="text-slate-400" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className="px-2.5 py-0.5 bg-slate-900/80 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {b.type}
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-slate-800 leading-snug">{b.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    b.isAvailable ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {b.isAvailable ? "Available" : "Rented"}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 mb-3">ID: #{b.bicyclenumber}</p>
                
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-lg text-center border border-slate-100 mb-4">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase">Hour</span>
                    <span className="text-xs font-bold text-slate-700">LKR {b.pricePerHour}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase">Day</span>
                    <span className="text-xs font-bold text-slate-700">LKR {b.pricePerDay}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase">Week</span>
                    <span className="text-xs font-bold text-slate-700">LKR {b.pricePerWeek}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 border-t border-slate-100 pt-3">
                <button
                  onClick={() => {
                    setEdit(b);
                    setShow(true);
                  }}
                  className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-3 py-1.5 rounded text-xs transition-colors"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => del(b.bicyclenumber)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded text-xs transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
