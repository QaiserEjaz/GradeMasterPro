import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  due: string;
  status: 'Not started' | 'In progress' | 'Complete';
}

const initialTasks: Task[] = [
  { id: 1, title: 'Review Econometrics module before quiz', due: 'This week', status: 'In progress' },
  { id: 2, title: 'Draft scholarship essay outline', due: 'Next week', status: 'Not started' },
  { id: 3, title: 'Sync with advisor on updated course mix', due: 'Oct 21', status: 'Not started' },
  { id: 4, title: 'Complete research paper abstract', due: 'Oct 25', status: 'Not started' },
  { id: 5, title: 'Prepare presentation for seminar', due: 'Nov 2', status: 'Not started' },
];

const taskCategories = [
  { name: 'Academic', icon: '📚', color: 'bg-blue-50 text-blue-600' },
  { name: 'Research', icon: '🔬', color: 'bg-green-50 text-green-600' },
  { name: 'Career', icon: '💼', color: 'bg-purple-50 text-purple-600' },
  { name: 'Personal', icon: '🏠', color: 'bg-orange-50 text-orange-600' },
];

export default function Planner() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    due: '',
    status: 'Not started' as Task['status']
  });

  const advanceStatus = (task: Task) => {
    const order: Task['status'][] = ['Not started', 'In progress', 'Complete'];
    const next = order[(order.indexOf(task.status) + 1) % order.length];
    setTasks(prev => prev.map(item => (item.id === task.id ? { ...item, status: next } : item)));
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const timestamp = Date.now();
      setTasks(prev => [
        ...prev,
        {
          id: timestamp,
          title: newTask.title.trim(),
          due: newTask.due || 'No due date',
          status: newTask.status,
        },
      ]);
      setNewTask({ title: '', due: '', status: 'Not started' });
      setShowAddForm(false);
    }
  };

  const handleCancelAdd = () => {
    setNewTask({ title: '', due: '', status: 'Not started' });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-0">
      <div className="mx-auto flex w-full flex-col gap-6 px-4 py-5 sm:px-5 lg:px-8">
        <header className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Academic Action Planner</h1>
            <p className="text-sm text-slate-500 sm:text-base">
              Transform recommendations into trackable steps. Update status as you make progress to keep advisors in sync.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex gap-2">
              {taskCategories.map(category => (
                <span key={category.name} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${category.color}`}>
                  <span>{category.icon}</span>
                  {category.name}
                </span>
              ))}
            </div>
            {showAddForm ? (
              <div className="flex flex-col gap-2 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="px-3 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Due date"
                    value={newTask.due}
                    onChange={(e) => setNewTask(prev => ({ ...prev, due: e.target.value }))}
                    className="px-3 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  />
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask(prev => ({ ...prev, status: e.target.value as Task['status'] }))}
                    className="px-3 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Complete">Complete</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddTask}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={handleCancelAdd}
                    className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                onClick={() => setShowAddForm(true)}
              >
                <span aria-hidden>＋</span>
                Add task
              </button>
            )}
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 lg:gap-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Active Tasks</h2>
                  <div className="flex gap-2 text-sm text-slate-500">
                    <span>{tasks.filter(t => t.status === 'Complete').length}/{tasks.length} complete</span>
                  </div>
                </div>
                <div className="grid gap-4">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
                        <div className="flex items-center gap-3">
                          <p className="text-xs uppercase tracking-wide text-slate-500">Due {task.due}</p>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                            task.status === 'Complete' ? 'bg-emerald-50 text-emerald-600' :
                            task.status === 'In progress' ? 'bg-blue-50 text-blue-600' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => advanceStatus(task)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
                      >
                        Mark as {task.status === 'Complete' ? 'Not started' : 'Next step'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:sticky lg:top-28">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Progress Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Completed</span>
                    <span className="text-sm font-semibold text-emerald-600">{tasks.filter(t => t.status === 'Complete').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">In Progress</span>
                    <span className="text-sm font-semibold text-blue-600">{tasks.filter(t => t.status === 'In progress').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Not Started</span>
                    <span className="text-sm font-semibold text-slate-500">{tasks.filter(t => t.status === 'Not started').length}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/meeting-agenda"
                    className="flex items-center gap-3 rounded-lg p-3 text-sm transition hover:bg-slate-50"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">📅</span>
                    <span className="text-slate-700">Schedule advisor meeting</span>
                  </Link>
                  <Link
                    to="/resources"
                    className="flex items-center gap-3 rounded-lg p-3 text-sm transition hover:bg-slate-50"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">📚</span>
                    <span className="text-slate-700">Browse study resources</span>
                  </Link>
                  <Link
                    to="/grade-calculator"
                    className="flex items-center gap-3 rounded-lg p-3 text-sm transition hover:bg-slate-50"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">🧮</span>
                    <span className="text-slate-700">Calculate GPA impact</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            <h2 className="text-base font-semibold text-slate-900 mb-2">Need structure?</h2>
            <p>
              Use task templates for recurring milestones like midterm prep, scholarship submissions, or internship applications.
              Templates will appear here once your workspace is connected to your institution's academic calendar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
