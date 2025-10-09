import { useState } from 'react';
import { ConfirmationModal } from '../ConfirmationModal';
import { Dropdown } from '../ui/Dropdown';
import type { Course, GradingSystem } from '../../types';

interface CourseRowProps {
  course: Course;
  onUpdate: (course: Partial<Course>) => void;
  onRemove: () => void;
  gradingSystem: GradingSystem | null;
}

export function CourseRow({ course, onUpdate, onRemove, gradingSystem }: CourseRowProps) {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(true);

  const handleChange = (field: keyof Course, value: string | number) => {
    onUpdate({ [field]: value });
  };

  const handleRemoveConfirm = () => {
    onRemove();
    setShowRemoveConfirm(false);
  };

  const handleRemoveCancel = () => {
    setShowRemoveConfirm(false);
  };

  const calculateGradeFromMarks = (obtained: number, max: number): string => {
    if (!gradingSystem || max <= 0) return '';

    const percentage = (obtained / max) * 100;
    const grade = gradingSystem.grades.find(g =>
      percentage >= (g.minPercentage ?? -Infinity) &&
      (g.maxPercentage == null || percentage <= g.maxPercentage)
    );

    return grade?.letter ?? '';
  };

  const handleMarksChange = (field: 'obtainedMarks' | 'maxMarks', value: number) => {
    const updatedCourse: Partial<Course> = { [field]: value };

    const obtained = field === 'obtainedMarks' ? value : course.obtainedMarks;
    const max = field === 'maxMarks' ? value : course.maxMarks;

    if (obtained != null && max != null && max > 0) {
      const calculatedGrade = calculateGradeFromMarks(obtained, max);
      if (calculatedGrade) {
        updatedCourse.gradeValue = calculatedGrade;
      }
    }

    onUpdate(updatedCourse);
  };

  const handleInputModeChange = (mode: 'grade' | 'marks') => {
    onUpdate({ inputMode: mode });
  };

  const currentInputMode = (course.inputMode as 'grade' | 'marks' | undefined) ?? 'grade';
  const courseNameSummary = course.courseName?.trim() || 'Untitled course';
  const creditsSummary = course.credits ?? '—';
  const gradeSummary = course.gradeValue ?? '—';

  return (
    <div className="rounded-lg border border-slate-200 p-3 shadow-sm transition hover:border-slate-300 sm:p-4">
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <div>
          <p className="text-sm font-semibold text-slate-700">{courseNameSummary}</p>
          <p className="text-xs text-slate-500">
            Credits {creditsSummary} · Grade {gradeSummary}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileCollapsed(prev => !prev)}
            className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {isMobileCollapsed ? 'Expand' : 'Collapse'}
          </button>
          <button
            type="button"
            onClick={() => setShowRemoveConfirm(true)}
            className="inline-flex items-center gap-1 rounded-md bg-red-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Remove
          </button>
        </div>
      </div>

      <div
        className={`${isMobileCollapsed ? 'hidden sm:grid' : 'grid'} gap-3 sm:grid-cols-[1.8fr_1fr_.8fr_minmax(0,1.9fr)_1.2fr_auto] sm:gap-3 sm:items-start`}
      >
        <div className="grid gap-1 text-sm text-slate-600 sm:flex sm:flex-col">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">
            Course Name
          </label>
          <input
            type="text"
            placeholder="Course Name"
            value={course.courseName}
            onChange={(e) => handleChange('courseName', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="grid gap-1 text-sm text-slate-600 sm:flex sm:flex-col">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">
            Code
          </label>
          <input
            type="text"
            placeholder="Code"
            value={course.courseCode || ''}
            onChange={(e) => handleChange('courseCode', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="grid gap-1 text-sm text-slate-600 sm:flex sm:flex-col">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">
            Credits
          </label>
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
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">
            Grade Input
          </label>
          <div className="space-y-3">
            <Dropdown
              value={currentInputMode}
              onChange={(value) => handleInputModeChange(value as 'grade' | 'marks')}
              options={[
                { value: 'grade', label: 'Direct Grade' },
                { value: 'marks', label: 'Calculate from Marks' },
              ]}
              wrapperClassName="sm:max-w-[280px]"
              containerClassName="flex flex-col"
            />

            <div className="min-h-[2.5rem] flex items-center">
              {currentInputMode === 'grade' ? (
                <Dropdown
                  value={course.gradeValue ?? ''}
                  onChange={(value) => handleChange('gradeValue', value)}
                  options={(gradingSystem?.grades ?? []).map((grade) => ({
                    value: grade.letter,
                    label: `${grade.letter} (${grade.points} points)`
                  }))}
                  containerClassName="w-full"
                  wrapperClassName="w-full"
                />
              ) : currentInputMode === 'marks' ? (
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Obtained"
                        value={course.obtainedMarks ?? ''}
                        onChange={(e) => handleMarksChange('obtainedMarks', Number(e.target.value))}
                        min="0"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <span className="font-medium text-slate-400">/</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Max"
                        value={course.maxMarks ?? ''}
                        onChange={(e) => handleMarksChange('maxMarks', Number(e.target.value))}
                        min="0"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  {course.gradeValue && (
                    <div className="flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-2">
                      <span className="text-xs font-medium text-slate-600">Grade:</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          course.gradeValue === 'A'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : course.gradeValue === 'B'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : course.gradeValue === 'C'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : course.gradeValue === 'D'
                                  ? 'bg-orange-100 text-orange-800 border border-orange-200'
                                  : course.gradeValue === 'F'
                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}
                      >
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
        <Dropdown
          value={course.category || 'Major'}
          onChange={(value) => handleChange('category', value)}
          label="Category"
          containerClassName="grid gap-1 text-sm text-slate-600 sm:flex sm:flex-col"
          labelClassName="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden"
          options={[
            { value: 'Major', label: 'Major' },
            { value: 'Minor', label: 'Minor' },
            { value: 'Elective', label: 'Elective' },
            { value: 'General', label: 'General' },
          ]}
        />
        <div className="hidden items-start justify-end sm:flex sm:justify-end">
          <button
            onClick={() => setShowRemoveConfirm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Remove
          </button>
        </div>
      </div>

      {!isMobileCollapsed && (
        <div className="mt-3 sm:hidden">
          <button
            onClick={() => setShowRemoveConfirm(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Remove Course
          </button>
        </div>
      )}

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
