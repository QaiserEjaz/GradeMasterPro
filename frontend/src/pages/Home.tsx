import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  TrendingUp,
  Target,
  Users,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Scale,
  MessageSquare,
  Calculator,
  Zap,
  Star,
  Building,
  Shield,
  Headphones,
  Lightbulb,
  Globe,
  ArrowRight,
  Play,
  Menu,
  X,
  Plus,
  Minus,
  ArrowLeft,
  Check,
  LayoutDashboard,
  Calendar,
  AreaChart,
  Inbox,
  Quote
} from 'lucide-react';

// Add CSS animation styles
const styles = `
@keyframes infinite-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes testimonial-infinite-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-infinite-scroll {
  animation: infinite-scroll 50s linear infinite;
}

.animate-infinite-scroll:hover {
  animation-play-state: paused;
}

.testimonial-scroll {
  animation: testimonial-infinite-scroll 50s linear infinite;
}

.testimonial-scroll:hover {
  animation-play-state: paused;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;

export default function Home() {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const navigate = useNavigate();
  const solutionPillars = [
    {
      title: "Unified grade intelligence",
      description: "Aggregate GPA and grading data across international schemas, custom scales, and historic transcripts in one source of truth.",
      icon: BarChart3,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Adaptive planning toolkit",
      description: "Model what-if scenarios, balance credit loads, and forecast outcomes before registration deadlines hit.",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Guided collaboration",
      description: "Share dashboards with mentors, parents, or student success teams to keep everyone aligned on progress.",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Actionable alerts",
      description: "Receive proactive nudges when academic risk appears so intervention happens before grades slip.",
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];
  const workflowSteps = [
    {
      title: "Connect your context",
      description: "Select grading systems, import historic performance, and define your goals so the workspace reflects your reality.",
      step: "01",
      color: "bg-blue-600",
      icon: CheckCircle
    },
    {
      title: "Plan and simulate",
      description: "Drag-and-drop courses into terms, adjust weightings, and instantly see the impact on CGPA and credit milestones.",
      step: "02",
      color: "bg-purple-600",
      icon: Scale
    },
    {
      title: "Track, share, iterate",
      description: "Publish snapshots for advisors, export reports for applications, and refine plans as new results arrive.",
      step: "03",
      color: "bg-emerald-600",
      icon: MessageSquare
    }
  ];
  const enterpriseHighlights = [
    {
      title: "Centralised program analytics",
      description: "Surface cross-cohort insights with custom dashboards for deans, program directors, and retention teams.",
      metric: "12k+ students tracked",
      icon: TrendingUp
    },
    {
      title: "Institution-level governance",
      description: "Single sign-on, role-based access, and compliance tooling built for multi-campus operations.",
      metric: "SSO & RBAC ready",
      icon: Shield
    },
    {
      title: "Launch and success services",
      description: "Onboarding specialists, migration support, and quarterly strategy sessions keep your rollout thriving.",
      metric: "White-glove support",
      icon: Headphones
    },
    {
      title: "Dedicated product roadmap",
      description: "Co-create features with our team and unlock early access to innovations shaped by enterprise partners.",
      metric: "Co-development access",
      icon: Lightbulb
    }
  ];
  const partnerLogos = ["Vector University", "Northern Scholars", "Global U Alliance", "Vision Prep", "Atlas College", "Meridian Academy", "Apex Institute", "Summit Education"];
  const testimonials = [
    { quote: "Grade Master Pro has been a game-changer for our advising department. The ability to see a unified student record and proactively identify risks has reduced our response time by half.", name: "Dr. Alisha Chen", role: "Head of Advising, Vector University", avatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5, },
    { quote: "As a student juggling a double major, this tool is my source of truth. I can plan my semesters, simulate my GPA, and share my progress with my mentor effortlessly. I feel so much more in control.", name: "Samuel Jones", role: "B.Sc. Computer Science & Economics", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5, },
    { quote: "Deploying this across our multi-campus institution was seamless. The enterprise-level analytics provide insights we've never had before, directly impacting our student retention strategies.", name: "Maria Rodriguez", role: "Dean of Student Success, Global U Alliance", avatar: "https://randomuser.me/api/portraits/women/68.jpg", rating: 5, },
    { quote: "The grade simulation feature helped me understand exactly what I needed to achieve in my final semester. I went from stressed to confident overnight.", name: "Jessica Park", role: "B.A. Psychology Student", avatar: "https://randomuser.me/api/portraits/women/25.jpg", rating: 5, },
    { quote: "As a tutor, I use Grade Master Pro to help my students visualize their academic paths. The collaborative features make it easy to work together on planning.", name: "Prof. David Kim", role: "Academic Tutor & Career Advisor", avatar: "https://randomuser.me/api/portraits/men/78.jpg", rating: 5, },
    { quote: "Our entire freshman cohort uses this platform. The onboarding process is intuitive, and students immediately understand how to track their progress.", name: "Dr. Amanda Foster", role: "Freshman Program Director", avatar: "https://randomuser.me/api/portraits/women/33.jpg", rating: 5, },
    { quote: "I transferred from a different university and this tool made the credit transfer process so much smoother. I could see exactly how my credits would apply.", name: "Marcus Thompson", role: "Transfer Student, Business Administration", avatar: "https://randomuser.me/api/portraits/men/45.jpg", rating: 5, },
    { quote: "The automated alerts saved several of my students from academic probation. Being proactive rather than reactive has transformed our advising approach.", name: "Lisa Wang", role: "Student Success Coordinator", avatar: "https://randomuser.me/api/portraits/women/56.jpg", rating: 5, },
    { quote: "Planning my graduate school applications became so much easier with the progress tracking and milestone features. I can see my academic journey clearly.", name: "Ryan Chen", role: "Pre-Med Student", avatar: "https://randomuser.me/api/portraits/men/29.jpg", rating: 5, },
    { quote: "For international students like me, understanding different grading systems can be confusing. This platform bridges that gap perfectly.", name: "Priya Sharma", role: "International Student, Engineering", avatar: "https://randomuser.me/api/portraits/women/41.jpg", rating: 5, },
    { quote: "The collaborative dashboards allow our entire family to stay involved in my academic progress. My parents can see my planning without being intrusive.", name: "Emma Rodriguez", role: "High School Senior", avatar: "https://randomuser.me/api/portraits/women/22.jpg", rating: 5, },
    { quote: "As department chair, I appreciate the institutional analytics. We can now identify trends across programs and make data-driven decisions.", name: "Dr. Michael Torres", role: "Department Chair, Liberal Arts", avatar: "https://randomuser.me/api/portraits/men/67.jpg", rating: 5, }
  ];
  const faqs = [
    { question: "What grading systems does Grade Master Pro support?", answer: "Our platform is designed for global compatibility, supporting a wide range of grading systems including GPA (4.0, 5.0, etc.), percentage-based scales, letter grades (A-F), and international standards like the ECTS. You can also create custom scales for specialized programs." },
    { question: "Is my academic data secure?", answer: "Absolutely. We use industry-standard encryption for data in transit and at rest. Your privacy and data security are our top priorities. We are compliant with GDPR, FERPA, and other major data protection regulations." },
    { question: "Can I integrate with my institution's existing systems?", answer: "Yes, our Enterprise plan offers robust integration capabilities with major Student Information Systems (SIS) and Learning Management Systems (LMS) like Banner, PeopleSoft, Canvas, and Moodle, enabling seamless data synchronization." },
    { question: "How does the free plan differ from the paid plans?", answer: "The free plan provides core features for individual students, including grade tracking and basic GPA simulation. Paid plans unlock advanced features like what-if scenario modeling, collaborative dashboards, proactive alerts, and comprehensive reporting tools." },
  ];
  const pricingPlans = [
    {
      name: "Student",
      price: "Free",
      description: "For individual students to track grades and plan their academic journey.",
      features: [
        "Track up to 20 courses",
        "Basic GPA calculation",
        "Single academic plan",
        "Community support",
      ],
      cta: "Get started free",
      href: "#",
      isFeatured: false,
    },
    {
      name: "Pro",
      price: "$8",
      priceSuffix: "/ month",
      description: "For dedicated learners and tutors who need advanced planning tools.",
      features: [
        "Unlimited courses and plans",
        "What-if scenario modeling",
        "Multi-schema grade conversion",
        "Collaborative dashboards",
        "Priority email support",
      ],
      cta: "Start Pro trial",
      href: "#",
      isFeatured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For institutions seeking to enhance student success at scale.",
      features: [
        "All Pro features",
        "Institution-wide analytics",
        "SIS & LMS integration",
        "Dedicated success manager",
        "SSO & advanced security",
      ],
      cta: "Contact Sales",
      href: "#",
      isFeatured: false,
    },
  ];

  const outcomeStats = [
    { value: "12k+", label: "academic plans published", icon: TrendingUp },
    { value: "3x", label: "faster advising cycles", icon: Zap },
    { value: "98%", label: "student satisfaction", icon: Star }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
      { name: "Features", href: "#features" },
      { name: "Solutions", href: "#solutions" },
      { name: "Pricing", href: "#pricing" },
      { name: "Enterprise", href: "#enterprise" },
      { name: "FAQ", href: "#faq" },
    ];

    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      if (isOpen) {
          setIsOpen(false);
      }
    };

    const handleLogout = () => {
      if (!window.confirm('Are you sure you want to log out?')) return;
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    };

    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/80">
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="#" className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"></div>
                <span className="hidden sm:inline">GradeMaster Pro</span>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              {user ? <button type="button" onClick={handleLogout} className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 transition-colors">Log out</button> : <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 transition-colors">Sign In</Link>}
              <Link to={user ? '/dashboard' : '/login'} className="group inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105">
                {user ? 'Open dashboard' : 'Get started'}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-slate-200/80 p-2 text-slate-700 hover:bg-slate-300/80 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </nav>

        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-200/80 hover:text-slate-900">{link.name}</a>
              ))}
            </div>
            <div className="border-t border-slate-200 px-2 py-3 space-y-2">
              {user ? <button type="button" onClick={handleLogout} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-200/80 hover:text-slate-900">Log out</button> : <Link to="/login" className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-200/80 hover:text-slate-900">Sign In</Link>}
              <Link to={user ? '/dashboard' : '/login'} className="block w-full text-left rounded-md bg-slate-900 px-3 py-2 text-base font-medium text-white">{user ? 'Open dashboard' : 'Get started'}</Link>
            </div>
          </div>
        )}
      </header>
    );
  };

  return (
    <div className="bg-slate-50">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Header />
      <main>
        <div className="flex w-full flex-col gap-12 px-4 pb-8 pt-8 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 px-6 py-8 shadow-lg backdrop-blur sm:px-8 lg:px-10 lg:py-12">
            {/* Background decorative elements */}
            <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" aria-hidden />
            <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 blur-3xl" aria-hidden />

            <div className="relative flex flex-col gap-6 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-lg">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
                  <Globe className="h-3 w-3" />
                  Academic intelligence for every learner
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                    The{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      operating system
                    </span>{' '}
                    for strategic learning outcomes.
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Grade Master Pro centralises multi-country grading, progress tracking, and collaborative coaching so students and institutions can focus on decisions that move the needle.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/login"
                    className="group inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:from-blue-700 hover:to-purple-700"
                  >
                    Get started free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/grade-calculator"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Try the calculator
                  </Link>
                  <Link
                    to="/sales-demo"
                    className="inline-flex items-center gap-2 rounded-lg border border-transparent px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Play className="h-3 w-3" />
                    Schedule a walkthrough →
                  </Link>
                </div>

                <div className="flex flex-wrap gap-6 pt-3">
                  {outcomeStats.map((stat: { value: string; label: string; icon: any }) => (
                    <div key={stat.label} className="flex items-center gap-3 rounded-xl bg-white/80 p-3 shadow-md border border-slate-200/60">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        <stat.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                        <div className="text-sm text-slate-600 leading-tight">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-6 lg:mt-0">
                <div className="absolute -top-8 right-4 hidden h-24 w-24 rounded-full bg-blue-200/60 blur-3xl lg:block" aria-hidden />
                <div className="absolute -bottom-8 left-6 hidden h-28 w-28 rounded-full bg-indigo-100/60 blur-3xl lg:block" aria-hidden />

                <div className="relative flex h-full flex-col justify-between rounded-xl border border-slate-200/60 bg-gradient-to-br from-white/90 to-white/50 p-4 shadow-xl backdrop-blur-sm">
                  <div className="space-y-3">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 mb-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Live planning canvas
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Guide every academic pathway with clarity.</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="group rounded-xl border border-slate-200/50 bg-white/90 p-3 shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <BarChart3 className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-slate-900">Unified progress snapshots</h4>
                            <p className="mt-1 text-sm text-slate-600 leading-relaxed">Visualise GPA trends, credit momentum, and milestone health in one adaptable dashboard.</p>
                          </div>
                        </div>
                      </div>

                      <div className="group rounded-xl border border-slate-200/50 bg-white/90 p-3 shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Scale className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-slate-900">Workload balance guidance</h4>
                            <p className="mt-1 text-sm text-slate-600 leading-relaxed">Highlight overloaded terms, recommend pacing adjustments, and surface risk signals before they escalate.</p>
                          </div>
                        </div>
                      </div>

                      <div className="group rounded-xl border border-slate-200/50 bg-white/90 p-3 shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                            <Users className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-slate-900">Coaching-ready insights</h4>
                            <p className="mt-1 text-sm text-slate-600 leading-relaxed">Generate shareable recaps for advisors, families, and support teams to align on next best actions.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Users className="h-3 w-3" />
                      </div>
                      <span className="text-sm font-semibold uppercase tracking-wide text-blue-700">Collaboration lanes</span>
                    </div>
                    <p className="text-sm text-blue-900 leading-relaxed mb-3">
                      Invite advisors and stakeholders to comment, suggest adjustments, and log next steps without leaving the Grade Master Pro workspace.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600">Share secure links, manage roles.</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-blue-600">
                        <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                        Real-time sync
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Partners Section */}
          <section className="py-12 bg-white border-b border-slate-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">Trusted by academic teams across the globe</h2>
              <div className="mt-6 relative w-full overflow-hidden">
                <div className="flex animate-infinite-scroll">
                  {[...partnerLogos, ...partnerLogos].map((logo: string, index: number) => (
                    <div key={index} className="flex-shrink-0 mx-8 text-lg font-medium text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
                      {logo}
                    </div>
                  ))}
                </div>
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent"></div>
              </div>
            </div>
          </section>

          {/* How it Works Section */}
          <section className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 text-sm font-semibold text-white">
                <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                How it works
              </div>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                Built for effortless planning, decision after decision.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Plug Grade Master Pro into your academic life and orchestrate progress with clarity—no spreadsheets, no guesswork.
              </p>
              <Link to="/product-tour" className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-all hover:text-blue-700 hover:translate-x-1">
                <Play className="h-4 w-4" />
                Watch a product walkthrough →
              </Link>
            </div>

            <div className="space-y-4">
              {workflowSteps.map((step: { title: string; description: string; step: string; color: string; icon: any }, index: number) => (
                <div key={step.title} className="group flex gap-4 rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50/50 p-4 shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${step.color} text-white font-bold text-base shadow-lg`}>
                    {step.step}
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Product Pillars Section */}
          <section className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-3 py-2 text-sm font-semibold text-white">
                <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                Product pillars
              </div>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                Everything you need to orchestrate academic success.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                From first-year planning to graduation audits, Grade Master Pro packages insights for students, supporters, and institution leaders.
              </p>
              <Link to="/product-tour" className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-all hover:text-blue-700 hover:translate-x-1">
                <Lightbulb className="h-4 w-4" />
                Explore feature tour →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {solutionPillars.map((pillar: { title: string; description: string; icon: any; color: string }, index: number) => (
                <div key={pillar.title} className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${pillar.color} text-white shadow-lg`}>
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Enterprise Section */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
              <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-white/20" />
              <div className="absolute top-16 right-16 w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="absolute bottom-12 left-1/4 w-1.5 h-1.5 rounded-full bg-white/25" />
            </div>

            <div className="relative grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10 lg:py-12">
              <div className="space-y-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-500/20 px-3 py-2 text-sm font-semibold text-blue-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <Building className="h-3 w-3" />
                  Enterprise subscriptions
                </div>

                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Scale student success with{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    institution-ready intelligence.
                  </span>
                </h2>

                <p className="text-lg text-slate-200 leading-relaxed">
                  Deploy Grade Master Pro across campuses with unified analytics, automated reporting, and a partner team invested in outcomes from orientation to alumni status.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {enterpriseHighlights.map((highlight: { title: string; description: string; metric: string; icon: any }) => (
                    <div key={highlight.title} className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm hover:bg-white/15 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                            <highlight.icon className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-semibold text-white">{highlight.title}</h3>
                        </div>
                        <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-semibold text-blue-200">{highlight.metric}</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{highlight.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg transition-all hover:scale-105 hover:bg-slate-100 hover:shadow-xl"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact sales team
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-white/40 px-6 py-3 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10 hover:scale-105"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View enterprise pricing
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-12 right-6 h-32 w-32 rounded-full bg-blue-500/30 blur-3xl" aria-hidden />
                <div className="absolute -bottom-8 left-6 hidden h-24 w-24 rounded-full bg-indigo-400/30 blur-3xl lg:block" aria-hidden />

                <div className="relative rounded-2xl border border-white/15 bg-gradient-to-br from-white/15 to-white/5 p-6 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 mb-6">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-base shadow-lg">HQ</div>
                    <div>
                      <p className="text-base font-semibold text-white">Horizon University</p>
                      <p className="text-sm text-slate-200">Enterprise cohort, 18,000 learners</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-white/10 p-3">
                      <span className="text-sm text-slate-200">Retention uplift</span>
                      <span className="font-bold text-emerald-300 text-lg">+6.4%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/10 p-3">
                      <span className="text-sm text-slate-200">Advising response time</span>
                      <span className="font-bold text-emerald-300 text-lg">-48 hrs</span>
                    </div>
                    <div className="rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 border border-blue-400/30">
                      <p className="text-sm font-semibold uppercase tracking-wide text-blue-100 mb-1">Enterprise insight</p>
                      <p className="text-sm leading-relaxed text-slate-200">
                        Launch institution-wide alerts, feed SIS data, and empower every advising team with dashboards matched to their caseload.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 text-sm font-semibold text-blue-700 mb-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  Customer Stories
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Loved by learners and leaders</h2>
                <p className="mt-2 text-base text-slate-600">See what our community says about Grade Master Pro</p>
              </div>

              <div className="relative w-full overflow-hidden">
                <div className="flex testimonial-scroll">
                  {[...testimonials, ...testimonials].map((testimonial, index: number) => (
                    <div key={index} className="flex-shrink-0 mx-8 w-96">
                      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/30 p-8 shadow-md hover:shadow-lg transition-all duration-300 group h-full flex flex-col hover:-translate-y-1">
                        <div className="flex items-start gap-1 mb-4">
                          <Quote className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current group-hover:scale-110 transition-transform" />)}
                          </div>
                        </div>
                        <blockquote className="text-slate-700 text-base mb-6 line-clamp-5 flex-grow leading-relaxed font-medium">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="relative">
                            <img
                              className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all"
                              src={testimonial.avatar}
                              alt={testimonial.name}
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 text-sm">
                              {testimonial.name}
                            </div>
                            <div className="text-xs text-slate-600 truncate">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"></div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-16 sm:py-24 bg-white">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Simple, transparent pricing
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Choose the plan that's right for you, from individual student use to large-scale institutional deployment.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
                {pricingPlans.map((plan: any, index: number) => (
                  <div key={plan.name} className={`rounded-3xl border ${plan.isFeatured ? 'border-purple-500 ring-2 ring-purple-200' : 'border-slate-200'} p-8 shadow-lg relative flex flex-col h-full ${plan.isFeatured ? 'bg-white' : 'bg-slate-50/50'}`}>
                    {plan.isFeatured && (
                      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-sm font-semibold text-white">Most Popular</div>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                    <p className="mt-4 text-slate-600 flex-grow">{plan.description}</p>
                    <div className="mt-6">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      {plan.priceSuffix && <span className="text-base font-medium text-slate-500">{plan.priceSuffix}</span>}
                    </div>
                    <ul className="mt-8 space-y-4 text-slate-600 flex-grow">
                      {plan.features.map((feature: string) => (
                        <li key={feature} className="flex gap-3">
                          <Check className="h-6 w-6 text-blue-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={plan.href} className={`mt-8 block w-full rounded-full px-6 py-3 text-center font-semibold transition-transform hover:scale-105 ${plan.isFeatured ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                      {plan.cta}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-16 sm:py-24 bg-slate-50">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mt-4 text-lg text-slate-600">Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.</p>
              </div>
              <div className="mt-12 space-y-4 max-w-4xl mx-auto">
                {faqs.map((faq: { question: string; answer: string }, index: number) => (
                  <div key={index} className="rounded-xl border border-slate-200 bg-white transition-all">
                    <button
                      className="w-full flex justify-between items-center text-left p-6"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="text-lg font-medium text-slate-900">{faq.question}</span>
                      <span className="flex-shrink-0 ml-4">
                        {openFaq === index ? (
                          <Minus className="h-6 w-6 text-slate-500" />
                        ) : (
                          <Plus className="h-6 w-6 text-slate-500" />
                        )}
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6 text-slate-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 p-8 text-center shadow-xl sm:p-10 lg:p-12">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
              <div className="absolute top-6 left-6 w-1.5 h-1.5 rounded-full bg-blue-400/30" />
              <div className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full bg-purple-400/40" />
            </div>

            <div className="relative">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl mb-4">
                Ready to simplify{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  grade planning?
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-6">
                Join thousands of learners and institutions turning data into decisive action with Grade Master Pro.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:from-blue-700 hover:to-purple-700"
                >
                  Create your free workspace
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/grade-calculator"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Launch grade calculator
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// --- FOOTER COMPONENT ---

const Footer: React.FC = () => {
  const footerLinks = {
    Product: ["Features", "Solutions", "Enterprise", "Pricing"],
    Company: ["About", "Careers", "Contact", "Partners"],
    Resources: ["Blog", "Help Center", "Webinars", "Case Studies"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <span>GradeMaster Pro</span>
            </a>
            <p className="mt-4 text-sm text-slate-600">The operating system for strategic learning outcomes.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link: string) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Grade Master Pro, Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="text-slate-400 hover:text-slate-500" title="Follow us on Twitter">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-500" title="Connect on LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-500" title="View on GitHub">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
