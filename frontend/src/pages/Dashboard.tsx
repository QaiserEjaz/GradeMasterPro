export default function Dashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Overview</h3>
          <p className="text-sm text-gray-600">Sign in and save calculations to see your trends and summaries here.</p>
        </div>
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Charts</h3>
          <p className="text-sm text-gray-600">Charts will appear here (GPA trends, credit distribution).</p>
        </div>
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Recent History</h3>
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>No saved calculations yet.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
