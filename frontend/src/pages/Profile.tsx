export default function Profile() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Your Profile</h1>
        <p className="text-base text-slate-600">
          Manage your personal details, academic preferences, and notification settings from one place.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Account Basics</h2>
          <p className="mt-2 text-sm text-slate-600">
            Update your name, institution, and primary email address so collaborators recognise your workspace.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Learning preferences</h2>
          <p className="mt-2 text-sm text-slate-600">
            Choose grading scales, term formats, and advisory preferences to tailor insights to your academic journey.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
        <p>
          Profile management features are coming soon. Meanwhile, contact support if you need manual adjustments.
        </p>
      </div>
    </div>
  );
}
