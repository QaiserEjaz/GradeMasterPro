export default function Dashboard() {
  const progressItems = [
    {
      label: 'Current CGPA',
      value: '3.78',
      change: '+0.12',
      description: 'Up from last semester. Keep pace to reach your 3.8 goal.',
    },
    {
      label: 'Credits Completed',
      value: '72 / 120',
      description: 'You are 60% through your program requirement.',
    },
    {
      label: 'Risk Alerts',
      value: '1 course',
      description: 'Econometrics is trending below target. Review guidance below.',
    },
  ];

  const guidanceRoadmap = [
    {
      title: 'Immediate Actions',
      items: [
        'Schedule a tutoring session for Econometrics before next assessment.',
        'Submit updated study plan to advisor for approval.',
      ],
    },
    {
      title: 'Mid-Term Suggestions',
      items: [
        'Consider swapping one elective for a lighter workload next term.',
        'Track weekly progress using the Grade Master Pro calculator to avoid surprises.',
      ],
    },
    {
      title: 'Long-Term Guidance',
      items: [
        'Aim for an average of 3.85 across the final two semesters to meet honors threshold.',
        'Explore internship opportunities aligned with your major to strengthen applications.',
      ],
    },
  ];

  const supportCards = [
    {
      title: 'Advisor Notes',
      content: 'Draft notes for your next meeting. Capture questions, wins, and blockers to discuss.',
      cta: 'Add meeting agenda',
    },
    {
      title: 'Resource Library',
      content: 'Access curated study guides, grading policies, and success templates saved by your institution.',
      cta: 'Browse resources',
    },
    {
      title: 'Action Planner',
      content: 'Translate recommendations into tasks with due dates to keep momentum strong.',
      cta: 'Open planner',
    },
  ];

  return (
    <div className="mx-auto flex w-full flex-col gap-12 px-4 py-10 sm:px-6 lg:px-12">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Visualise your academic trajectory, monitor progress, and follow guided recommendations from Grade Master Pro.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Export Progress Report
        </button>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {progressItems.map(item => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{item.value}</span>
              {item.change && (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">{item.change}</span>
              )}
            </div>
            <p className="mt-3 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Semester Progress Trace</h2>
              <p className="text-xs text-slate-500">Snapshot of GPA movements and workload balance.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
              View Analytics
            </button>
          </div>
          <div className="h-56 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Interactive charts will render here: GPA trendline, credit distribution, and risk matrix.
          </div>
        </div>
        <div className="space-y-5 rounded-3xl border border-slate-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-900">Weekly Momentum</h2>
          <ul className="space-y-3 text-sm text-blue-900">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-hidden />
              <span>Complete two practice quizzes for Econometrics before Sunday.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-hidden />
              <span>Upload lab reflections to keep experiential credits on track.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-hidden />
              <span>Share updated study schedule with accountability partner.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {guidanceRoadmap.map(section => (
          <div key={section.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {section.items.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {supportCards.map(card => (
          <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.content}</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
              {card.cta}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
