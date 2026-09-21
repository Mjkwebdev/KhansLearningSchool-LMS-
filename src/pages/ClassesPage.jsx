import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, BookPlus } from 'lucide-react';
import ConfirmDeleteModal from '../Components/ConfirmDeleteModal'; // Adjust path according to your project structure

export default function ClassesPage() {
  // Sample Data State
  const [classes, setClasses] = useState([
    { id: 5, className: '1', monthlyFee: 3500.0, remarks: 'Primary Section' },
    { id: 14, className: '10', monthlyFee: 5000.0, remarks: 'Matric Science' },
    { id: 6, className: '2', monthlyFee: 3500.0, remarks: '' },
    { id: 7, className: '3', monthlyFee: 3500.0, remarks: '' },
    { id: 8, className: '4', monthlyFee: 3500.0, remarks: '' },
    { id: 9, className: '5', monthlyFee: 3500.0, remarks: 'Primary Final' },
    { id: 10, className: '6', monthlyFee: 3500.0, remarks: 'Middle Section' },
    { id: 11, className: '7', monthlyFee: 3500.0, remarks: '' },
    { id: 12, className: '8', monthlyFee: 3500.0, remarks: '' },
    { id: 13, className: '9', monthlyFee: 5000.0, remarks: 'Matric Science' },
  ]);

  // Add/Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Inputs State
  const [classNameInput, setClassNameInput] = useState('');
  const [monthlyFeeInput, setMonthlyFeeInput] = useState('');
  const [remarksInput, setRemarksInput] = useState('');

  // Delete Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Open Modal for Creating a New Class
  const handleOpenAddModal = () => {
    setEditingId(null);
    setClassNameInput('');
    setMonthlyFeeInput('');
    setRemarksInput('');
    setIsModalOpen(true);
  };

  // Open Modal for Editing an Existing Class
  const handleEditClick = (cls) => {
    setEditingId(cls.id);
    setClassNameInput(cls.className);
    setMonthlyFeeInput(cls.monthlyFee);
    setRemarksInput(cls.remarks || '');
    setIsModalOpen(true);
  };

  // Trigger Delete Modal
  const handleOpenDeleteModal = (cls) => {
    setItemToDelete(cls);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete Handler with simulated API delay
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    setIsDeleting(true);

    setTimeout(() => {
      setClasses(classes.filter((cls) => cls.id !== itemToDelete.id));
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }, 400);
  };

  // Handle Form Submission (Both Add and Edit)
  const handleSubmitClass = (e) => {
    e.preventDefault();
    if (!classNameInput || !monthlyFeeInput) return;

    if (editingId) {
      // Update Existing Class
      setClasses(
        classes.map((cls) =>
          cls.id === editingId
            ? {
                ...cls,
                className: classNameInput,
                monthlyFee: parseFloat(monthlyFeeInput),
                remarks: remarksInput,
              }
            : cls
        )
      );
    } else {
      // Add New Class
      const newClass = {
        id: Date.now(),
        className: classNameInput,
        monthlyFee: parseFloat(monthlyFeeInput),
        remarks: remarksInput,
      };
      setClasses([...classes, newClass]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Class Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage active school grades, monthly fees, and section details
          </p>
        </div>

        {/* Trigger Button for Add Modal */}
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Class</span>
        </button>
      </div>

      {/* Existing Classes Table Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Existing Classes
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Total Classes: {classes.length}
          </span>
        </div>

        {/* Table View */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-left text-sm text-slate-700 border-collapse">
              <thead className="bg-slate-100 text-slate-700 uppercase text-xs font-bold sticky top-0 border-b border-slate-200 z-10">
                <tr>
                  <th className="py-3 px-4 border-r border-slate-200">ID</th>
                  <th className="py-3 px-4 border-r border-slate-200">Class Name</th>
                  <th className="py-3 px-4 border-r border-slate-200">Monthly Fee</th>
                  <th className="py-3 px-4 border-r border-slate-200">Remarks</th>
                  <th className="py-3 px-4 text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classes.map((cls) => (
                  <tr key={cls.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-mono text-xs text-slate-500 border-r border-slate-100">
                      {cls.id}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 border-r border-slate-100">
                      Class {cls.className}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800 border-r border-slate-100">
                      {cls.monthlyFee.toFixed(1)} PKR
                    </td>
                    <td className="py-2.5 px-4 text-xs text-slate-500 border-r border-slate-100">
                      {cls.remarks || '—'}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(cls)}
                          title="Edit Class"
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(cls)}
                          title="Delete Class"
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= ADD / EDIT CLASS POPUP MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <BookPlus className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {editingId ? 'Edit Class Details' : 'Add New Class'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitClass} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Class Name
                  </label>
                  <input
                    type="text"
                    required
                    value={classNameInput}
                    onChange={(e) => setClassNameInput(e.target.value)}
                    placeholder="e.g. 1, 2, 10"
                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Monthly Fee (PKR)
                  </label>
                  <input
                    type="number"
                    required
                    value={monthlyFeeInput}
                    onChange={(e) => setMonthlyFeeInput(e.target.value)}
                    placeholder="e.g. 3500"
                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Remarks
                </label>
                <input
                  type="text"
                  value={remarksInput}
                  onChange={(e) => setRemarksInput(e.target.value)}
                  placeholder="Optional section notes..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all"
                >
                  {editingId ? 'Update Class' : 'Save Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CONFIRM DELETE MODAL ================= */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Class Record"
        message="Are you sure you want to delete this class? This will permanently remove its fee structure and settings."
        itemName={itemToDelete ? `Class ${itemToDelete.className}` : ''}
        isLoading={isDeleting}
      />
    </div>
  );
}