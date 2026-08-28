import { useState } from 'react';

interface AgendaItem {
  id: number;
  topic: string;
  owner: string;
  notes: string;
}

export default function MeetingAgenda() {
  const [items, setItems] = useState<AgendaItem[]>([
    { id: 1, topic: 'Review grade trajectory', owner: 'Student', notes: 'Confirm GPA goals and risk courses.' },
    { id: 2, topic: 'Resource requests', owner: 'Advisor', notes: 'Share study materials for Econometrics.' },
  ]);
  const [topic, setTopic] = useState('');
  const [owner, setOwner] = useState('Student');
  const [notes, setNotes] = useState('');

  const addItem = () => {
    if (!topic.trim()) return;
    setItems(prev => [...prev, { id: Date.now(), topic, owner, notes }]);
    setTopic('');
    setOwner('Student');
    setNotes('');
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Advisor meeting agenda</h1>
        <p className="text-sm text-slate-600">
          Capture discussion topics, assign owners, and keep track of notes before your next advising session.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-800">Topic</label>
            <input
              value={topic}
              onChange={event => setTopic(event.target.value)}
              placeholder="Discuss credit load for Spring"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-800">Owner</label>
            <select
              value={owner}
              onChange={event => setOwner(event.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option>Student</option>
              <option>Advisor</option>
              <option>Supporter</option>
            </select>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          <label className="text-sm font-semibold text-slate-800">Notes</label>
          <textarea
            value={notes}
            onChange={event => setNotes(event.target.value)}
            rows={4}
            placeholder="Key questions or context for this topic"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Add agenda item
        </button>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Agenda overview</h2>
        <div className="mt-4 grid gap-3">
          {items.map(item => (
            <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold text-slate-900">{item.topic}</h3>
                <span className="text-xs uppercase tracking-wide text-slate-500">Owner: {item.owner}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.notes}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
