export default function Settings() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-base text-slate-600">
          Configure Grade Master Pro to match your workflow. Toggle upcoming features and manage integrations here.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
          <p className="mt-2 text-sm text-slate-600">
            Tailor email summaries and in-app nudges so you always know when grades, credits, or alerts change.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Integrations</h2>
          <p className="mt-2 text-sm text-slate-600">
            Connect learning platforms, SIS data, and productivity tools to keep your academic plan in sync.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
        <p>
          Advanced settings are under development. Reach out to sales if you need early access or custom configuration.
        </p>
      </div>
    </div>
  );
}
