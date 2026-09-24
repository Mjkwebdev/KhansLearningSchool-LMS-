import React from 'react';

export default function GenericTable({ columns, data, keyField = 'id' }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-slate-50/50">
              {columns.map((col, index) => (
                <th key={index} className="py-4 px-6">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row[keyField]} className="hover:bg-purple-50/20 transition-colors group">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-4 px-6 text-slate-700 font-medium">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-slate-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}