import React from 'react';

export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl">
      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
          checked ? 'bg-purple-600' : 'bg-slate-300'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}