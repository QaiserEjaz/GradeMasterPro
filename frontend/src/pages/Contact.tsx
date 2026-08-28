import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-0">
      <div className="mx-auto flex w-full flex-col gap-6 px-4 py-5 sm:px-5 lg:px-8">
        <header className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Contact Grade Master Pro</h1>
            <p className="text-sm text-slate-500 sm:text-base">
              We would love to hear from you. Reach out to our support or sales teams and we will respond within one business day.
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 lg:gap-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Support</h2>
              <p className="mt-2 text-sm text-slate-600">
                Need help with your workspace? Open a ticket and our support specialists will guide you step-by-step.
              </p>
              <Link to="/support/ticket" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700">
                Submit a ticket →
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Sales</h2>
              <p className="mt-2 text-sm text-slate-600">
                Interested in enterprise subscriptions or campus-wide deployment? Schedule time with our partnerships team.
              </p>
              <Link to="/sales-demo" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700">
                Book a demo →
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
            <p>
              Prefer email? Write to <span className="font-medium text-slate-900">hello@grademasterpro.com</span> and we will connect you with the right team.
            </p>
            <p className="mt-3">
              Looking for system status updates? Visit our <Link to="/status" className="font-medium text-blue-600 hover:text-blue-700">Status page</Link> for real-time information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
