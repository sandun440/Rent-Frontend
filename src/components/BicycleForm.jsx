import { useState } from 'react';

const PRESETS = [
  { name: 'Mountain', url: '/images/mountain_bike_preset.png' },
  { name: 'Road', url: '/images/road_bike_preset.png' },
  { name: 'Hybrid', url: '/images/hybrid_bike_preset.png' },
];

export default function BicycleForm({ bicycle, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    bicyclenumber: bicycle?.bicyclenumber || '',
    name: bicycle?.name || '',
    type: bicycle?.type || 'Mountain',
    pricePerHour: bicycle?.pricePerHour || '',
    pricePerDay: bicycle?.pricePerDay || '',
    pricePerWeek: bicycle?.pricePerWeek || '',
    image: bicycle?.image || '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (url) => {
    setForm({ ...form, image: url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
      <input 
        name="bicyclenumber" 
        value={form.bicyclenumber} 
        onChange={handleChange} 
        placeholder="Bicycle Number" 
        className="w-full p-2 border rounded bg-white text-gray-800" 
        required 
        disabled={!!bicycle}
      />
      <input 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        placeholder="Name" 
        className="w-full p-2 border rounded bg-white text-gray-800" 
        required 
      />
      <select 
        name="type" 
        value={form.type} 
        onChange={handleChange} 
        className="w-full p-2 border rounded bg-white text-gray-800"
      >
        <option>Mountain</option>
        <option>Road</option>
        <option>Other</option>
      </select>
      
      {/* Dynamic Image Section */}
      <div className="border border-slate-200 rounded-lg p-3 space-y-3 bg-slate-50">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Bicycle Photo</label>
        
        {/* Live Preview */}
        {form.image && (
          <div className="relative h-32 rounded-lg overflow-hidden border border-slate-300 shadow bg-slate-200 flex items-center justify-center">
            <img 
              src={form.image} 
              alt="Bicycle Preview" 
              className="w-full h-full object-cover" 
            />
            <button
              type="button"
              onClick={() => setForm({ ...form, image: '' })}
              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 text-xs px-2 font-bold shadow transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        {/* Preset Presets */}
        <div className="space-y-1.5">
          <span className="block text-xs text-slate-500 font-medium">Select a beautiful preset:</span>
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handlePresetSelect(p.url)}
                className={`group relative h-16 rounded overflow-hidden border-2 transition-all ${
                  form.image === p.url ? 'border-indigo-600 scale-95 shadow-md' : 'border-transparent hover:border-slate-300'
                }`}
              >
                <img src={p.url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold py-0.5 text-center">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Upload or URL */}
        <div className="space-y-2 pt-1 border-t border-slate-200">
          <div>
            <label className="block text-[11px] text-slate-500 font-medium mb-1">Or upload photo:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-500 font-medium mb-1">Or paste image URL:</label>
            <input 
              name="image" 
              value={form.image.startsWith('data:') ? '' : form.image} 
              onChange={handleChange} 
              placeholder="https://example.com/bike.jpg" 
              className="w-full p-1.5 text-xs border rounded bg-white text-gray-800" 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">PRICE/HR</label>
          <input name="pricePerHour" type="number" value={form.pricePerHour} onChange={handleChange} placeholder="LKR" className="w-full p-2 border rounded bg-white text-gray-800" required />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">PRICE/DAY</label>
          <input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} placeholder="LKR" className="w-full p-2 border rounded bg-white text-gray-800" required />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">PRICE/WK</label>
          <input name="pricePerWeek" type="number" value={form.pricePerWeek} onChange={handleChange} placeholder="LKR" className="w-full p-2 border rounded bg-white text-gray-800" required />
        </div>
      </div>

      <div className="flex space-x-2 pt-2">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-semibold flex-1 transition-colors">
          {bicycle ? 'Update' : 'Add'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-semibold transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}