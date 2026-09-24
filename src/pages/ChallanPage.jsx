import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CreditCard, 
  Receipt, 
  RotateCcw, 
  Printer, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  User,
  DollarSign
} from 'lucide-react';

// Sample Mock Student Database
const MOCK_STUDENTS = [
  {
    id: '101',
    name: 'Ali Khan',
    fatherName: 'Tariq Khan',
    studentClass: '10',
    admissionNo: 'ADM-2023-01',
    status: 'Active',
    dueDate: '2026-10-10',
    arrears: 1500,
    tuitionFee: 8000,
    concessionPercent: 10,
    totalPending: 8700,
  },
  {
    id: '102',
    name: 'Ayesha Ahmed',
    fatherName: 'Zubair Ahmed',
    studentClass: '9',
    admissionNo: 'ADM-2023-02',
    status: 'Active',
    dueDate: '2026-10-10',
    arrears: 0,
    tuitionFee: 7500,
    concessionPercent: 20,
    totalPending: 6000,
  }
];

export default function ChallanPage() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchError, setSearchError] = useState('');

  // Editable Additional Fees
  const [additionalFees, setAdditionalFees] = useState({
    securityFee: 0,
    annualCharges: 0,
    miscFee: 0,
    firstInstallment: 0,
    secondInstallment: 0,
    thirdInstallment: 0,
    lateFine: 0,
  });

  // Payment Processing state
  const [amountPaidInput, setAmountPaidInput] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [transactions, setTransactions] = useState([]);
  const [isChallanModalOpen, setIsChallanModalOpen] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState('');

  // Student Search Handler
  const handleSearch = (e) => {
    e?.preventDefault();
    setSearchError('');
    if (!searchQuery.trim()) {
      setSearchError('Please enter a Student ID or Name');
      return;
    }

    const found = MOCK_STUDENTS.find(
      (st) =>
        st.id.toLowerCase() === searchQuery.trim().toLowerCase() ||
        st.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    if (found) {
      setSelectedStudent(found);
      setAmountPaidInput('');
    } else {
      setSelectedStudent(null);
      setSearchError('No student found matching criteria.');
    }
  };

  // Handle Input Changes for Additional Fees
  const handleFeeChange = (field, value) => {
    const num = Math.max(0, parseFloat(value) || 0);
    setAdditionalFees((prev) => ({ ...prev, [field]: num }));
  };

  // Clear Late Fine
  const handleRemoveFine = () => {
    setAdditionalFees((prev) => ({ ...prev, lateFine: 0 }));
  };

  // Calculations
  const calculations = useMemo(() => {
    if (!selectedStudent) {
      return {
        arrears: 0,
        tuitionFee: 0,
        concessionPercent: 0,
        payableTuition: 0,
        additionalTotal: 0,
        totalPayable: 0,
        amountPaid: 0,
        remainingBalance: 0,
      };
    }

    const arrears = selectedStudent.arrears || 0;
    const tuitionFee = selectedStudent.tuitionFee || 0;
    const concessionPercent = selectedStudent.concessionPercent || 0;
    const payableTuition = tuitionFee - (tuitionFee * concessionPercent) / 100;

    const additionalTotal =
      additionalFees.securityFee +
      additionalFees.annualCharges +
      additionalFees.miscFee +
      additionalFees.firstInstallment +
      additionalFees.secondInstallment +
      additionalFees.thirdInstallment +
      additionalFees.lateFine;

    const totalPayable = arrears + payableTuition + additionalTotal;
    const amountPaid = parseFloat(amountPaidInput) || 0;
    const remainingBalance = Math.max(0, totalPayable - amountPaid);

    return {
      arrears,
      tuitionFee,
      concessionPercent,
      payableTuition,
      additionalTotal,
      totalPayable,
      amountPaid,
      remainingBalance,
    };
  }, [selectedStudent, additionalFees, amountPaidInput]);

  // Process Payment Submit
  const handleProcessPayment = () => {
    if (!selectedStudent) return;
    if (calculations.amountPaid <= 0) {
      alert('Please enter a valid amount paid.');
      return;
    }

    const newTx = {
      id: `TXN-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-GB'),
      monthYear: 'Sep 2026',
      amountPaid: calculations.amountPaid,
      balance: calculations.remainingBalance,
      mode: paymentMode,
    };

    setTransactions([newTx, ...transactions]);
    setPaymentSuccessMsg(`Payment of Rs. ${calculations.amountPaid.toLocaleString()} recorded successfully!`);
    setTimeout(() => setPaymentSuccessMsg(''), 4000);
  };

  // Clear Form
  const handleClear = () => {
    setSelectedStudent(null);
    setSearchQuery('');
    setSearchError('');
    setAmountPaidInput('');
    setAdditionalFees({
      securityFee: 0,
      annualCharges: 0,
      miscFee: 0,
      firstInstallment: 0,
      secondInstallment: 0,
      thirdInstallment: 0,
      lateFine: 0,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fee Payment & Challan</h1>
          <p className="text-xs text-slate-500 mt-1">
            Search student record, calculate fee structure, collect payment, and issue fee challans
          </p>
        </div>
        <div className="text-right font-mono text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto">
          System: <span className="font-semibold text-slate-700">2026-09-23 22:12:03</span>
        </div>
      </div>

      {paymentSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span>{paymentSuccessMsg}</span>
        </div>
      )}

      {/* 1. Find Student Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Search className="h-4 w-4 text-indigo-600" />
          Find Student
        </h2>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Student ID or Name (e.g. 101 or Ali)"
              className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all"
          >
            Search
          </button>
        </form>
        {searchError && (
          <div className="text-xs text-rose-500 flex items-center gap-1 font-medium pt-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{searchError}</span>
          </div>
        )}
      </div>

      {/* 2. Student Details Section */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <User className="h-4 w-4 text-indigo-600" />
          Student Details
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Student ID:</span>
            <span className="text-slate-900 font-bold text-sm">
              {selectedStudent ? selectedStudent.id : '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Name:</span>
            <span className="text-slate-900 font-bold text-sm">
              {selectedStudent ? selectedStudent.name : '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Class:</span>
            <span className="text-slate-800 font-semibold">
              {selectedStudent ? `Class ${selectedStudent.studentClass}` : '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Father:</span>
            <span className="text-slate-800 font-semibold">
              {selectedStudent ? selectedStudent.fatherName : '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Admission:</span>
            <span className="text-slate-700 font-mono">
              {selectedStudent ? selectedStudent.admissionNo : '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Total Pending:</span>
            <span className="text-rose-600 font-bold text-sm">
              {selectedStudent ? `Rs. ${selectedStudent.totalPending.toLocaleString()}` : '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Current Status:</span>
            <span className="text-emerald-600 font-semibold">
              {selectedStudent ? selectedStudent.status : '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Due Date:</span>
            <span className="text-slate-700">
              {selectedStudent ? selectedStudent.dueDate : '-'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Fee Calculation Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-3">
          <DollarSign className="h-4 w-4 text-indigo-600" />
          Fee Calculation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Fee Breakdown */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Fee Breakdown
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-600">Arrears:</span>
                <span className="font-semibold text-slate-900">
                  Rs. {calculations.arrears.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-600">Tuition Fee (Original):</span>
                <span className="font-semibold text-slate-900">
                  Rs. {calculations.tuitionFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-600">Concession:</span>
                <span className="font-semibold text-indigo-600">
                  {calculations.concessionPercent}%
                </span>
              </div>
              <div className="flex justify-between py-2 pt-3 font-bold text-sm text-slate-900">
                <span>Payable after Concession:</span>
                <span className="text-indigo-600">
                  Rs. {calculations.payableTuition.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Additional Fees (Editable) */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Additional Fees (Editable)
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1">Security Fee:</label>
                <input
                  type="number"
                  min="0"
                  value={additionalFees.securityFee || ''}
                  onChange={(e) => handleFeeChange('securityFee', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-indigo-500 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Annual Charges:</label>
                <input
                  type="number"
                  min="0"
                  value={additionalFees.annualCharges || ''}
                  onChange={(e) => handleFeeChange('annualCharges', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-indigo-500 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Misc Fee:</label>
                <input
                  type="number"
                  min="0"
                  value={additionalFees.miscFee || ''}
                  onChange={(e) => handleFeeChange('miscFee', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-indigo-500 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">1st Installment:</label>
                <input
                  type="number"
                  min="0"
                  value={additionalFees.firstInstallment || ''}
                  onChange={(e) => handleFeeChange('firstInstallment', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-indigo-500 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">2nd Installment:</label>
                <input
                  type="number"
                  min="0"
                  value={additionalFees.secondInstallment || ''}
                  onChange={(e) => handleFeeChange('secondInstallment', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-indigo-500 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">3rd Installment:</label>
                <input
                  type="number"
                  min="0"
                  value={additionalFees.thirdInstallment || ''}
                  onChange={(e) => handleFeeChange('thirdInstallment', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-indigo-500 outline-none font-mono"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-slate-600 mb-1">Late Fine:</label>
                <input
                  type="number"
                  min="0"
                  value={additionalFees.lateFine || ''}
                  onChange={(e) => handleFeeChange('lateFine', e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-indigo-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleRemoveFine}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-all"
              >
                Remove Fine
              </button>
            </div>
          </div>
        </div>

        {/* Total Payable Summary Highlight */}
        <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800">Total Payable Amount:</span>
          <span className="text-xl font-extrabold text-rose-600">
            Rs. {calculations.totalPayable.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 4. Payment Details Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-indigo-600" />
          Payment Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block mb-1">Current Month:</span>
            <span className="text-indigo-700 font-bold text-sm">Sep 2026</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Amount Paid (Rs.):</span>
            <input
              type="number"
              min="0"
              value={amountPaidInput}
              onChange={(e) => setAmountPaidInput(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-semibold focus:border-indigo-500 outline-none font-mono"
            />
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Payment Mode:</span>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-indigo-500 outline-none"
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cheque">Cheque</option>
              <option value="Online">Online / Card</option>
            </select>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Remaining Balance:</span>
            <span className="text-indigo-600 font-bold text-sm block pt-1">
              Rs. {calculations.remainingBalance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={handleProcessPayment}
            disabled={!selectedStudent || calculations.amountPaid <= 0}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Process Payment</span>
          </button>

          <button
            onClick={() => setIsChallanModalOpen(true)}
            disabled={!selectedStudent}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Receipt className="h-4 w-4" />
            <span>Generate Bill</span>
          </button>

          <button
            onClick={handleClear}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* 5. Recent Transactions Log */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Recent Transactions
        </h2>
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner">
          <div className="max-h-48 overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 border-r border-slate-200">Tx ID</th>
                  <th className="py-2.5 px-4 border-r border-slate-200">Date</th>
                  <th className="py-2.5 px-4 border-r border-slate-200">Month/Year</th>
                  <th className="py-2.5 px-4 border-r border-slate-200">Amount Paid</th>
                  <th className="py-2.5 px-4 border-r border-slate-200">Balance</th>
                  <th className="py-2.5 px-4">Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-4 font-mono text-slate-500 border-r border-slate-100">
                        {tx.id}
                      </td>
                      <td className="py-2 px-4 border-r border-slate-100">{tx.date}</td>
                      <td className="py-2 px-4 border-r border-slate-100">{tx.monthYear}</td>
                      <td className="py-2 px-4 font-bold text-emerald-600 border-r border-slate-100">
                        Rs. {tx.amountPaid.toLocaleString()}
                      </td>
                      <td className="py-2 px-4 text-slate-600 border-r border-slate-100">
                        Rs. {tx.balance.toLocaleString()}
                      </td>
                      <td className="py-2 px-4 font-semibold text-slate-800">{tx.mode}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-slate-400">
                      No payment transactions recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= PRINTABLE CHALLAN MODAL ================= */}
      {isChallanModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-lg">Fee Challan Preview</h3>
              </div>
              <button
                onClick={() => setIsChallanModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs uppercase tracking-wider font-bold"
              >
                Close
              </button>
            </div>

            {/* Printable Slip Content */}
            <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl space-y-4 bg-slate-50/50">
              <div className="text-center space-y-1">
                <h4 className="font-extrabold text-slate-900 text-base uppercase">
                  School Management System
                </h4>
                <p className="text-xs text-slate-500">Official Student Fee Challan Copy</p>
                <div className="text-[11px] text-slate-400 font-mono">Date: Sep 23, 2026</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-200 py-3">
                <div><span className="text-slate-400">Student ID:</span> <strong>{selectedStudent.id}</strong></div>
                <div><span className="text-slate-400">Name:</span> <strong>{selectedStudent.name}</strong></div>
                <div><span className="text-slate-400">Father:</span> <strong>{selectedStudent.fatherName}</strong></div>
                <div><span className="text-slate-400">Class:</span> <strong>Class {selectedStudent.studentClass}</strong></div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Tuition Fee (Net):</span>
                  <span>Rs. {calculations.payableTuition.toLocaleString()}</span>
                </div>
                {calculations.arrears > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Arrears:</span>
                    <span>Rs. {calculations.arrears.toLocaleString()}</span>
                  </div>
                )}
                {calculations.additionalTotal > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Additional Fees:</span>
                    <span>Rs. {calculations.additionalTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200 text-sm">
                  <span>Total Amount Payable:</span>
                  <span className="text-rose-600">Rs. {calculations.totalPayable.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                <span>Print Challan Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}