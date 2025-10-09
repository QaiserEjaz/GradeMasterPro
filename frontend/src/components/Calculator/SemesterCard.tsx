import { useState } from 'react';
import { CourseRow } from './CourseRow';
import type { Semester, Course, GradingSystem } from '../../types';

interface SemesterCardProps {
  semester: Semester;
  onUpdate: (semester: Partial<Semester>) => void;
  onRemove: () => void;
  onAddCourse: () => void;
  onUpdateCourse: (courseIndex: number, course: Partial<Course>) => void;
  onRemoveCourse: (courseIndex: number) => void;
  gradingSystem: GradingSystem | null;
}

export function SemesterCard({
  semester,
  onUpdate,
  onRemove,
  onAddCourse,
  onUpdateCourse,
  onRemoveCourse,
  gradingSystem,
}: SemesterCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleSemesterChange = (field: keyof Semester, value: string | number) => {
    onUpdate({ [field]: value });
  };

  const calculateGPA = () => {
    if (!gradingSystem) return null;

    let qualityPoints = 0;
    let credits = 0;

    semester.courses.forEach(course => {
      const grade = gradingSystem.grades.find(g => g.letter === course.gradeValue);
      if (!grade) return;

      qualityPoints += grade.points * course.credits;
      credits += course.credits;
    });

    if (!credits) return null;
    return qualityPoints / credits;
  };

  const resolvedGpa = typeof semester.gpa === 'number' && Number.isFinite(semester.gpa)
    ? semester.gpa
    : calculateGPA();
  const formattedGpa = resolvedGpa != null ? resolvedGpa.toFixed(2) : '—';

  const containerPadding = isCollapsed ? 'p-3 sm:p-4' : 'p-4 sm:p-5';
  const toggleButtonClass = isCollapsed
    ? 'inline-flex items-center justify-center gap-1 rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
    : 'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400';
  const removeButtonClass = isCollapsed
    ? 'inline-flex items-center justify-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs font-semibold text-red-500 transition hover:border-red-300 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200'
    : 'inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400';

  return (
    <div className={`mb-4 rounded-xl border border-slate-200 bg-white shadow-sm ${containerPadding}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full">
          {isCollapsed ? (
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <div>
                <p className="text-sm font-semibold text-slate-700">{semester.semesterName || `Semester ${semester.semesterNumber}`}</p>
                <p className="text-xs text-slate-500">{semester.year ? `Year ${semester.year}` : 'Year —'} · {semester.courses.length} courses · GPA {formattedGpa}</p>
              </div>
              <div className="hidden text-xs font-semibold text-slate-600 sm:block">GPA {formattedGpa}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:flex sm:items-center sm:gap-4">
              <input
                type="text"
                placeholder="Semester Name"
                value={semester.semesterName}
                onChange={(e) => handleSemesterChange('semesterName', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Year"
                value={semester.year ?? ''}
                onChange={(e) => handleSemesterChange('year', Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-24"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setIsCollapsed(prev => !prev)}
            className={toggleButtonClass}
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
          <button onClick={onRemove} className={removeButtonClass}>
            Remove
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>Courses: {semester.courses.length}</span>
            <span className="font-semibold text-slate-600">Current GPA: {formattedGpa}</span>
          </div>
          <div className="hidden rounded-lg bg-slate-100 p-2 text-xs font-semibold text-slate-600 sm:grid sm:grid-cols-[1.8fr_1fr_.8fr_minmax(0,1.9fr)_1.2fr_auto] sm:gap-3 sm:text-sm">
            <div className="truncate">Course Name</div>
            <div className="truncate">Code</div>
            <div className="truncate">Credits</div>
            <div className="truncate">Grade Input</div>
            <div className="truncate">Category</div>
            <div className="truncate text-right">Action</div>
          </div>

          <div className="space-y-2">
            {semester.courses.map((course, courseIndex) => (
              <CourseRow
                key={course.id || courseIndex}
                course={course}
                onUpdate={(updates) => onUpdateCourse(courseIndex, updates)}
                onRemove={() => onRemoveCourse(courseIndex)}
                gradingSystem={gradingSystem}
              />
            ))}

            <button
              onClick={onAddCourse}
              className="w-full rounded-lg border-2 border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-400 hover:text-slate-600"
            >
              + Add Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
