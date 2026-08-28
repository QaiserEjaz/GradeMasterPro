import { useState, useEffect } from 'react';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Dropdown } from '../components/ui/Dropdown';
import { useStore } from '../store/useStore';
import { SemesterCard } from '../components/Calculator/SemesterCard';
import { ResultsDisplay } from '../components/Calculator/ResultsDisplay';
import { GradingSystemDetails } from '../components/Calculator/GradingSystemDetails';
import { gradingAPI, calculationAPI } from '../services/api';
import type { GradingSystem } from '../types';

export function GradeCalculator() {
  const {
    semesters,
    gradingSystem,
    currentCalculation,
    setGradingSystem,
    addSemester,
    removeSemester,
    updateSemester,
    addCourse,
    removeCourse,
    updateCourse,
    calculateResults,
    clearCalculation
  } = useStore();

  const [availableSystems, setAvailableSystems] = useState<GradingSystem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasSemesters = semesters.length > 0;
  const [isGradingExpanded, setIsGradingExpanded] = useState(false);

  useEffect(() => {
    const loadSystems = async () => {
      try {
        const systems = await gradingAPI.getSystems();
        setAvailableSystems(systems);
        if (systems.length > 0 && !gradingSystem) {
          const defaultSystem = systems.find(system => system.id === 'USA_4_POINT') ?? systems[0];
          setGradingSystem(defaultSystem ?? null);
        }
      } catch (error) {
        console.warn('Failed to load grading systems', error);
        setErrorMessage('Unable to load grading systems. The default static system is being used.');
      }
    };
    loadSystems();
  }, [gradingSystem, setGradingSystem]);

  const handleCalculate = () => {
    calculateResults();
  };

  const handleSave = async () => {
    if (!currentCalculation || !gradingSystem) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const saved = await calculationAPI.create({
        title: currentCalculation.title,
        gradingSystem: gradingSystem.id,
        totalCredits: currentCalculation.totalCredits,
        semesters: semesters.map((s) => ({
          semesterNumber: s.semesterNumber,
          semesterName: s.semesterName,
          year: s.year,
          credits: s.credits,
          courses: s.courses.map((c) => ({
            courseName: c.courseName,
            courseCode: c.courseCode,
            credits: c.credits,
            gradeValue: c.gradeValue,
            category: c.category,
          })),
        })),
      });

      if (saved) {
        alert('Calculation saved successfully!');
      } else {
        setErrorMessage('Failed to save calculation. Please try again later.');
      }
    } catch (error) {
      console.error('Save calculation failed', error);
      setErrorMessage('Error saving calculation. Please try again.');
      alert('Error saving calculation');
    } finally {
      setLoading(false);
    }
  };

  const handleClearWorkspace = () => {
    clearCalculation();
    setShowClearConfirm(false);
  };

  return (
    <div className='min-h-0'>
      <div className="mx-auto flex w-full flex-col gap-6 px-4 py-5 sm:px-5 lg:px-8">
          <header className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Grade Calculator</h1>
              <p className="text-sm text-slate-500 sm:text-base">
                Build multi-semester academic plans, switch between international grading systems, and instantly review quality points and GPA outcomes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-500 lg:justify-end">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden /> Real-time calculations
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden /> Global grading coverage
              </span>
            </div>
          </header>

        <div className="flex flex-1 flex-col gap-4 lg:gap-4">
          {errorMessage && (
            <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          )}
          {currentCalculation && (
            <ResultsDisplay
              results={{
                cgpa: currentCalculation.cgpa || 0,
                totalCredits: currentCalculation.totalCredits,
                qualityPoints: currentCalculation.qualityPoints || 0,
                percentage: currentCalculation.percentage || 0,
                semesterGPAs: currentCalculation.semesters.map(s => s.gpa || 0),
                semesterYears: currentCalculation.semesterYears || currentCalculation.semesters.map(s => s.year ?? null)
              }}
              gradingSystem={gradingSystem}
            />
          )}

          <div className="grid gap-4 md:gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:items-start">
            <section className="flex flex-col gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-none">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
                    <p className="mt-1 text-xs text-slate-500">Calculate, save, or reset your academic plan.</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                    <button
                      onClick={handleCalculate}
                      className="rounded-lg bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
                      disabled={!hasSemesters}
                    >
                      Calculate Results
                    </button>
                    <button
                      onClick={handleSave}
                      className="rounded-lg bg-purple-500 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:cursor-not-allowed disabled:bg-purple-300"
                      disabled={!currentCalculation || loading}
                    >
                      {loading ? 'Saving…' : 'Save Calculation'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(true)}
                      className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                      Clear Workspace
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm lg:min-h-[380px]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 lg:flex-none">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Semesters</h2>
                    <p className="text-xs text-slate-500">Manage courses by term and compare credit loads.</p>
                  </div>
                  <button
                    onClick={addSemester}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span aria-hidden>＋</span>
                    Add Semester
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-3 lg:py-4">
                  {hasSemesters ? (
                    <div className="flex flex-col gap-3 pb-2">
                      {semesters.map((semester, index) => (
                        <SemesterCard
                          key={semester.id || index}
                          semester={semester}
                          onUpdate={(updates) => updateSemester(index, updates)}
                          onRemove={() => removeSemester(index)}
                          onAddCourse={() => addCourse(index)}
                          onUpdateCourse={(courseIndex, course) => updateCourse(index, courseIndex, course)}
                          onRemoveCourse={(courseIndex) => removeCourse(index, courseIndex)}
                          gradingSystem={gradingSystem}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 sm:p-6 text-center text-sm text-slate-500">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-3xl text-blue-500 shadow-sm">＋</span>
                      <p className="font-medium">No semesters yet</p>
                      <p className="max-w-md text-xs text-slate-500">Create your first semester to begin tracking courses, credits, and GPA metrics.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:space-y-4">
              <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:min-h-[380px]">
                <Dropdown
                  label="Grading System"
                  value={gradingSystem?.id || ''}
                  onChange={(value) => {
                    const system = availableSystems.find(s => s.id === value);
                    setGradingSystem(system || null);
                  }}
                  selectClassName="text-sm font-medium"
                  options={availableSystems.map(system => ({
                    value: system.id,
                    label: system.name,
                  }))}
                />
                {gradingSystem && (
                  <div className="mt-3 space-y-3 text-xs text-slate-600">
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{gradingSystem.name}</p>
                        <p className="text-[11px] text-slate-500">Country: {gradingSystem.country}</p>
                      </div>
                      <div className="flex flex-col items-end text-[11px] text-slate-500">
                        <span>Max Points: {gradingSystem.maxPoints}</span>
                        {currentCalculation && (
                          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
                            {currentCalculation.cgpa?.toFixed?.(2) ?? '0.00'} GPA
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 transition hover:text-blue-700 focus:outline-none lg:hidden"
                      onClick={() => setIsGradingExpanded(prev => !prev)}
                    >
                      <span>{isGradingExpanded ? 'Hide grading scale' : 'View grading scale'}</span>
                      <span aria-hidden>{isGradingExpanded ? '−' : '+'}</span>
                    </button>
                    <div className={`${isGradingExpanded ? 'block' : 'hidden'} lg:block`}>
                      <GradingSystemDetails system={gradingSystem} />
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showClearConfirm}
        title="Clear entire workspace?"
        description="This will remove all semesters, courses, and results."
        confirmLabel="Clear All"
        cancelLabel="Keep Data"
        confirmTone="danger"
        onConfirm={handleClearWorkspace}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}
