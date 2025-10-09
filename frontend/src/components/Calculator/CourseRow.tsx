import { useState, type CSSProperties } from 'react';
import { ConfirmationModal } from '../ConfirmationModal';
import type { Course, GradingSystem } from '../../types';

interface CourseRowProps {
  course: Course;
  onUpdate: (course: Partial<Course>) => void;
  onRemove: () => void;
  gradingSystem: GradingSystem | null;
}

export function CourseRow({ course, onUpdate, onRemove, gradingSystem }: CourseRowProps) {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleChange = (field: keyof Course, value: string | number) => {
    onUpdate({ [field]: value });
  };

  const dropdownBaseClasses =
    'w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm text-slate-700 shadow-sm transition-colors hover:border-slate-300 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-200';

  const dropdownWrapperClasses = 'relative inline-flex w-full items-center';

  const dropdownOptionStyle: CSSProperties = {
    backgroundColor: '#ffffff',
    color: '#1e293b',
  };

  const dropdownChevron = (
    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
      <svg
        className="h-4 w-4 drop-shadow-sm"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 8L10 12L14 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  const handleRemoveConfirm = () => {
    onRemove();
    setShowRemoveConfirm(false);
  };

  const handleRemoveCancel = () => {
    setShowRemoveConfirm(false);
  };

  // Function to calculate grade from marks
  const calculateGradeFromMarks = (obtained: number, max: number): string => {
    if (!gradingSystem || !obtained || !max) return '';

    const percentage = (obtained / max) * 100;

    // Find the appropriate grade based on percentage ranges
    const grade = gradingSystem.grades.find(g =>
      percentage >= g.minPercentage &&
      (!g.maxPercentage || percentage <= g.maxPercentage)
    );

    return grade?.letter || '';
  };

  // Auto-update grade when marks change
  const handleMarksChange = (field: 'obtainedMarks' | 'maxMarks', value: number) => {
    const updatedCourse = { [field]: value };

    // If both marks are provided, calculate and set the grade
    const obtained = field === 'obtainedMarks' ? value : course.obtainedMarks;
    const max = field === 'maxMarks' ? value : course.maxMarks;

    if (obtained !== undefined && max !== undefined && max > 0) {
      const calculatedGrade = calculateGradeFromMarks(obtained, max);
      if (calculatedGrade) {
        (updatedCourse as any).gradeValue = calculatedGrade;
      }
    }

    onUpdate(updatedCourse);
  };

  // Handle input mode change
  const handleInputModeChange = (mode: 'grade' | 'marks') => {
    onUpdate({ inputMode: mode });
  };

  const currentInputMode = course.inputMode ?? '';

  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 p-3 shadow-sm transition hover:border-slate-300 sm:grid-cols-[1.8fr_1fr_.8fr_minmax(0,1.9fr)_1.2fr_auto] sm:gap-3 sm:p-4 sm:items-start">
      <div className="grid gap-1 text-sm text-slate-600 sm:flex sm:flex-col">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">Course Name</label>
        <input
          type="text"
          placeholder="Course Name"
          value={course.courseName}
          onChange={(e) => handleChange('courseName', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid gap-1 text-sm text-slate-600 sm:flex sm:flex-col">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">Code</label>
        <input
          type="text"
          placeholder="Code"
          value={course.courseCode || ''}
          onChange={(e) => handleChange('courseCode', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid gap-1 text-sm text-slate-600 sm:flex sm:flex-col">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">Credits</label>
        <input
          type="number"
          placeholder="Credits"
          value={course.credits}
          onChange={(e) => handleChange('credits', Number(e.target.value))}
          min="0"
          max="10"
          step="0.5"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col gap-3 text-sm text-slate-600 sm:w-full sm:max-w-[280px]">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">Grade Input</label>
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <div className={dropdownWrapperClasses}>
              <select
                value={currentInputMode}
                onChange={(e) => handleInputModeChange(e.target.value as 'grade' | 'marks')}
                className={dropdownBaseClasses}
              >
                {/* <option value="" disabled>Input Type</option> */}
                <option value="grade" style={dropdownOptionStyle}>Direct Grade</option>
                <option value="marks" style={dropdownOptionStyle}>Calculate from Marks</option>
              </select>
              {dropdownChevron}
            </div>
          </div>

          {/* Input Fields */}
          <div className="min-h-[2.5rem] flex items-center">
            {currentInputMode === 'grade' ? (
              <div className={dropdownWrapperClasses}>
                <select
                  value={course.gradeValue}
                  onChange={(e) => handleChange('gradeValue', e.target.value)}
                  className={dropdownBaseClasses}
                >
                  {gradingSystem?.grades.map((grade) => (
                    <option key={grade.letter} value={grade.letter} style={dropdownOptionStyle}>
                      {grade.letter} ({grade.points} points)
                    </option>
                  ))}
                </select>
                {dropdownChevron}
              </div>
            ) : currentInputMode === 'marks' ? (
              <div className="w-full space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Obtained"
                      value={course.obtainedMarks || ''}
                      onChange={(e) => handleMarksChange('obtainedMarks', Number(e.target.value))}
                      min="0"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <span className="text-slate-400 font-medium">/</span>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Max"
                      value={course.maxMarks || ''}
                      onChange={(e) => handleMarksChange('maxMarks', Number(e.target.value))}
                      min="0"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                {course.gradeValue && (
                  <div className="flex items-center justify-center gap-2 p-2 bg-gradient-to-r from-slate-50 to-blue-50 rounded-md border border-slate-200">
                    <span className="text-xs font-medium text-slate-600">Grade:</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      course.gradeValue === 'A' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      course.gradeValue === 'B' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      course.gradeValue === 'C' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      course.gradeValue === 'D' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                      course.gradeValue === 'F' ? 'bg-red-100 text-red-800 border border-red-200' :
                      'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      {course.gradeValue}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                Select an input type to begin.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-1 text-sm text-slate-600 sm:flex sm:flex-col">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">Category</label>
        <div className={dropdownWrapperClasses}>
          <select
            value={course.category || 'Major'}
            onChange={(e) => handleChange('category', e.target.value)}
            className={dropdownBaseClasses}
          >
            <option value="Major" style={dropdownOptionStyle}>Major</option>
            <option value="Minor" style={dropdownOptionStyle}>Minor</option>
            <option value="Elective" style={dropdownOptionStyle}>Elective</option>
            <option value="General" style={dropdownOptionStyle}>General</option>
          </select>
          {dropdownChevron}
        </div>
      </div>
      <div className="flex items-start justify-end sm:justify-end sm:items-start">
        <button
          onClick={() => setShowRemoveConfirm(true)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 sm:w-auto sm:self-start"
        >
          Remove
        </button>
      </div>
      <ConfirmationModal
        isOpen={showRemoveConfirm}
        title="Remove this course?"
        description="This action cannot be undone."
        confirmLabel="Remove"
        cancelLabel="Keep"
        confirmTone="danger"
        onConfirm={handleRemoveConfirm}
        onCancel={handleRemoveCancel}
      />
    </div>
  );
}
