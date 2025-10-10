import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="mx-auto flex w-full flex-col gap-16 px-4 py-10 sm:px-6 lg:px-12">
      <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
            Meet Grade Master Pro
          </span>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Smarter planning for every semester, anywhere in the world.
          </h1>
          <p className="text-base text-slate-600 sm:text-lg">
            Grade Master Pro unifies multi-country grading scales, weighted GPA tracking, and actionable coaching so you can steer your academic journey with confidence.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Sign in to Get Started
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Preview Login Options
            </Link>
          </div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Secure access via Auth0 social login or institutional credentials.
          </p>
        </div>
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="absolute -right-8 top-6 hidden h-32 w-32 rounded-full bg-blue-100/70 blur-2xl lg:block" aria-hidden />
            <div className="absolute -bottom-10 left-10 hidden h-36 w-36 rounded-full bg-indigo-100/60 blur-3xl lg:block" aria-hidden />
            <div className="relative grid gap-4 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Global grade systems</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                  15+ supported
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Switch seamlessly between USA 4.0, India 10-point, UK honours, German 1.0, Australian HD/DI and more.
              </p>
              <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-xs uppercase tracking-wide text-slate-500">At a glance</span>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <p className="text-xs text-slate-500">Current CGPA</p>
                    <p className="text-lg font-semibold text-slate-900">3.78</p>
                  </div>
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <p className="text-xs text-slate-500">Credits Planned</p>
                    <p className="text-lg font-semibold text-slate-900">18</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Visualisation for illustration. Connect to your data on the dashboard for live insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8">
        <h2 className="text-2xl font-bold text-slate-900">Why students choose Grade Master Pro</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: 'Unified Grade Intelligence',
              description: 'Compare semester performance across international scales without manual conversions or spreadsheets.',
            },
            {
              title: 'Adaptive Planning Toolkit',
              description: 'Scenario planning, credit forecasts, and automated GPA projections keep your targets realistic and reachable.',
            },
            {
              title: 'Collaboration Ready',
              description: 'Share structured reports with advisors, mentors, or parents and align on next steps instantly.',
            },
            {
              title: 'Actionable Alerts',
              description: 'Smart nudges highlight at-risk courses, workload spikes, and opportunities to improve your transcript.',
            },
            {
              title: 'Secure, Cloud Synced',
              description: 'Save progress, sync across devices, and restore your workspace whenever you sign back in.',
            },
            {
              title: 'Built for Growth',
              description: 'From freshmen to final-year projects, Grade Master Pro scales with deeper insights as your journey evolves.',
            },
          ].map(feature => (
            <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">How it helps</span>
          <h2 className="text-2xl font-bold text-slate-900">Turn raw grades into a personalised success plan</h2>
          <div className="space-y-5 text-sm text-slate-600">
            <div>
              <h3 className="font-semibold text-slate-900">Clear path to your goals</h3>
              <p className="mt-1">
                Align coursework with scholarship thresholds, graduate school cutoffs, or personal milestones using real-time projections.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Guided workload balancing</h3>
              <p className="mt-1">
                Spot overloaded terms early and redistribute credits with semester-by-semester visual guidance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Evidence-backed decisions</h3>
              <p className="mt-1">
                Use historical performance trends and what-if simulations to decide on electives, retakes, or study-abroad plans.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 text-sm text-slate-600">
          <div className="rounded-3xl border border-slate-200 bg-blue-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800">Built for every academic scenario</h3>
            <ul className="mt-3 space-y-2 text-sm text-blue-900">
              <li>• International students comparing transcripts</li>
              <li>• Scholarship aspirants monitoring eligibility</li>
              <li>• Counselors guiding advisees across curricula</li>
              <li>• Working professionals pursuing further education</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Ready to start?</h3>
            <p className="mt-2 text-sm">
              Head to the dashboard for progress snapshots or jump straight into the Grade Calculator to map your next semester.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Sign In / Create Account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Learn About Authentication
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
