import { useState } from 'react';

export default function BicycleForm({ bicycle, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    bicycle || {
      bicyclenumber: '',
      name: '',
      type: 'Mountain',
      pricePerHour: '',
      pricePerDay: '',
      pricePerWeek: '',
    }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="bicyclenumber" value={form.bicyclenumber} onChange={handleChange} placeholder="Bicycle Number" className="w-full p-2 border rounded" required />
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
      <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
        <option>Mountain</option>
        <option>Road</option>
        <option>Other</option>
      </select>
      <input name="pricePerHour" type="number" value={form.pricePerHour} onChange={handleChange} placeholder="Price/Hour" className="w-full p-2 border rounded" required />
      <input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} placeholder="Price/Day" className="w-full p-2 border rounded" required />
      <input name="pricePerWeek" type="number" value={form.pricePerWeek} onChange={handleChange} placeholder="Price/Week" className="w-full p-2 border rounded" required />
      <div className="flex space-x-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {bicycle ? 'Update' : 'Add'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Cancel
        </button>
      </div>
    </form>
  );
}