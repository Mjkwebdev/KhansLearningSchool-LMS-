import React, { useState, useEffect } from 'react';
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
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle smooth opening and closing transition lifecycle
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsRendered(false), 300); // Wait for transition to complete before unmounting
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      isAnimating ? 'bg-slate-950/70 backdrop-blur-xs opacity-100' : 'bg-slate-950/0 backdrop-blur-none opacity-0'
    }`}>
      {/* Modal Container */}
      <div 
        className={`bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Header Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content Body */}
        <div className="p-6 text-center space-y-4">
          {/* Warning Icon Badge */}
          <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-sm">
            <AlertTriangle className="h-6 w-6" />
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {message}
            </p>
            {itemName && (
              <p className="text-xs font-semibold text-rose-600 bg-rose-50/60 py-1.5 px-3 rounded-xl border border-rose-100 inline-block mt-2">
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
            className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 transition-all disabled:opacity-50 cursor-pointer shadow-xs"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-rose-600/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
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