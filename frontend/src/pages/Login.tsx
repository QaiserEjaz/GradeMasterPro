import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useStore } from '../store/useStore';

export default function Login() {
  const navigate = useNavigate();
  const setUser = useStore(state => state.setUser);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const response = isRegistering
        ? await authAPI.register(email, password, name)
        : await authAPI.login(email, password);

      localStorage.setItem('token', response.token);
      if (response.user) {
        setUser(response.user);
      }
      navigate('/dashboard');
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Authentication failed. Check the API and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-3xl flex-col justify-center gap-10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
          Access Grade Master Pro
        </span>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{isRegistering ? 'Create your account' : 'Sign in to continue'}</h1>
        <p className="text-base text-slate-600">
          {isRegistering ? 'Create an account to save calculations and track your academic progress.' : 'Use your GradeMaster Pro account to continue planning.'}
        </p>
      </div>

      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegistering && (
            <label className="block text-sm font-medium text-slate-700">
              Name
              <input required value={name} onChange={event => setName(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </label>
          )}
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input required type="email" value={email} onChange={event => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input required minLength={8} type="password" value={password} onChange={event => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </label>
          {message && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{message}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? 'Please wait...' : isRegistering ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <button type="button" onClick={() => setMessage('Auth0 is not configured yet. Add an Auth0 tenant, client ID, and backend token validation before enabling this provider.')} className="mt-3 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-900">
          Continue with Auth0
        </button>

        <button type="button" onClick={() => { setIsRegistering(previous => !previous); setMessage(''); }} className="mt-4 w-full text-sm font-semibold text-blue-600 hover:text-blue-700">
          {isRegistering ? 'Already have an account? Sign in' : 'Need an account? Register'}
        </button>
      </div>

      <p className="text-center text-xs text-slate-500">
        Need help? <Link to="/contact" className="font-semibold text-blue-600 hover:text-blue-700">Contact support</Link>.
      </p>
    </div>
  );
}
