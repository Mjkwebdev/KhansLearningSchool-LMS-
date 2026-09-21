import React from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Record',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  itemName,
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Header Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content Body */}
        <div className="p-6 text-center space-y-4">
          {/* Warning Icon Badge */}
          <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
            <AlertTriangle className="h-6 w-6" />
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {message}
            </p>
            {itemName && (
              <p className="text-xs font-semibold text-rose-600 bg-rose-50/60 py-1.5 px-3 rounded-lg border border-rose-100 inline-block mt-2">
                "{itemName}"
              </p>
            )}
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-end gap-3 p-4 bg-slate-50 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-rose-600/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Permanently</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}