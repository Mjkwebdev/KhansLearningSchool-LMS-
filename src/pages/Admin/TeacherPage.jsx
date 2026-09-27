import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  Eye, 
  Edit, 
  Trash2, 
  UserX, 
  UserCheck, 
  X, 
  AlertCircle, 
  Mail, 
  Phone, 
  Briefcase, 
  Hash, 
  BookOpen, 
  ShieldCheck,
  Filter
} from 'lucide-react';

const INITIAL_TEACHERS = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    email: 'sarah.ahmed@khanslearning.edu.pk',
    phone: '+92 300 1234567',
    employeeId: 'EMP-1042',
    department: 'Mathematics',
    subjects: ['Calculus', 'Algebra (1-A)'],
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    joinedDate: '2021-08-15',
    qualification: 'Ph.D. in Applied Mathematics'
  },
  {
    id: '2',
    name: 'Prof. Muhammad Tariq',
    email: 'm.tariq@khanslearning.edu.pk',
    phone: '+92 321 9876543',
    employeeId: 'EMP-1088',
    department: 'Physics',
    subjects: ['Physics 101', 'Mechanics (1-B)'],
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
    joinedDate: '2019-03-10',
    qualification: 'M.Sc. Physics'
  },
  {
    id: '3',
    name: 'Ayesha Khan',
    email: 'ayesha.khan@khanslearning.edu.pk',
    phone: '+92 333 4567890',
    employeeId: 'EMP-1102',
    department: 'Computer Science',
    subjects: ['Web Dev', 'Python (1-A, 1-B)'],
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    joinedDate: '2022-01-20',
    qualification: 'BS Computer Science'
  },
  {
    id: '4',
    name: 'Zubair Raza',
    email: 'zubair.raza@khanslearning.edu.pk',
    phone: '+92 312 3456789',
    employeeId: 'EMP-1055',
    department: 'Chemistry',
    subjects: ['Organic Chem', 'Lab 2'],
    status: 'Active',
    avatar: '',
    joinedDate: '2020-09-01',
    qualification: 'M.Phil. Chemistry'
  },
  {
    id: '5',
    name: 'Fatima Hassan',
    email: 'fatima.hassan@khanslearning.edu.pk',
    phone: '+92 305 6789012',
    employeeId: 'EMP-0982',
    department: 'English Literature',
    subjects: ['English Lit (1-A)'],
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    joinedDate: '2018-05-12',
    qualification: 'M.A. English Literature'
  },
  {
    id: '6',
    name: 'Bilal Chaudhry',
    email: 'bilal.c@khanslearning.edu.pk',
    phone: '+92 345 8901234',
    employeeId: 'EMP-0899',
    department: 'Biology',
    subjects: ['Botany', 'Genetics'],
    status: 'Inactive',
    avatar: '',
    joinedDate: '2017-11-03',
    qualification: 'M.Sc. Biotechnology'
  }
];

const DEPARTMENTS = [
  'All Departments',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Computer Science',
  'English Literature',
  'Biology'
];

