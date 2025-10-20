import { Link } from 'react-router-dom';
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
  Play
} from 'lucide-react';

export default function Home() {
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
  const partnerLogos = ["Vector University", "Northern Scholars", "Global U Alliance", "Vision Prep", "Atlas College", "Meridian Academy"];
  const outcomeStats = [
    { value: "12k+", label: "academic plans published", icon: TrendingUp },
    { value: "3x", label: "faster advising cycles", icon: Zap },
    { value: "98%", label: "student satisfaction", icon: Star }
  ];

  return (
    <div className="mx-auto flex w-full flex-col gap-12 px-4 pb-8 pt-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 px-6 py-8 shadow-lg backdrop-blur sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:grid lg:gap-12 lg:px-10 lg:py-12">
        {/* Background decorative elements */}
        <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 blur-3xl" aria-hidden />

        <div className="relative flex flex-col gap-6">
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
              to="/sales/demo"
              className="inline-flex items-center gap-2 rounded-lg border border-transparent px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:text-blue-700"
            >
              <Play className="h-3 w-3" />
              Schedule a walkthrough →
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 pt-3">
            {outcomeStats.map(stat => (
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
          {workflowSteps.map((step, index) => (
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
      <section className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
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
          {solutionPillars.map((pillar, index) => (
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
              {enterpriseHighlights.map(highlight => (
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

      {/* Partners Section */}
      <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg sm:p-8">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">Trusted by academic teams across the globe</p>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-400 sm:gap-8">
          {partnerLogos.map(logo => (
            <div key={logo} className="group transition-all hover:text-slate-600 hover:scale-105">
              <span className="tracking-wider">{logo}</span>
            </div>
          ))}
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
  );
}
