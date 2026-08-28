import { useState } from 'react';

const ticketCategories = ['Account access', 'Data & syncing', 'Advisor collaboration', 'Other'];

export default function SupportTicket() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-0">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Submit a support ticket</h1>
        <p className="text-base text-slate-600">
          Our support specialists respond within one business day. Share as much context as possible so we can help quickly.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xl">✓</div>
            <h2 className="text-xl font-semibold text-slate-900">Ticket received</h2>
            <p className="text-sm text-slate-600">
              Thank you for reaching out. Keep an eye on your inbox—one of our support specialists will follow up shortly.
            </p>
          </div>
        ) : (
          <form
            className="grid gap-5"
            onSubmit={event => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-800">
                Full name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Taylor Morgan"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-800">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.edu"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-semibold text-slate-800">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select one</option>
                  <option>Student</option>
                  <option>Advisor</option>
                  <option>Administrator</option>
                  <option>Parent or supporter</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-semibold text-slate-800">
                What do you need help with?
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                {ticketCategories.map(category => (
                  <label
                    key={category}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-blue-400 hover:text-slate-900"
                  >
                    <input type="radio" name="category" value={category} required className="text-blue-600 focus:ring-blue-500" />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-semibold text-slate-800">
                Describe the issue
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                placeholder="Share any error messages, relevant links, or screenshots."
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">By submitting, you agree to our support response SLA and privacy policy.</p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Submit ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
