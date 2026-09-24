import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Edit2, 
  Trash2, 
  RefreshCw, 
  Users, 
  X, 
  UserCheck, 
  AlertCircle 
} from 'lucide-react';
import ConfirmDeleteModal from '../Components/ConfirmDeleteModal'; // Adjust path if needed

export default function AddStudentsPage() {
  // Sample Data State
  const [students, setStudents] = useState([
    { id: 101, name: 'Ali Khan', fatherName: 'Tariq Khan', gender: 'Male', studentClass: '10', concession: 0, remarks: 'Active' },
    { id: 102, name: 'Ayesha Ahmed', fatherName: 'Zubair Ahmed', gender: 'Female', studentClass: '9', concession: 10, remarks: 'Sibling discount' },
    { id: 103, name: 'Bilal Hussain', fatherName: 'Sajjad Hussain', gender: 'Male', studentClass: '1', concession: 0, remarks: '' },
    { id: 104, name: 'Fatima Malik', fatherName: 'Imran Malik', gender: 'Female', studentClass: '5', concession: 20, remarks: 'Scholarship' },
  ]);

  // Modal Visibility State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Inputs State
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [gender, setGender] = useState('Male');
  const [selectedClass, setSelectedClass] = useState('1');
  const [concession, setConcession] = useState('0');
  const [remarks, setRemarks] = useState('');

  // Inline Validation Errors State
  const [errors, setErrors] = useState({});

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const classOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  // Open Modal for Add Student
  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open Modal for Edit Student
  const handleOpenEditModal = (student) => {
    setEditingId(student.id);
    setStudentName(student.name);
    setFatherName(student.fatherName);
    setGender(student.gender);
    setSelectedClass(student.studentClass);
    setConcession(student.concession.toString());
    setRemarks(student.remarks || '');
    setErrors({});
    setIsModalOpen(true);
  };

  // Reset Form
  const resetForm = () => {
    setStudentName('');
    setFatherName('');
    setGender('Male');
    setSelectedClass('1');
    setConcession('0');
    setRemarks('');
    setEditingId(null);
    setErrors({});
  };

  // Inline Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!studentName.trim()) {
      newErrors.studentName = 'Student name is required.';
    } else if (studentName.trim().length < 2) {
      newErrors.studentName = 'Name must be at least 2 characters long.';
    }

    if (!fatherName.trim()) {
      newErrors.fatherName = 'Father name is required.';
    }

    if (concession === '' || isNaN(concession)) {
      newErrors.concession = 'Concession % is required.';
    } else if (Number(concession) < 0 || Number(concession) > 100) {
      newErrors.concession = 'Concession must be between 0% and 100%.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmitStudent = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingId) {
      setStudents(
        students.map((st) =>
          st.id === editingId
            ? {
                ...st,
                name: studentName.trim(),
                fatherName: fatherName.trim(),
                gender,
                studentClass: selectedClass,
                concession: Number(concession),
                remarks: remarks.trim(),
              }
            : st
        )
      );
    } else {
      const newStudent = {
        id: Date.now(),
        name: studentName.trim(),
        fatherName: fatherName.trim(),
        gender,
        studentClass: selectedClass,
        concession: Number(concession),
        remarks: remarks.trim(),
      };
      setStudents([newStudent, ...students]);
    }

    resetForm();
    setIsModalOpen(false);
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!studentToDelete) return;
    setIsDeleting(true);

    setTimeout(() => {
      setStudents(students.filter((st) => st.id !== studentToDelete.id));
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }, 400);
  };

  // Search Filter
  const filteredStudents = students.filter(
    (st) =>
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.studentClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.id.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Student Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Register new students, update profiles, and search active records
          </p>
        </div>

        {/* Trigger Modal Button */}
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Search Students Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Search Students
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, father name, class, or ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
            />
          </div>
          <button
            onClick={() => setSearchTerm('')}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Show All</span>
          </button>
        </div>
      </div>

      {/* Existing Students Data Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Student Records
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredStudents.length} of {students.length}
          </span>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-left text-sm text-slate-700 border-collapse">
              <thead className="bg-slate-100 text-slate-700 uppercase text-xs font-bold sticky top-0 border-b border-slate-200 z-10">
                <tr>
                  <th className="py-3 px-4 border-r border-slate-200">ID</th>
                  <th className="py-3 px-4 border-r border-slate-200">Student Name</th>
                  <th className="py-3 px-4 border-r border-slate-200">Father Name</th>
                  <th className="py-3 px-4 border-r border-slate-200">Gender</th>
                  <th className="py-3 px-4 border-r border-slate-200">Class</th>
                  <th className="py-3 px-4 border-r border-slate-200">Concession</th>
                  <th className="py-3 px-4 border-r border-slate-200">Remarks</th>
                  <th className="py-3 px-4 text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-500 border-r border-slate-100">
                        {st.id}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900 border-r border-slate-100">
                        {st.name}
                      </td>
                      <td className="py-2.5 px-4 text-slate-700 border-r border-slate-100">
                        {st.fatherName}
                      </td>
                      <td className="py-2.5 px-4 text-xs border-r border-slate-100">
                        <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                          st.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                        }`}>
                          {st.gender}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-800 border-r border-slate-100">
                        Class {st.studentClass}
                      </td>
                      <td className="py-2.5 px-4 text-slate-700 border-r border-slate-100">
                        {st.concession}%
                      </td>
                      <td className="py-2.5 px-4 text-xs text-slate-500 border-r border-slate-100">
                        {st.remarks || '—'}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(st)}
                            title="Edit Student"
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(st)}
                            title="Delete Student"
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-slate-400 text-sm">
                      No student records found matching "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= STUDENT POPUP MODAL WITH INLINE VALIDATION ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  {editingId ? <UserCheck className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {editingId ? 'Edit Student Details' : 'Add New Student'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Student Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Student Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      if (errors.studentName) setErrors({ ...errors, studentName: null });
                    }}
                    placeholder="e.g. Ali Khan"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border outline-none text-sm transition-all ${
                      errors.studentName
                        ? 'border-rose-400 ring-2 ring-rose-500/20 bg-rose-50/30'
                        : 'border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                  />
                  {errors.studentName && (
                    <div className="flex items-center gap-1 mt-1 text-rose-500 text-xs">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.studentName}</span>
                    </div>
                  )}
                </div>

                {/* Father Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Father Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => {
                      setFatherName(e.target.value);
                      if (errors.fatherName) setErrors({ ...errors, fatherName: null });
                    }}
                    placeholder="e.g. Tariq Khan"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border outline-none text-sm transition-all ${
                      errors.fatherName
                        ? 'border-rose-400 ring-2 ring-rose-500/20 bg-rose-50/30'
                        : 'border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                  />
                  {errors.fatherName && (
                    <div className="flex items-center gap-1 mt-1 text-rose-500 text-xs">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.fatherName}</span>
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Class */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Class
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
                  >
                    {classOptions.map((c) => (
                      <option key={c} value={c}>
                        Class {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Concession % */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Concession (%)
                  </label>
                  <input
                    type="number"
                    value={concession}
                    onChange={(e) => {
                      setConcession(e.target.value);
                      if (errors.concession) setErrors({ ...errors, concession: null });
                    }}
                    placeholder="0"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border outline-none text-sm transition-all ${
                      errors.concession
                        ? 'border-rose-400 ring-2 ring-rose-500/20 bg-rose-50/30'
                        : 'border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                  />
                  {errors.concession && (
                    <div className="flex items-center gap-1 mt-1 text-rose-500 text-xs">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.concession}</span>
                    </div>
                  )}
                </div>

                {/* Remarks */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Remarks
                  </label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Optional notes..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
                >
                  {editingId ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  <span>{editingId ? 'Update Student' : 'Save Student'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Student Record"
        message="Are you sure you want to delete this student profile? All associated records will be removed."
        itemName={studentToDelete ? `${studentToDelete.name} (Father: ${studentToDelete.fatherName})` : ''}
        isLoading={isDeleting}
      />
    </div>
  );
}