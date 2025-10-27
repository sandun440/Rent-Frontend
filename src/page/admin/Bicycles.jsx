// Modified Bicycles.jsx
import { useEffect, useState } from 'react';
import BicycleForm from '../../components/BicycleForm';
import { toast } from 'react-toastify';

const API_BASE = '/api';

export default function Bicycles() {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);

  const load = async () => {
    try {
      const res = await fetch(`${API_BASE}/bicycles`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error('Error fetching bicycles:', error);
      toast.error('Failed to fetch bicycles');
    }
  };

  useEffect(() => { load(); }, []);

  const save = async (payload) => {
    try {
      let res;
      if (edit) {
        res = await fetch(`${API_BASE}/bicycles/${payload.bicyclenumber}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/bicycles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success(edit ? 'Updated' : 'Added');
      setShow(false); setEdit(null); load();
    } catch (error) {
      console.error('Error saving bicycle:', error);
      toast.error(error.message || 'Error');
    }
  };

  const del = async (num) => {
    if (!window.confirm('Delete?')) return;
    try {
      const res = await fetch(`${API_BASE}/bicycles/${num}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success('Deleted'); load();
    } catch (error) {
      console.error('Error deleting bicycle:', error);
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Bicycles</h1>
        <button onClick={() => { setEdit(null); setShow(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{edit ? 'Edit' : 'Add'} Bicycle</h2>
            <BicycleForm bicycle={edit} onSubmit={save} onCancel={() => { setShow(false); setEdit(null); }} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(b => (
          <div key={b.bicyclenumber} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{b.name}</h3>
            <p className="text-sm text-gray-600">#{b.bicyclenumber}</p>
            <p className="text-sm">Type: {b.type}</p>
            <p className="text-sm">Status: <span className={b.isAvailable ? 'text-green-600' : 'text-red-600'}>
              {b.isAvailable ? 'Available' : 'Rented'}
            </span></p>
            <div className="mt-2 text-sm">
              <p>Hour: LKR {b.pricePerHour}</p>
              <p>Day: LKR {b.pricePerDay}</p>
              <p>Week: LKR {b.pricePerWeek}</p>
            </div>
            <div className="mt-3 flex space-x-2">
              <button onClick={() => { setEdit(b); setShow(true); }} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Edit</button>
              <button onClick={() => del(b.bicyclenumber)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}