export default function TeacherPage() {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'deactivated'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  // Modal States
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [viewingTeacher, setViewingTeacher] = useState(null);
  const [deletingTeacher, setDeletingTeacher] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    department: 'Mathematics',
    subjects: '',
    status: 'Active',
    avatar: '',
    qualification: ''
  });

  // Get Initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'T';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      // Tab filter
      const isTeacherActive = teacher.status === 'Active';
      if (activeTab === 'active' && !isTeacherActive) return false;
      if (activeTab === 'deactivated' && isTeacherActive) return false;

      // Department filter
      if (selectedDept !== 'All Departments' && teacher.department !== selectedDept) {
        return false;
      }

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      return (
        teacher.name.toLowerCase().includes(q) ||
        teacher.email.toLowerCase().includes(q) ||
        teacher.employeeId.toLowerCase().includes(q) ||
        teacher.phone.toLowerCase().includes(q) ||
        teacher.department.toLowerCase().includes(q)
      );
    });
  }, [teachers, activeTab, searchQuery, selectedDept]);

  // Tab counts
  const activeCount = teachers.filter((t) => t.status === 'Active').length;
  const deactivatedCount = teachers.filter((t) => t.status !== 'Active').length;

  const handleToggleStatus = (id) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newStatus = t.status === 'Active' ? 'Inactive' : 'Active';
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
  };

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      department: 'Mathematics',
      subjects: '',
      status: 'Active',
      avatar: '',
      qualification: 'B.Ed / M.Sc'
    });
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      employeeId: teacher.employeeId,
      department: teacher.department,
      subjects: Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : teacher.subjects,
      status: teacher.status,
      avatar: teacher.avatar || '',
      qualification: teacher.qualification || ''
    });
    setIsAddEditOpen(true);
  };

  const handleSaveTeacher = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const subjectsArray = formData.subjects
      ? formData.subjects.split(',').map((s) => s.trim())
      : ['General'];

    if (editingTeacher) {
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === editingTeacher.id
            ? {
                ...t,
                ...formData,
                subjects: subjectsArray
              }
            : t
        )
      );
    } else {
      const newTeacher = {
        id: Date.now().toString(),
        ...formData,
        subjects: subjectsArray,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setTeachers((prev) => [newTeacher, ...prev]);
    }

    setIsAddEditOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!deletingTeacher) return;
    setTeachers((prev) => prev.filter((t) => t.id !== deletingTeacher.id));
    setDeletingTeacher(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-20 px-6 py-3 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search students, classes, teachers..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-800 font-semibold text-xs flex items-center justify-center border border-purple-300 shadow-sm">
              SA
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6">
        
        {/* Page Title & Add Button Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Teachers</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {teachers.length} total faculty members registered in system.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-full shadow-lg shadow-purple-600/25 hover:shadow-purple-600/35 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Teacher</span>
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-slate-200">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === 'active'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Active Faculty</span>
              <span
                className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === 'active'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {activeCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('deactivated')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === 'deactivated'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <UserX className="w-4 h-4" />
              <span>Deactivated Bar</span>
              <span
                className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === 'deactivated'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {deactivatedCount}
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, phone, or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 appearance-none cursor-pointer transition-all"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Teacher</th>
                  <th className="py-3.5 px-4">Employee ID</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">Department & Subjects</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => {
                    const isActive = teacher.status === 'Active';
                    return (
                      <tr
                        key={teacher.id}
                        className="hover:bg-slate-50/60 transition-colors group"
                      >
                        {/* Avatar + Name + Email */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3.5">
                            {teacher.avatar ? (
                              <img
                                src={teacher.avatar}
                                alt={teacher.name}
                                className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center border border-purple-200 shadow-sm">
                                {getInitials(teacher.name)}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">
                                {teacher.name}
                              </div>
                              <div className="text-xs text-slate-400 font-normal mt-0.5">
                                {teacher.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Employee ID */}
                        <td className="py-4 px-4 font-mono text-xs font-semibold text-slate-600">
                          {teacher.employeeId}
                        </td>

                        {/* Phone Number */}
                        <td className="py-4 px-4 text-slate-600 text-xs font-medium">
                          {teacher.phone}
                        </td>

                        {/* Department & Subjects */}
                        <td className="py-4 px-4">
                          <div className="text-slate-800 font-medium text-xs">
                            {teacher.department}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex flex-wrap gap-1">
                            {Array.isArray(teacher.subjects)
                              ? teacher.subjects.join(', ')
                              : teacher.subjects}
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                              isActive
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? 'bg-emerald-500' : 'bg-slate-400'
                              }`}
                            ></span>
                            {isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </td>

                        {/* Actions Icons */}
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center justify-end gap-1">
                            <button
                              onClick={() => setViewingTeacher(teacher)}
                              title="View Details"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleOpenEdit(teacher)}
                              title="Edit Teacher"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleToggleStatus(teacher.id)}
                              title={isActive ? 'Deactivate (Move to Deactivated Bar)' : 'Activate Teacher'}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isActive
                                  ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                                  : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
                              }`}
                            >
                              {isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                            </button>

                            <button
                              onClick={() => setDeletingTeacher(teacher)}
                              title="Delete Teacher"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                    
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="max-w-xs mx-auto text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                          <UserX className="w-6 h-6" />
                        </div>
                        <p className="text-slate-600 font-medium">No teachers found</p>
                        <p className="text-xs text-slate-400">
                          {activeTab === 'deactivated'
                            ? 'No teachers currently in the deactivated bar.'
                            : 'Try adjusting your search query or filter.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isAddEditOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">
                {editingTeacher ? 'Edit Teacher Record' : 'Add New Teacher'}
              </h3>
              <button
                onClick={() => setIsAddEditOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Sarah Ahmed"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Institute Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@khanslearning.edu.pk"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                  >
                    {DEPARTMENTS.filter((d) => d !== 'All Departments').map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Assigned Subjects (Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  placeholder="Calculus, Algebra (1-A)"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                />
              </div>

{/* NEW QUALIFICATION FIELD */}
        <div>
          <label className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1">
            Qualification
          </label>
          <input
            type="text"
            value={formData.qualification}
            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
            placeholder="e.g. B.Ed / M.Sc"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
          />
        </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Picture URL (Optional)
                  </label>
                  <div>
  <label className="block text-xs font-semibold text-slate-600 mb-1">
    Profile Picture
  </label>
  <div className="flex items-center gap-3 mb-2">
    {/* Avatar Preview */}
    <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center border border-purple-200 shrink-0">
      {formData.avatar ? (
        <img
          src={formData.avatar}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-purple-600 font-bold text-sm">
          {formData.fullName ? formData.fullName.charAt(0) : 'T'}
        </span>
      )}
    </div>

    {/* File Upload Button */}
    <label className="cursor-pointer px-3 py-2 bg-purple-50 text-purple-700 text-xs font-semibold rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors">
      <span>Upload File</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData({ ...formData, avatar: previewUrl });
          }
        }}
      />
    </label>
  </div>

  {/* Image URL Input */}
  <input
    type="url"
    value={formData.avatar}
    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
    placeholder="Or paste image URL (https://...)"
    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
  />
</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive (Deactivated)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddEditOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                >
                  {editingTeacher ? 'Update Teacher' : 'Save Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-24 p-4 flex justify-end">
              <button
                onClick={() => setViewingTeacher(null)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 pb-6 pt-0 relative">
              <div className="flex justify-between items-end -mt-10 mb-4">
                {viewingTeacher.avatar ? (
                  <img
                    src={viewingTeacher.avatar}
                    alt={viewingTeacher.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md bg-white"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-lg flex items-center justify-center ring-4 ring-white shadow-md">
                    {getInitials(viewingTeacher.name)}
                  </div>
                )}

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    viewingTeacher.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {viewingTeacher.status.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">{viewingTeacher.name}</h3>
                <p className="text-sm text-purple-600 font-medium">{viewingTeacher.department}</p>
              </div>

              <div className="mt-6 space-y-3.5 text-xs">
                <div className="flex items-center gap-3 text-slate-600">
                  <Hash className="w-4 h-4 text-slate-400" />
                  <span>Employee ID: <strong>{viewingTeacher.employeeId}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{viewingTeacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{viewingTeacher.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>
                    Subjects:{' '}
                    <strong>
                      {Array.isArray(viewingTeacher.subjects)
                        ? viewingTeacher.subjects.join(', ')
                        : viewingTeacher.subjects}
                    </strong>
                  </span>
                </div>
                {viewingTeacher.qualification && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>Qualification: {viewingTeacher.qualification}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setViewingTeacher(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletingTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-slate-100 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">Delete Teacher Record?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to permanently delete <strong>{deletingTeacher.name}</strong>?
                This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeletingTeacher(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}