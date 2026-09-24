import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, UserPlus, Eye, Edit3, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';
import GenericTable from '../../components/common/GenericTable';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';
import StudentModal from '../../components/Admin/StudentModal';

const initialStudents = [
  { id: 1, name: 'Ayesha Abbasi', email: 'stu20260007@student.khanslearning.edu.pk', class: '1-A', rollNo: '1', attendance: 92, feeStatus: 'pending', initials: 'AA' },
  { id: 2, name: 'Aditi Sharma', email: 'stu20260015@student.khanslearning.edu.pk', class: '1-B', rollNo: '1', attendance: 88, feeStatus: 'pending', initials: 'AS' },
  { id: 3, name: 'Iqra Saifi', email: 'stu20260016@student.khanslearning.edu.pk', class: '1-B', rollNo: '2', attendance: 92, feeStatus: 'pending', initials: 'IS' },
  { id: 4, name: 'Anas Kashyap', email: 'stu20260008@student.khanslearning.edu.pk', class: '1-A', rollNo: '2', attendance: 88, feeStatus: 'pending', initials: 'AK' },
  { id: 5, name: 'Kabir Jain', email: 'stu20260009@student.khanslearning.edu.pk', class: '1-A', rollNo: '3', attendance: 88, feeStatus: 'pending', initials: 'KJ' },
  { id: 6, name: 'Sanya Farooqui', email: 'stu20260017@student.khanslearning.edu.pk', class: '1-B', rollNo: '3', attendance: 92, feeStatus: 'paid', initials: 'SF' },
];

export default function StudentsPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  // Modal States
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Filter logic
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNo.includes(searchTerm);
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
    const matchesStatus = selectedStatus === 'All Status' || student.feeStatus === selectedStatus.toLowerCase();
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleSaveStudent = (formData) => {
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    if (studentToEdit) {
      setStudents(students.map(s => s.id === studentToEdit.id ? { ...formData, id: s.id, initials } : s));
    } else {
      const newStudent = { ...formData, id: Date.now(), initials };
      setStudents([newStudent, ...students]);
    }
    setStudentToEdit(null);
  };

  const handleDeleteConfirm = () => {
    if (studentToDelete) {
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      setDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  // Table Columns Definition
  const columns = [
    {
      header: 'Student',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
            {row.initials}
          </div>
          <div>
            <p className="font-bold text-slate-900">{row.name}</p>
            <p className="text-[10px] text-slate-400">{row.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Class', accessor: 'class' },
    { header: 'Roll No.', accessor: 'rollNo' },
    {
      header: 'Attendance',
      render: (row) => (
        <div className="flex items-center gap-3 w-36">
          <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-purple-600 h-full rounded-full" 
              style={{ width: `${row.attendance}%` }}
            />
          </div>
          <span className="font-bold text-slate-700 text-xs">{row.attendance}%</span>
        </div>
      )
    },
    {
      header: 'Fee Status',
      render: (row) => (
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
          row.feeStatus === 'paid' 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60' 
            : 'bg-amber-50 text-amber-600 border border-amber-200/60'
        }`}>
          {row.feeStatus}
        </span>
      )
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          {/* View Button - Redirects to Student Detail page with student ID/data */}
          <button 
            title="View Profile"
onClick={() => navigate(`/admin/students/${row.id}`, { state: { student: row } })}
            className="p-2 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          {/* Edit Button */}
          <button 
            title="Edit Student" 
            onClick={() => {
              setStudentToEdit(row);
              setStudentModalOpen(true);
            }}
            className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button 
            title="Delete Student" 
            onClick={() => {
              setStudentToDelete(row);
              setDeleteModalOpen(true);
            }}
            className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Students</h1>
          <p className="text-xs text-slate-400 mt-0.5">{filteredStudents.length} total students enrolled.</p>
        </div>
        <Button 
          variant="primary" 
          icon={UserPlus} 
          onClick={() => {
            setStudentToEdit(null);
            setStudentModalOpen(true);
          }}
        >
          Add Student
        </Button>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>

        <div className="relative w-full sm:w-44">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option>All Classes</option>
            <option>1-A</option>
            <option>1-B</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative w-full sm:w-44">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Paid</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Render Table Component */}
      <GenericTable columns={columns} data={filteredStudents} keyField="id" />

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={studentModalOpen}
        onClose={() => setStudentModalOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student Record"
        message={`Are you sure you want to delete ${studentToDelete?.name}? This action cannot be undone.`}
      />

    </div>
  );
}