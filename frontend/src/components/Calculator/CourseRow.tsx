import type { Course, GradingSystem } from '../../types';

interface CourseRowProps {
  course: Course;
  onUpdate: (course: Partial<Course>) => void;
  onRemove: () => void;
  gradingSystem: GradingSystem | null;
}

export function CourseRow({ course, onUpdate, onRemove, gradingSystem }: CourseRowProps) {
  const handleChange = (field: keyof Course, value: string | number) => {
    onUpdate({ [field]: value });
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
            <select
              value={currentInputMode}
              onChange={(e) => handleInputModeChange(e.target.value as 'grade' | 'marks')}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {/* <option value="" disabled>Input Type</option> */}
              <option value="grade">Direct Grade</option>
              <option value="marks">Calculate from Marks</option>
            </select>
          </div>

          {/* Input Fields */}
          <div className="min-h-[2.5rem] flex items-center">
            {currentInputMode === 'grade' ? (
              <select
                value={course.gradeValue}
                onChange={(e) => handleChange('gradeValue', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {gradingSystem?.grades.map((grade) => (
                  <option key={grade.letter} value={grade.letter}>
                    {grade.letter} ({grade.points} points)
                  </option>
                ))}
              </select>
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
      <div className="flex items-start justify-end sm:justify-end sm:items-start">
        <button
          onClick={onRemove}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 sm:w-auto sm:self-start"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
