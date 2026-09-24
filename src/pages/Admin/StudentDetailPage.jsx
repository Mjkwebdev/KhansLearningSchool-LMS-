import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  CalendarCheck, 
  BookOpen, 
  FileText, 
  Award, 
  CreditCard, 
  FolderOpen, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Star,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import GenericTable from '../../components/common/GenericTable';
import Button from '../../components/common/Button';

export default function StudentDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  const student = location.state?.student;
  const [activeTab, setActiveTab] = useState('overview');

  const studentData = student || {
    id: id || 1,
    name: 'Aditi Sharma',
    email: 'stu20260015@student.khanslearning.edu.pk',
    class: '1-B',
    rollNo: '1',
    studentId: `STU-2026-00${id || 15}`,
    attendance: 88,
    streak: 14,
    points: 238,
    gender: 'Female',
    bloodGroup: 'A+',
    dob: 'Jan 21, 2020',
    classTeacher: 'Sana Parveen',
    address: '200, Brahmpuri, Meerut, U.P. - 25003',
    parent: {
      name: 'Nikhil Sharma',
      relation: 'Father',
      phone: '+919899929151',
      email: 'parent009.stu20260015@khanslearning.edu.pk'
    },
    initials: 'AS'
  };

  // Tab Data definitions
  const attendanceMonthlyColumns = [
    { header: 'Month', accessor: 'month' },
    { header: 'Present', accessor: 'present' },
    { header: 'Absent', accessor: 'absent' },
    { header: 'Late', accessor: 'late' },
    { header: 'Total', accessor: 'total' },
    { header: 'Rate', accessor: 'rate' },
  ];
  const attendanceMonthlyData = [
    { id: 1, month: 'August 2026', present: 12, absent: 2, late: 0, total: 14, rate: '86%' },
    { id: 2, month: 'July 2026', present: 9, absent: 1, late: 0, total: 10, rate: '90%' },
  ];

  const marksColumns = [
    { header: 'Subject', accessor: 'subject' },
    { header: 'Exam Type', accessor: 'examType' },
    { header: 'Marks', accessor: 'marks' },
    { header: 'Total', accessor: 'total' },
    { header: '%', accessor: 'percentage' },
    { header: 'Grade', accessor: 'grade' },
  ];
  const marksData = [
    { id: 1, subject: 'English', examType: 'Unit-Test', marks: 18, total: 25, percentage: '72%', grade: 'B+' },
    { id: 2, subject: 'English', examType: 'Mid-Term', marks: 54, total: 80, percentage: '68%', grade: 'B' },
    { id: 3, subject: 'Hindi', examType: 'Unit-Test', marks: 15, total: 25, percentage: '60%', grade: 'B' },
    { id: 4, subject: 'Mathematics', examType: 'Unit-Test', marks: 17, total: 25, percentage: '68%', grade: 'B' },
  ];

  const resultsColumns = [
    { header: '#', accessor: 'id' },
    { header: 'Exam / Test', accessor: 'title' },
    { header: 'Subject', accessor: 'subject' },
    { header: 'Type', accessor: 'type' },
    { header: 'Date', accessor: 'date' },
    { header: 'Marks', accessor: 'marks' },
    { header: 'Total', accessor: 'total' },
    { header: '%', accessor: 'percentage' },
    { header: 'Grade', accessor: 'grade' },
    { header: 'Result', render: (row) => <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-[10px]">{row.result}</span> },
    { header: 'Published', accessor: 'published' },
  ];
  const resultsData = [
    { id: 1, title: 'English Class Test 1', subject: 'English', type: 'Unit Test', date: '30 Jul 2026', marks: 13, total: 20, percentage: '65%', grade: 'B', result: 'Pass', published: 'Published' },
    { id: 2, title: 'Hindi Class Test 2', subject: 'Hindi', type: 'Unit Test', date: '11 Aug 2026', marks: 13, total: 20, percentage: '65%', grade: 'B', result: 'Pass', published: 'Published' },
    { id: 3, title: 'Unit Test 1 — Mathematics', subject: 'Mathematics', type: 'Unit Test', date: '08 Jun 2026', marks: 17, total: 25, percentage: '68%', grade: 'B', result: 'Pass', published: 'Published' },
  ];

  const feeHistoryColumns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Paid', accessor: 'paid' },
    { header: 'Date Paid', accessor: 'datePaid' },
    { header: 'Mode', accessor: 'mode' },
    { header: 'Status', render: (row) => <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-[10px]">{row.status}</span> },
  ];
  const feeHistoryData = [
    { id: 1, title: 'Tuition Fee — Quarter 1 (2026-27)', amount: 'PKR 4,500', paid: 'PKR 4,500', datePaid: 'Apr 21, 2026', mode: 'Cash', status: 'Paid' },
    { id: 2, title: 'Tuition Fee — Quarter 2 (2026-27)', amount: 'PKR 4,500', paid: 'PKR 4,500', datePaid: 'Jul 22, 2026', mode: 'DD', status: 'Paid' },
    { id: 3, title: 'Admission & Development Fee (2026-27)', amount: 'PKR 3,200', paid: 'PKR 3,200', datePaid: 'Mar 26, 2026', mode: 'DD', status: 'Paid' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Back Navigation Bar */}
      <div>
        <button 
          onClick={() => navigate('/admin/students')}
          className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2.5 rounded-2xl transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Students
        </button>
      </div>

      {/* Top Student Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center shadow-lg shadow-purple-900/20 flex-shrink-0">
            {studentData?.initials || 'ST'}
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{studentData?.name}</h1>
            <p className="text-xs font-semibold text-slate-500">
              Class {studentData?.class} · Roll #{studentData?.rollNo} · ID: {studentData?.studentId}
            </p>
            <p className="text-xs text-slate-400">{studentData?.email}</p>
            <p className="text-xs text-slate-400">📍 {studentData?.address}</p>
          </div>
        </div>

        {/* Quick Dashboard Header Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-purple-50/80 border border-purple-100/80 px-5 py-3 rounded-2xl text-center shadow-xs">
            <p className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider">Attendance</p>
            <p className="text-lg font-extrabold text-purple-700 mt-0.5">{studentData?.attendance}%</p>
          </div>
          <div className="bg-indigo-50/80 border border-indigo-100/80 px-5 py-3 rounded-2xl text-center shadow-xs">
            <p className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">Points</p>
            <p className="text-lg font-extrabold text-indigo-700 mt-0.5">{studentData?.points}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        {[
          { id: 'overview', label: 'Overview', icon: BookOpen },
          { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
          { id: 'marks', label: 'Marks', icon: FileText },
          { id: 'results', label: 'Results', icon: Award },
          { id: 'fees', label: 'Fee History', icon: CreditCard },
          { id: 'documents', label: 'Documents', icon: FolderOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/20' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Reference Styled Dashboard Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Card 1: Attendance Rate */}
            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center shadow-xs">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-100/60 text-emerald-700 text-[11px] font-extrabold px-3 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" /> +2.4% this mo
                </span>
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Attendance Rate</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{studentData?.attendance}%</h3>
              </div>
            </div>

            {/* Card 2: Streak Days */}
            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center shadow-xs">
                  <Flame className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-100/60 text-emerald-700 text-[11px] font-extrabold px-3 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" /> Active streak
                </span>
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Streak Days</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{studentData?.streak}</h3>
              </div>
            </div>

            {/* Card 3: Points */}
            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shadow-xs">
                  <Star className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 bg-purple-100/70 text-purple-700 text-[11px] font-extrabold px-3 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" /> Top 10%
                </span>
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Points</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{studentData?.points}</h3>
              </div>
            </div>

          </div>

          {/* Student Details Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-extrabold text-slate-900 text-base">Student Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Student ID:</span>
                <span className="font-bold text-slate-800">{studentData?.studentId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Class:</span>
                <span className="font-bold text-slate-800">{studentData?.class}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Roll Number:</span>
                <span className="font-bold text-slate-800">{studentData?.rollNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Gender:</span>
                <span className="font-bold text-slate-800 capitalize">{studentData?.gender}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Blood Group:</span>
                <span className="font-bold text-slate-800">{studentData?.bloodGroup}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Date of Birth:</span>
                <span className="font-bold text-slate-800">{studentData?.dob}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Class Teacher:</span>
                <span className="font-bold text-slate-800">{studentData?.classTeacher}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Address:</span>
                <span className="font-bold text-slate-800 truncate max-w-xs">{studentData?.address}</span>
              </div>
            </div>
          </div>

          {/* Parent / Guardian Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-extrabold text-slate-900 text-base">Parent / Guardian</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Name:</span>
                <span className="font-bold text-slate-800">{studentData?.parent?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Relation:</span>
                <span className="font-bold text-slate-800">{studentData?.parent?.relation}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Phone:</span>
                <span className="font-bold text-slate-800">{studentData?.parent?.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-400">Email:</span>
                <span className="font-bold text-slate-800 truncate max-w-xs">{studentData?.parent?.email}</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Total Days</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">24</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Present</p>
                <h3 className="text-2xl font-extrabold text-emerald-600 mt-0.5">21</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100/80 text-rose-600 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Absent</p>
                <h3 className="text-2xl font-extrabold text-rose-600 mt-0.5">3</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Late</p>
                <h3 className="text-2xl font-extrabold text-amber-600 mt-0.5">0</h3>
              </div>
            </div>
          </div>

          <GenericTable columns={attendanceMonthlyColumns} data={attendanceMonthlyData} keyField="id" />
        </div>
      )}

      {/* TAB 3: MARKS */}
      {activeTab === 'marks' && (
        <div className="space-y-6 animate-fade-in">
          <GenericTable columns={marksColumns} data={marksData} keyField="id" />
        </div>
      )}

      {/* TAB 4: RESULTS */}
      {activeTab === 'results' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Passed</p>
                <h3 className="text-2xl font-extrabold text-emerald-600 mt-0.5">10</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100/80 text-rose-600 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Failed</p>
                <h3 className="text-2xl font-extrabold text-rose-600 mt-0.5">0</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Average</p>
                <h3 className="text-2xl font-extrabold text-purple-600 mt-0.5">66%</h3>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" icon={Download} onClick={() => alert('Downloading results PDF...')}>
              Download PDF
            </Button>
          </div>

          <GenericTable columns={resultsColumns} data={resultsData} keyField="id" />
        </div>
      )}

      {/* TAB 5: FEE HISTORY */}
      {activeTab === 'fees' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Total Paid</p>
                <h3 className="text-2xl font-extrabold text-emerald-600 mt-0.5">PKR 12,200</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Pending</p>
                <h3 className="text-2xl font-extrabold text-amber-600 mt-0.5">PKR 800</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/20 to-white p-6 rounded-3xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Total Fee</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">PKR 13,000</h3>
              </div>
            </div>
          </div>

          <GenericTable columns={feeHistoryColumns} data={feeHistoryData} keyField="id" />
        </div>
      )}

      {/* TAB 6: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mx-auto shadow-inner">
            <FolderOpen className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-base">No documents uploaded yet.</h4>
            <p className="text-xs text-slate-400 mt-0.5">Upload student birth certificate, previous report cards, or ID scans.</p>
          </div>
          <div className="pt-2 flex justify-center">
            <Button variant="primary" onClick={() => alert('Opening file upload dialog...')}>
              Upload Document
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}