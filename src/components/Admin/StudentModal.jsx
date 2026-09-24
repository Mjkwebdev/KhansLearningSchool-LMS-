import React, { useState, useEffect } from 'react';
import { X, User, Mail, BookOpen, Hash, Percent, FileText, AlertCircle } from 'lucide-react';
import Button from '../common/Button';
import ToggleSwitch from '../common/ToggleSwitch';
import RadioGroup from '../common/RadioGroup';

export default function StudentModal({ isOpen, onClose, onSave, studentToEdit }) {
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    email: '',
    gender: 'Male',
    class: '1-A',
    rollNo: '',
    concession: 0,
    remarks: '',
    status: true
  });

  const [touched, setTouched] = useState({});

  // Handle open/close animation lifecycle
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

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        ...studentToEdit,
        status: studentToEdit.status === 'active'
      });
    } else {
      setFormData({
        name: '',
        fatherName: '',
        email: '',
        gender: 'Male',
        class: '1-A',
        rollNo: '',
        concession: 0,
        remarks: '',
        status: true
      });
    }
    setTouched({});
  }, [studentToEdit, isOpen]);

  if (!isRendered) return null;

  // Live validation rules
  const errors = {
    name: !formData.name.trim() ? 'Student name is required.' : '',
    rollNo: !formData.rollNo.toString().trim() ? 'Roll number is required.' : '',
    email: formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Please enter a valid email address.' : '',
    concession: (formData.concession < 0 || formData.concession > 100) ? 'Concession must be between 0 and 100%.' : ''
  };

  const hasErrors = Object.values(errors).some(err => err !== '');

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, rollNo: true, email: true, concession: true });

    if (!hasErrors) {
      onSave({
        ...formData,
        status: formData.status ? 'active' : 'inactive'
      });
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      isAnimating ? 'bg-slate-950/70 backdrop-blur-xs opacity-100' : 'bg-slate-950/0 backdrop-blur-none opacity-0'
    }`}>
      <div className={`bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col transform transition-all duration-300 ${
        isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
      }`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
          <h3 className="font-extrabold text-slate-900 text-base">
            {studentToEdit ? 'Edit Student Profile' : 'Add New Student'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scrollable Area */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-600" /> Student Name *
              </label>
              <input 
                type="text"
                placeholder="e.g. Muhammad Ali"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onBlur={() => handleBlur('name')}
                className={`w-full px-4 py-2.5 rounded-2xl bg-slate-50 border text-xs text-slate-800 focus:outline-none font-medium transition-all ${
                  touched.name && errors.name ? 'border-rose-500 focus:border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-purple-500'
                }`}
              />
              {touched.name && errors.name && (
                <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            {/* Father Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-600" /> Father Name (opt)
              </label>
              <input 
                type="text"
                placeholder="e.g. Ahmed Ali"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-500 font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-600" /> Email (opt)
              </label>
              <input 
                type="email"
                placeholder="e.g. student@khanslearning.edu.pk"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={() => handleBlur('email')}
                className={`w-full px-4 py-2.5 rounded-2xl bg-slate-50 border text-xs text-slate-800 focus:outline-none font-medium transition-all ${
                  touched.email && errors.email ? 'border-rose-500 focus:border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-purple-500'
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            {/* Gender Radio Buttons */}
            <RadioGroup 
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={(val) => setFormData({ ...formData, gender: val })}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Other', value: 'Other' }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Class */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" /> Class *
              </label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="1-A">1-A</option>
                <option value="1-B">1-B</option>
                <option value="2-A">2-A</option>
                <option value="3-A">3-A</option>
                <option value="7-A">7-A</option>
                <option value="9-A">9-A</option>
                <option value="10-A">10-A</option>
              </select>
            </div>

            {/* Roll No */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-purple-600" /> Roll No *
              </label>
              <input 
                type="text"
                placeholder="e.g. 05"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                onBlur={() => handleBlur('rollNo')}
                className={`w-full px-4 py-2.5 rounded-2xl bg-slate-50 border text-xs text-slate-800 focus:outline-none font-medium transition-all ${
                  touched.rollNo && errors.rollNo ? 'border-rose-500 focus:border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-purple-500'
                }`}
              />
              {touched.rollNo && errors.rollNo && (
                <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.rollNo}
                </p>
              )}
            </div>

            {/* Concession (%) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-purple-600" /> Concession (%)
              </label>
              <input 
                type="number"
                min="0"
                max="100"
                value={formData.concession}
                onChange={(e) => setFormData({ ...formData, concession: Number(e.target.value) })}
                onBlur={() => handleBlur('concession')}
                className={`w-full px-4 py-2.5 rounded-2xl bg-slate-50 border text-xs text-slate-800 focus:outline-none font-medium transition-all ${
                  touched.concession && errors.concession ? 'border-rose-500 focus:border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-purple-500'
                }`}
              />
              {touched.concession && errors.concession && (
                <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.concession}
                </p>
              )}
            </div>
          </div>

          {/* Status Toggle Switch */}
          <div className="pt-1">
            <ToggleSwitch 
              label="Account Status (Active / Inactive)"
              checked={formData.status}
              onChange={(val) => setFormData({ ...formData, status: val })}
            />
          </div>

          {/* Remarks */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-600" /> Remarks
            </label>
            <textarea 
              rows="2"
              placeholder="Add any additional notes or remarks..."
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-500 font-medium transition-all resize-none"
            />
          </div>

          {/* Modal Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 flex-shrink-0">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {studentToEdit ? 'Save Changes' : 'Enroll Student'}
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}