import type { CalculationResults } from '../../types';

interface ResultsDisplayProps {
  results: CalculationResults;
  gradingSystem: { id: string; name: string } | null;
}

export function ResultsDisplay({ results, gradingSystem }: ResultsDisplayProps) {
  return (
    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-blue-800">Calculation Summary</h3>
          <p className="text-xs text-blue-700/70">Overview of cumulative performance based on current inputs.</p>
        </div>
        {gradingSystem && (
          <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-600">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500" aria-hidden />
            {gradingSystem.name}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-4 lg:flex-nowrap lg:gap-6">
        <MetricCard label="CGPA" value={results.cgpa.toFixed(2)} accent="text-blue-600" />
        <MetricCard label="Percentage" value={`${results.percentage.toFixed(1)}%`} accent="text-green-600" />
        <MetricCard label="Total Credits" value={results.totalCredits.toString()} accent="text-purple-600" />
        <MetricCard label="Quality Points" value={results.qualityPoints.toFixed(1)} accent="text-orange-600" />
      </div>

      {results.semesterGPAs.length > 0 && (
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-700">Semester GPAs by Year</h4>
            <p className="text-[11px] text-slate-500">Grouped by the year assigned to each semester for easier context.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {groupSemestersByYear(results.semesterGPAs, results.semesterYears).map(({ yearLabel, data }) => (
              <div key={yearLabel} className="min-w-[220px] flex-1 rounded-lg border border-slate-200 bg-white/70 px-4 py-3 shadow-sm sm:flex-none">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>{yearLabel}</span>
                  <span>Avg GPA {calculateAverageGpa(data).toFixed(2)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.map(({ label, gpa }) => (
                    <div key={label} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-xs text-slate-600">
                      <div className="text-sm font-semibold text-slate-800">{gpa.toFixed(2)}</div>
                      <div>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  accent: string;
}

function MetricCard({ label, value, accent }: MetricCardProps) {
  return (
    <div className="min-w-[120px] flex-1 rounded-lg bg-white/70 px-3 py-2 text-center shadow-sm">
      <div className={`text-lg font-semibold ${accent}`}>{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}

function groupSemestersByYear(gpas: number[], years?: (number | null)[]) {
  const groups: Record<string, { label: string; gpa: number }[]> = {};

  gpas.forEach((gpa, index) => {
    const year = years ? years[index] : undefined;
    const groupKey = typeof year === 'number' && Number.isFinite(year) ? `Year ${year}` : 'Unassigned Year';
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push({ label: `Semester ${index + 1}`, gpa });
  });

  return Object.entries(groups).map(([yearLabel, data]) => ({ yearLabel, data }));
}

function calculateAverageGpa(items: { gpa: number }[]) {
  if (!items.length) return 0;
  const total = items.reduce((sum, item) => sum + item.gpa, 0);
  return total / items.length;
}
