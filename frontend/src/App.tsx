import { Suspense, useEffect, useState, type ReactNode } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { GradeCalculator } from './pages/GradeCalculator';
import { FloatingCalculator } from './components/FloatingCalculator';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import SettingsPage from './pages/Settings';
import Status from './pages/Status';
import SupportTicket from './pages/SupportTicket';
import SalesDemo from './pages/SalesDemo';
import Planner from './pages/Planner';
import ResourceLibrary from './pages/ResourceLibrary';
import MeetingAgenda from './pages/MeetingAgenda';
import ProductTour from './pages/ProductTour';

type ShellProps = {
  children: ReactNode;
  showSidebar?: boolean;
  showFloatingCalculator?: boolean;
};

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  const isHomeRoute = location.pathname === '/';

  const closeMobileMenu = () => setMobileNavOpen(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Grade Calculator', path: '/grade-calculator' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Planner', path: '/planner' },
    { label: 'Resources', path: '/resources' },
    { label: 'Contact', path: '/contact' },
    { label: 'Product Tour', path: '/product-tour' },
    { label: 'Meeting Agenda', path: '/meeting-agenda' },
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings' },
  ];

  useEffect(() => {
    setMobileNavOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCalculatorClick = () => {
    setCalculatorOpen(true);
  };

  const closeCalculator = () => {
    setCalculatorOpen(false);
  };

  const Shell = ({ children, showSidebar = true, showFloatingCalculator = true }: ShellProps) => {
    const mainClasses = `min-w-0 flex-1${showSidebar ? ' lg:ml-80' : ''}`;
    const containerClasses = `flex w-full items-stretch ${showSidebar ? 'gap-3 lg:gap-4' : ''} px-4 pb-12 sm:px-6 ${showSidebar ? 'lg:px-9' : 'lg:px-12'}`;

    return (
      <>
        <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10 lg:pt-6 backdrop-blur">
          <div className="pointer-events-auto rounded-3xl border border-slate-200 bg-white/90 px-4 py-2 shadow-xl backdrop-blur sm:px-5 lg:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-expanded={mobileNavOpen}
                  aria-label="Toggle navigation menu"
                  className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
                  onClick={() => setMobileNavOpen(prev => !prev)}
                >
                  <span className="text-base font-semibold">{mobileNavOpen ? 'Close' : 'Menu'}</span>
                </button>
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900" onClick={closeMobileMenu}>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-bold">GM</span>
                  <span>Grade Master Pro</span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 md:inline-flex"
                >
                  Sign in to Grade Master Pro
                </Link>
                <div className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    onClick={() => setUserMenuOpen(prev => !prev)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">AR</span>
                    <span className="hidden sm:inline">Account</span>
                    <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 z-50 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 text-sm text-slate-600 shadow-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate('/profile');
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">👤</span>
                        Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate('/settings');
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">⚙️</span>
                        Settings
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-600 transition hover:bg-red-50"
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">↩</span>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {mobileNavOpen && (
              <div className="mt-3 rounded-2xl border border-slate-100 bg-white/95 p-3 text-sm text-slate-600 shadow-md lg:hidden">
                <div className="flex flex-col gap-2">
                  {navItems.map(item => (
                    <Link
                      key={item.path}
                      className={`rounded-lg px-3 py-2 transition ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 hover:text-slate-900'}`}
                      to={item.path}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to="/support/ticket"
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    onClick={closeMobileMenu}
                  >
                    Submit a ticket
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className={containerClasses}>
          {showSidebar && (
            <aside className="hidden w-72 shrink-0 rounded-3xl border border-slate-200 bg-white/80 px-5 py-6 shadow-sm backdrop-blur lg:fixed lg:left-9 lg:top-28 lg:flex lg:h-[calc(100vh-7.5rem)] lg:flex-col lg:overflow-y-auto">
              <div className="mb-6 text-xs font-semibold uppercase tracking-wide text-slate-500">Navigate</div>
              <div className="flex flex-col gap-1">
                {navItems.map(item => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden />}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-auto rounded-2xl border border-slate-200 bg-blue-50 p-4 text-sm text-slate-700">
                <h3 className="text-base font-semibold text-blue-700">Need quick grades?</h3>
                <p className="mt-2 text-xs text-blue-600">Jump into the calculator and start tracking instantly.</p>
                <Link
                  to="/grade-calculator"
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Open calculator
                </Link>
              </div>
            </aside>
          )}

          <main className={mainClasses}>{children}</main>
        </div>

        {showFloatingCalculator && (
          <button
            onClick={handleCalculatorClick}
            className="fixed bottom-6 right-6 z-[9999] inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 lg:right-12"
            aria-label="Open Grade Calculator"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
        )}
      </>
    );
  };

  return (
    <div className={`min-h-screen bg-slate-100 ${isHomeRoute ? 'pt-0' : 'pt-24 lg:pt-28'}`}>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/grade-calculator" element={<Shell showFloatingCalculator={true}><GradeCalculator /></Shell>} />
          <Route path="/dashboard" element={<Shell showSidebar={true}><Dashboard /></Shell>} />
          <Route path="/planner" element={<Shell showSidebar={true}><Planner /></Shell>} />
          <Route path="/resources" element={<Shell showSidebar={true}><ResourceLibrary /></Shell>} />
          <Route path="/product-tour" element={<Shell showSidebar={true}><ProductTour /></Shell>} />
          <Route path="/meeting-agenda" element={<Shell showSidebar={true}><MeetingAgenda /></Shell>} />
          <Route path="/contact" element={<Shell showSidebar={true} showFloatingCalculator={false}><Contact /></Shell>} />
          <Route path="/support/ticket" element={<Shell showSidebar={false} showFloatingCalculator={false}><SupportTicket /></Shell>} />
          <Route path="/support" element={<Navigate to="/support/ticket" replace />} />
          <Route path="/sales-demo" element={<Shell showSidebar={false} showFloatingCalculator={false}><SalesDemo /></Shell>} />
          <Route path="/sales/demo" element={<Navigate to="/sales-demo" replace />} />
          <Route path="/profile" element={<Shell showSidebar={true} showFloatingCalculator={false}><Profile /></Shell>} />
          <Route path="/settings" element={<Shell showSidebar={true} showFloatingCalculator={false}><SettingsPage /></Shell>} />
          <Route path="/status" element={<Shell showSidebar={false} showFloatingCalculator={false}><Status /></Shell>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {!isLoginRoute && <FloatingCalculator isOpen={calculatorOpen} onClose={closeCalculator} />}
    </div>
  );
}


