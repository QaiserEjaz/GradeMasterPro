import { useState } from 'react';

export default function SalesDemo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-0">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Book an enterprise demo</h1>
        <p className="text-base text-slate-600">
          Explore institutional analytics, advisor collaboration, and rollout services tailored to your campus.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xl">✓</div>
            <h2 className="text-xl font-semibold text-slate-900">Demo request submitted</h2>
            <p className="text-sm text-slate-600">
              Our partnerships team will reach out within one business day to coordinate a walkthrough.
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
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="grid gap-2">
                <label htmlFor="contactName" className="text-sm font-semibold text-slate-800">
                  Name
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  required
                  placeholder="Jordan Singh"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contactEmail" className="text-sm font-semibold text-slate-800">
                  Work email
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  required
                  placeholder="you@university.edu"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="grid gap-2">
                <label htmlFor="institution" className="text-sm font-semibold text-slate-800">
                  Institution or organization
                </label>
                <input
                  id="institution"
                  name="institution"
                  required
                  placeholder="Horizon University"
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
                  <option>Dean / Program Director</option>
                  <option>Student Success Lead</option>
                  <option>IT / Systems Owner</option>
                  <option>Admissions / Enrollment</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="focus" className="text-sm font-semibold text-slate-800">
                Areas of interest
              </label>
              <textarea
                id="focus"
                name="focus"
                rows={5}
                required
                placeholder="Share what outcomes you want to achieve, current tooling, and stakeholders to include."
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-800">Preferred timing</label>
              <div className="grid gap-2 sm:grid-cols-3">
                {['This week', 'Next week', 'Flexible'].map(option => (
                  <label key={option} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-blue-400 hover:text-slate-900">
                    <input type="radio" name="timing" value={option} required className="text-blue-600 focus:ring-blue-500" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Submit demo request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
