import { Suspense, useState } from 'react';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { GradeCalculator } from './pages/GradeCalculator';
import { FloatingCalculator } from './components/FloatingCalculator';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMobileMenu = () => setMobileNavOpen(false);

  const handleCalculatorClick = () => {
    setCalculatorOpen(true);
  };

  const closeCalculator = () => {
    setCalculatorOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur">
        <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900" onClick={closeMobileMenu}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">UG</span>
            <span>Universal Grade Calculator</span>
          </Link>
          <button
            type="button"
            aria-expanded={mobileNavOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
            onClick={() => setMobileNavOpen(prev => !prev)}
          >
            <span className="text-base font-semibold">{mobileNavOpen ? 'Close' : 'Menu'}</span>
          </button>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link className="transition hover:text-slate-900" to="/" onClick={closeMobileMenu}>Home</Link>
            <Link className="transition hover:text-slate-900" to="/grade-calculator" onClick={closeMobileMenu}>Grade Calculator</Link>
            <Link className="transition hover:text-slate-900" to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
          </div>
          <Link
            to="/grade-calculator"
            className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 md:inline-flex"
            onClick={closeMobileMenu}
          >
            Launch Grade Calculator
          </Link>
        </div>
        {mobileNavOpen && (
          <div className="border-t border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-600 shadow-sm sm:px-6 lg:px-10 md:hidden">
            <div className="flex flex-col gap-3">
              <Link className="transition hover:text-slate-900" to="/" onClick={closeMobileMenu}>Home</Link>
              <Link className="transition hover:text-slate-900" to="/grade-calculator" onClick={closeMobileMenu}>Grade Calculator</Link>
              <Link className="transition hover:text-slate-900" to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
              <Link
                to="/grade-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                onClick={closeMobileMenu}
              >
                Launch Grade Calculator
              </Link>
            </div>
          </div>
        )}
      </nav>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grade-calculator" element={<GradeCalculator />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>

      {/* Floating Grade Calculator Button */}
      <button
        onClick={handleCalculatorClick}
        className="fixed bottom-6 right-6 z-[9999] inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Open Grade Calculator"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Floating Calculator Modal */}
      <FloatingCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}


