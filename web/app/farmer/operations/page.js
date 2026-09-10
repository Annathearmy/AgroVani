'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarCheck, CircleDollarSign, Combine, ListChecks, Truck } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import SupportDock from '@/components/SupportDock'
import { apiUrl } from '@/lib/api'

const segments = [
  { title: 'Crop cycle', text: 'Keep sowing, irrigation, scouting, harvest, and residue actions in one farmer-owned timeline.', icon: Combine, color: 'text-emerald-300' },
  { title: 'Personalized recommendations', text: 'Each recommendation records what to use, how to use it, how often, and the safe timing window.', icon: ListChecks, color: 'text-sky-300' },
  { title: 'Tasks & schedules', text: 'Turn an agronomic recommendation into a dated task and coordinate machinery before the window closes.', icon: CalendarCheck, color: 'text-amber-300' },
  { title: 'Residue earnings', text: 'Track residue quantity, buyer interest, pickup status, and the farmer share as separate earnings.', icon: CircleDollarSign, color: 'text-lime-300' },
]

export default function FarmerOperationsPage() {
  const [tasks, setTasks] = useState([])
  const [earnings, setEarnings] = useState({ totalInr: 0, earnings: [] })
  const [draft, setDraft] = useState({ title: '', instructions: '', dueDate: new Date().toISOString().slice(0, 10) })
  const ownerId = 'farmer-local'

  useEffect(() => {
    Promise.all([fetch(apiUrl(`/api/tasks?ownerId=${ownerId}`)), fetch(apiUrl(`/api/earnings?ownerId=${ownerId}`))]).then(async ([taskResponse, earningResponse]) => {
      setTasks(await taskResponse.json())
      setEarnings(await earningResponse.json())
    })
  }, [])

  async function addTask(event) {
    event.preventDefault()
    const response = await fetch(apiUrl('/api/tasks'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...draft, ownerId, source: 'farmer_recommendation' }) })
    if (response.ok) { const task = await response.json(); setTasks((items) => [...items, task]); setDraft({ title: '', instructions: '', dueDate: new Date().toISOString().slice(0, 10) }) }
  }

  async function toggleTask(task) {
    const response = await fetch(apiUrl('/api/tasks'), { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: task.id, status: task.status === 'done' ? 'open' : 'done' }) })
    if (response.ok) { const updated = await response.json(); setTasks((items) => items.map((item) => item.id === updated.id ? updated : item)) }
  }

  return <main className="page-farmer min-h-screen p-4 text-slate-100 md:p-8"><div className="mx-auto max-w-7xl"><header className="mb-8 flex flex-wrap items-center justify-between gap-4"><Link href="/farmer/dashboard" className="flex items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Farmer dashboard</Link><div className="flex items-center gap-3"><LanguageSwitcher /><Link href="/farmer/weather" className="glass-btn">Live weather</Link></div></header><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">Farmer workspace</p><h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Farm operations</h1><p className="mt-5 text-lg leading-8 text-slate-300">Your recommendations become tasks, schedules, dispatch requests, and earnings records here.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2">{segments.map(({ title, text, icon: Icon, color }) => <section key={title} className="glass-card border-white/15 bg-white/10"><Icon className={`h-7 w-7 ${color}`} /><h2 className="mt-5 text-2xl font-bold">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-300">{text}</p></section>)}</div><section className="glass-card mt-6 border-white/15 bg-white/10"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Scheduled tasks</p><h2 className="mt-2 text-2xl font-bold">Personalized field plan</h2></div><span className="rounded-full bg-emerald-300/15 px-3 py-1 text-sm font-semibold text-emerald-200">₹{Number(earnings.totalInr || 0).toLocaleString('en-IN')} earned</span></div><form onSubmit={addTask} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_160px_auto]"><input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="What to do" className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-400" /><input required value={draft.instructions} onChange={(event) => setDraft({ ...draft, instructions: event.target.value })} placeholder="How, amount, frequency" className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-400" /><input type="date" value={draft.dueDate} onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })} className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white" /><button className="pill-dark">Schedule</button></form><div className="mt-5 space-y-2">{tasks.length ? tasks.map((task) => <button type="button" key={task.id} onClick={() => toggleTask(task)} className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 text-left"><span className={`mt-1 h-3 w-3 rounded-full ${task.status === 'done' ? 'bg-emerald-300' : 'bg-amber-300'}`} /><span className="flex-1"><span className={`block font-semibold ${task.status === 'done' ? 'line-through text-slate-400' : 'text-white'}`}>{task.title}</span><span className="mt-1 block text-sm text-slate-300">{task.instructions} · Due {task.dueDate}</span></span></button>) : <p className="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-300">No scheduled tasks yet. Add the next recommendation from the farmer dashboard.</p>}</div></section></div><SupportDock role="farmer" /></main>
}
