import type { GradingSystem } from '../../types';

interface GradingSystemDetailsProps {
  system: GradingSystem;
}

export function GradingSystemDetails({ system }: GradingSystemDetailsProps) {
  return (
    <div className="mt-3 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">Grade Scale</p>
          <p className="text-xs text-gray-500">Letter grades mapped to points and percentage bands.</p>
        </div>
        <span className="text-xs font-medium text-gray-500">{system.grades.length} entries</span>
      </div>
      <div className="max-h-60 overflow-auto">
        <table className="min-w-full text-left text-xs text-gray-600">
          <thead className="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-500">
            <tr>
              <th scope="col" className="px-4 py-2">Grade</th>
              <th scope="col" className="px-4 py-2">Points</th>
              <th scope="col" className="px-4 py-2">Min %</th>
              <th scope="col" className="px-4 py-2">Max %</th>
            </tr>
          </thead>
          <tbody>
            {system.grades.map((grade) => (
              <tr key={`${system.id}-${grade.letter}-${grade.minPercentage}`} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2 font-semibold text-gray-800">{grade.letter}</td>
                <td className="px-4 py-2 text-gray-700">{grade.points.toFixed(2)}</td>
                <td className="px-4 py-2">{grade.minPercentage ?? '—'}</td>
                <td className="px-4 py-2">{grade.maxPercentage ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
