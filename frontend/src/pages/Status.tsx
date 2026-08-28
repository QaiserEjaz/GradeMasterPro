import { Link } from 'react-router-dom';

export default function Status() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">System Status</h1>
        <p className="text-base text-slate-600">
          All services are operating normally. Subscribe to updates to stay informed about future maintenance windows.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Recent incidents</h2>
        <p className="mt-2 text-sm text-slate-600">
          No incidents reported in the last 30 days.
        </p>
      </div>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
        <p>
          Want to receive notifications? Visit the <Link to="/settings" className="font-medium text-blue-600 hover:text-blue-700">Settings</Link> page to configure alerts.
        </p>
      </div>
    </div>
  );
}
