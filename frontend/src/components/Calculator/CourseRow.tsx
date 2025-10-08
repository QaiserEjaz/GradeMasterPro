import type { Course } from '../../types';

interface CourseRowProps {
  course: Course;
  onUpdate: (course: Partial<Course>) => void;
  onRemove: () => void;
  gradingSystem: { grades: { letter: string; points: number }[] } | null;
}

export function CourseRow({ course, onUpdate, onRemove, gradingSystem }: CourseRowProps) {
  const handleChange = (field: keyof Course, value: string | number) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 p-3 shadow-sm transition hover:border-slate-300 sm:grid-cols-6 sm:p-4">
      <div className="grid gap-1 text-sm text-slate-600 sm:block">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">Course Name</label>
        <input
          type="text"
          placeholder="Course Name"
          value={course.courseName}
          onChange={(e) => handleChange('courseName', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid gap-1 text-sm text-slate-600 sm:block">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">Code</label>
        <input
          type="text"
          placeholder="Code"
          value={course.courseCode || ''}
          onChange={(e) => handleChange('courseCode', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid gap-1 text-sm text-slate-600 sm:block">
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
      <div className="grid gap-1 text-sm text-slate-600 sm:block">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">Grade</label>
        <select
          value={course.gradeValue}
          onChange={(e) => handleChange('gradeValue', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {gradingSystem?.grades.map((grade) => (
            <option key={grade.letter} value={grade.letter}>
              {grade.letter} ({grade.points})
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-1 text-sm text-slate-600 sm:block">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:hidden">Category</label>
        <select
          value={course.category || 'Major'}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Major">Major</option>
          <option value="Minor">Minor</option>
          <option value="Elective">Elective</option>
          <option value="General">General</option>
        </select>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={onRemove}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 sm:w-auto"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
