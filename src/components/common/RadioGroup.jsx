import React from 'react';

export default function RadioGroup({ label, name, options, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-6 py-2 px-1">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}