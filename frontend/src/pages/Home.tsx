import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Universal Grade Calculator</h1>
      <p className="mt-2 text-gray-700">Calculate GPA/CGPA across multiple international grading systems and get insights.</p>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <h3 className="font-semibold">Multi-System Support</h3>
          <p className="text-sm text-gray-600">USA, India, UK, Germany, Australia and more.</p>
        </div>
        <div className="border rounded p-4">
          <h3 className="font-semibold">Quality Points & Weighted</h3>
          <p className="text-sm text-gray-600">Credit-weighted averages and QP calculations.</p>
        </div>
        <div className="border rounded p-4">
          <h3 className="font-semibold">AI Insights</h3>
          <p className="text-sm text-gray-600">Trends, suggestions, and predictions (backend required).</p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link to="/calculator" className="px-4 py-2 bg-blue-600 text-white rounded">Open Calculator</Link>
        <Link to="/dashboard" className="px-4 py-2 border rounded">View Dashboard</Link>
      </div>
    </div>
  );
}
