import { useState } from 'react';
import { Link } from 'react-router-dom';

type Mode = 'individual' | 'enterprise';

type DashboardView = {
  title: string;
  description: string;
  primaryActionLabel: string;
  metrics: Array<{ label: string; value: string; change?: string; description: string }>;
  highlight: {
    title: string;
    subtitle: string;
    body: string;
    ctaLabel: string;
    ctaTo?: string;
  };
  sidePanel: {
    title: string;
    items: string[];
    tone: 'blue' | 'slate';
  };
  strategyColumns: Array<{ title: string; items: string[] }>;
  supportCards: Array<{ title: string; content: string; cta: string; to: string }>;
};

const viewContent: Record<Mode, DashboardView> = {
  individual: {
    title: 'Personal academic control center',
    description: 'Keep every semester on track with real-time GPA trends, nudges, and collaboration tools built for individual learners.',
    primaryActionLabel: 'Export progress report',
    metrics: [
      {
        label: 'Current CGPA',
        value: '3.78',
        change: '+0.12',
        description: 'Up from last semester. Stay above the 3.8 honors threshold.',
      },
      {
        label: 'Credits completed',
        value: '72 / 120',
        description: 'You are 60% through your program requirement.',
      },
      {
        label: 'Risk alerts',
        value: '1 course',
        description: 'Econometrics is trending below target. Review the guidance roadmap.',
      },
    ],
    highlight: {
      title: 'Semester progress trace',
      subtitle: 'Snapshot of GPA movements and workload balance.',
      body: 'Interactive charts render term-by-term momentum, course risk, and workload distribution. Use the calculator to explore what-if scenarios before registration freezes.',
      ctaLabel: 'Open analytics in calculator',
      ctaTo: '/grade-calculator',
    },
    sidePanel: {
      title: 'Weekly momentum',
      items: [
        'Complete two practice quizzes for Econometrics before Sunday.',
        'Upload lab reflections to keep experiential credits on track.',
        'Share updated study schedule with your accountability partner.',
      ],
      tone: 'blue',
    },
    strategyColumns: [
      {
        title: 'Immediate actions',
        items: [
          'Schedule a tutoring session for Econometrics before next assessment.',
          'Submit updated study plan to advisor for approval.',
        ],
      },
      {
        title: 'Mid-term suggestions',
        items: [
          'Swap one elective for a lighter workload next term.',
          'Track weekly progress using the Grade Master Pro calculator.',
        ],
      },
      {
        title: 'Long-term guidance',
        items: [
          'Aim for an average 3.85 across final semesters to meet honors threshold.',
          'Explore internship applications aligned with your major to strengthen outcomes.',
        ],
      },
    ],
    supportCards: [
      {
        title: 'Advisor notes',
        content: 'Draft questions, wins, and blockers ahead of your next advising session.',
        cta: 'Add meeting agenda',
        to: '/meeting-agenda',
      },
      {
        title: 'Action planner',
        content: 'Translate recommendations into tasks with due dates to keep momentum strong.',
        cta: 'Open planner',
        to: '/planner',
      },
      {
        title: 'Resource library',
        content: 'Access curated study guides, grading policies, and success templates.',
        cta: 'Browse resources',
        to: '/resources',
      },
    ],
  },
  enterprise: {
    title: 'Enterprise outcomes command center',
    description: 'Guide advisors, monitor campus-wide momentum, and align leadership around retention and completion KPIs.',
    primaryActionLabel: 'Download campus summary',
    metrics: [
      {
        label: 'Active learners',
        value: '18,420',
        change: '+4.2%',
        description: 'Students logging in weekly across all programs.',
      },
      {
        label: 'At-risk cohorts',
        value: '3 cohorts',
        description: 'Business Sophomores, STEM First-years, Evening MBA.',
      },
      {
        label: 'Advisor response time',
        value: '36 hrs',
        change: '-12 hrs',
        description: 'Average time to feedback after alert escalation.',
      },
    ],
    highlight: {
      title: 'Cohort health signals',
      subtitle: 'Monitor program performance and engagement.',
      body: 'Identify GPA dips, credit load imbalances, and stalled advising cadences across campuses. Review signals, assign owners, and push bulk nudges to learners instantly.',
      ctaLabel: 'View cohort analytics',
      ctaTo: '/product-tour',
    },
    sidePanel: {
      title: 'Team coordination spotlight',
      items: [
        'Assign success coaches to Business Sophomore alert queue.',
        'Share updated retention playbook with Dean-led task force.',
        'Invite institutional research team to weekly health review.',
      ],
      tone: 'slate',
    },
    strategyColumns: [
      {
        title: 'Immediate escalations',
        items: [
          'Trigger automated nudges for students missing two advisor meetings.',
          'Distribute Econometrics support plan to impacted cohorts.',
        ],
      },
      {
        title: 'Next-quarter roadmap',
        items: [
          'Pilot advisor capacity dashboards with three colleges.',
          'Integrate LMS assignment signals into central alert routing.',
        ],
      },
      {
        title: 'Strategic initiatives',
        items: [
          'Align leadership on completion targets for 2026.',
          'Expand family engagement program for first-generation students.',
        ],
      },
    ],
    supportCards: [
      {
        title: 'Campus-wide training',
        content: 'Schedule enablement sessions for advisors and program directors.',
        cta: 'Request workshop',
        to: '/sales/demo',
      },
      {
        title: 'Share product walkthrough',
        content: 'Send stakeholders a guided tour that showcases dashboards and alerts.',
        cta: 'Open product tour',
        to: '/product-tour',
      },
      {
        title: 'Resource collections',
        content: 'Curate templates and policy docs for faculty and student success teams.',
        cta: 'Manage resources',
        to: '/resources',
      },
    ],
  },
};

