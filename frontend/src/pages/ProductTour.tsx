const tourSections = [
  {
    title: 'Plan every term with confidence',
    description: 'Drag-and-drop courses into semesters, preview GPA impact instantly, and lock in credit targets before registration closes.',
  },
  {
    title: 'Track outcomes in real time',
    description: 'Monitor GPA, credits, and risk signals in a unified dashboard that keeps students and advisors on the same page.',
  },
  {
    title: 'Collaborate without friction',
    description: 'Share dashboards, leave guidance notes, and capture meeting agendas to keep academic support loops short and effective.',
  },
];

export default function ProductTour() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Grade Master Pro walkthrough</h1>
        <p className="text-base text-slate-600">
          Explore how planning, analytics, and collaboration flow together across the Grade Master Pro platform.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tourSections.map(section => (
          <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{section.description}</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600">
              Watch section
            </button>
          </article>
        ))}
      </section>

      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
        <h2 className="text-base font-semibold text-slate-900">Want a personalized tour?</h2>
        <p className="mt-2">
          Invite stakeholders and we will tailor a session around your objectives. Head to the <span className="font-semibold text-blue-600">enterprise demo request</span> page to get started.
        </p>
      </div>
    </div>
  );
}
