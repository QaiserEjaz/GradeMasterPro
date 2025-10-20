import { useState } from 'react';

const resources = [
  {
    title: 'GPA conversion handbook',
    description: 'Compare grading scales across USA, UK, India, and more with quick conversion tables.',
    type: 'Guide',
    category: 'Academic',
    icon: '📊',
  },
  {
    title: 'Advisor meeting template',
    description: 'Structure productive conversations with advisors and capture action items in minutes.',
    type: 'Template',
    category: 'Planning',
    icon: '📋',
  },
  {
    title: 'Scholarship planning checklist',
    description: 'Track eligibility criteria, submission deadlines, and required materials for funding goals.',
    type: 'Checklist',
    category: 'Financial',
    icon: '💰',
  },
  {
    title: 'Study techniques guide',
    description: 'Evidence-based methods for effective learning, memory retention, and exam preparation.',
    type: 'Guide',
    category: 'Academic',
    icon: '🧠',
  },
  {
    title: 'Research paper outline',
    description: 'Step-by-step template for structuring academic papers and research projects.',
    type: 'Template',
    category: 'Research',
    icon: '📝',
  },
  {
    title: 'Internship application tracker',
    description: 'Organize applications, track deadlines, and prepare for interviews systematically.',
    type: 'Tracker',
    category: 'Career',
    icon: '🎯',
  },
];

const categories = ['All', 'Academic', 'Planning', 'Financial', 'Research', 'Career'];

export default function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <div className="min-h-0">
      <div className="mx-auto flex w-full flex-col gap-6 px-4 py-5 sm:px-5 lg:px-8">
        <header className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Academic Resource Library</h1>
            <p className="text-sm text-slate-500 sm:text-base">
              Explore curated assets shared by your institution and Grade Master Pro to support your academic planning and success.
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 lg:gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'border-blue-400 bg-blue-50 text-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map(resource => (
              <article key={resource.title} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{resource.icon}</span>
                    <div>
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        resource.category === 'Academic' ? 'bg-blue-50 text-blue-600' :
                        resource.category === 'Planning' ? 'bg-green-50 text-green-600' :
                        resource.category === 'Financial' ? 'bg-yellow-50 text-yellow-600' :
                        resource.category === 'Research' ? 'bg-purple-50 text-purple-600' :
                        'bg-orange-50 text-orange-600'
                      }`}>
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-500">{resource.type}</span>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition">{resource.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600">
                    View resource
                  </button>
                  <span className="text-xs text-slate-400">Updated 2 days ago</span>
                </div>
              </article>
            ))}
          </section>

          {filteredResources.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-500">No resources found in this category.</p>
            </div>
          )}

          {/* Featured Resources */}
          <section className="rounded-xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Featured This Week</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-3 text-2xl">🎓</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Graduation Planning Guide</h3>
                  <p className="text-sm text-slate-600 mb-4">Essential steps for a smooth transition from college to career.</p>
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Start planning
                  </button>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-3 text-2xl">💼</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Career Readiness Toolkit</h3>
                  <p className="text-sm text-slate-600 mb-4">Tools and resources to prepare for your professional journey.</p>
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700">
                    Explore toolkit
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Help Section */}
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Looking for something specific?</h2>
            <p className="mb-4">
              Ask your advisor to share additional materials or upload custom resources to your workspace collections.
              You can also request new resources through the student portal.
            </p>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                Request resource
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600">
                Contact advisor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