export default function Dashboard() {
  const [mode, setMode] = useState<Mode>('individual');
  const content = viewContent[mode];

  const sidePanelClasses =
    content.sidePanel.tone === 'blue'
      ? 'space-y-3 rounded-3xl border border-slate-200 bg-blue-50 p-5 text-blue-900 shadow-sm'
      : 'space-y-3 rounded-3xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm';

  return (
    <div className="min-h-0">
      <div className="mx-auto flex w-full flex-col gap-6 px-4 py-5 sm:px-5 lg:px-8">
        <header className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{content.title}</h1>
            <p className="text-sm text-slate-500 sm:text-base">{content.description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold text-slate-500 shadow-sm">
              <button
                type="button"
                onClick={() => setMode('individual')}
                className={`rounded-full px-4 py-1.5 transition ${mode === 'individual' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Individual view
              </button>
              <button
                type="button"
                onClick={() => setMode('enterprise')}
                className={`rounded-full px-4 py-1.5 transition ${mode === 'enterprise' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Enterprise view
              </button>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              {content.primaryActionLabel}
            </button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 lg:gap-4">
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.metrics.map(metric => (
              <article key={metric.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{metric.label}</span>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
                  {metric.change && (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${metric.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {metric.change}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-slate-600">{metric.description}</p>
              </article>
            ))}
          </section>

          <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
            <section className="space-y-4 lg:col-span-8">
              <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{content.highlight.title}</h2>
                    <p className="text-xs text-slate-500">{content.highlight.subtitle}</p>
                  </div>
                  {content.highlight.ctaTo ? (
                    <Link
                      to={content.highlight.ctaTo}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
                    >
                      {content.highlight.ctaLabel}
                    </Link>
                  ) : (
                    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
                      {content.highlight.ctaLabel}
                    </button>
                  )}
                </div>
                <div className="mt-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  {content.highlight.body}
                </div>
              </article>
            </section>

            <aside className={`${sidePanelClasses} lg:col-span-4 lg:sticky lg:top-28`}>
              <h2 className="text-xl font-semibold">{content.sidePanel.title}</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {content.sidePanel.items.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-current" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <section className="grid gap-4 lg:grid-cols-3">
            {content.strategyColumns.map(column => (
              <article key={column.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {column.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.supportCards.map(card => (
              <article key={card.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{card.content}</p>
                <Link
                  to={card.to}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
                >
                  {card.cta}
                </Link>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
