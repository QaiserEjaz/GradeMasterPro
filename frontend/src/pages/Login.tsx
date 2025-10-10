import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-3xl flex-col justify-center gap-10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
          Access Grade Master Pro
        </span>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Choose how you want to sign in</h1>
        <p className="text-base text-slate-600">
          Grade Master Pro uses Auth0 for secure authentication. Connect quickly with Google or other social providers,
          or verify your institutional email with one-time passcodes or enterprise SSO.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Students & Individuals</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Continue with Google, Microsoft, or Apple</li>
            <li>• Passwordless login via email magic link</li>
            <li>• Optional MFA for additional security</li>
          </ul>
          <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Continue with Auth0
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Schools & Institutions</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Dedicated domain-based login</li>
            <li>• Email + OTP verification or SAML/SSO</li>
            <li>• Provision advisor dashboards automatically</li>
          </ul>
          <button className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-900">
            Request Institutional Access
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
        <h3 className="text-base font-semibold text-slate-800">What happens next?</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Authenticate through your chosen provider.</li>
          <li>Confirm email and set any required security factors.</li>
          <li>We redirect you to the Grade Master Pro dashboard to continue planning.</li>
        </ol>
        <p className="mt-4 text-xs text-slate-500">
          Need help connecting your account? <Link to="/" className="font-semibold text-blue-600 hover:text-blue-700">Review the overview</Link> or
          contact your administrator for institutional setup.
        </p>
      </div>
    </div>
  );
}
