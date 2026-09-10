'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BadgeIndianRupee, RefreshCw, ShoppingBasket, Plus } from 'lucide-react'
import SupportDock from '@/components/SupportDock'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { apiUrl } from '@/lib/api'
import FarmMapCard from '@/components/farmer/FarmMapCard'

export default function BuyerDashboard() {
  const [prices, setPrices] = useState([])
  const [status, setStatus] = useState('Loading government mandi feed...')
  const [farm, setFarm] = useState(null)
  const [showNeedForm, setShowNeedForm] = useState(false)
  const [need, setNeed] = useState({ residueType: 'Paddy straw', quantityQuintals: '', qualityGrade: 'Standard', moisturePercent: '', pickupDistrict: '', priceInr: '', notes: '' })
  const [needMessage, setNeedMessage] = useState('')

  async function loadPrices() {
    setStatus('Loading government mandi feed...')
    try {
      const response = await fetch(apiUrl('/api/mandi'))
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Mandi feed unavailable')
      setPrices(Array.isArray(data.records) ? data.records : [])
      setStatus(data.source === 'government' ? 'Government APMC feed connected' : 'Government mandi feed is not configured')
    } catch (error) {
      setPrices([])
      setStatus(error.message)
    }
  }

  useEffect(() => {
    loadPrices()
    fetch(apiUrl('/api/farms')).then((response) => response.ok ? response.json() : []).then((farms) => setFarm(farms[0] || null)).catch(() => {})
  }, [])

  async function publishNeed(event) {
    event.preventDefault()
    setNeedMessage('')
    const response = await fetch(apiUrl('/api/marketplace/listings'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sellerId: 'buyer@agrovani.in', name: `${need.residueType} residue requirement`, category: 'Residue', listingType: 'residue_need', stockUnits: 0, ...need }) })
    const data = await response.json()
    if (!response.ok) return setNeedMessage(data.error || 'Unable to publish residue requirement')
    setNeedMessage('Requirement published. Farmers will receive a notification in their dashboard.')
    setShowNeedForm(false)
  }

  return (
    <main className="page-seller min-h-screen p-4 text-slate-100 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-xl"><Link href="/login" className="flex items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Buyer Console</Link><div className="flex items-center gap-3"><LanguageSwitcher /><Link href="/plans" className="glass-btn">Our Plans</Link></div></header>
        <div className="grid gap-5 md:grid-cols-3"><div className="glass-card border-white/15 bg-white/10"><ShoppingBasket className="h-6 w-6 text-sky-300" /><p className="mt-5 text-xs uppercase tracking-[0.25em] text-slate-300">Supply workspace</p><p className="mt-2 text-3xl font-bold">Farmer network</p></div><div className="glass-card border-white/15 bg-white/10"><BadgeIndianRupee className="h-6 w-6 text-emerald-300" /><p className="mt-5 text-xs uppercase tracking-[0.25em] text-slate-300">Price source</p><p className="mt-2 text-3xl font-bold">APMC / Agmarknet</p></div><div className="glass-card border-white/15 bg-white/10"><p className="text-xs uppercase tracking-[0.25em] text-slate-300">Data status</p><p className="mt-4 text-lg font-semibold text-amber-200">{status}</p></div></div>
        <section className="glass-card mt-6 border-white/15 bg-white/10"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Live market</p><h1 className="mt-2 text-3xl font-bold">Government mandi prices</h1></div><button onClick={loadPrices} className="glass-btn"><RefreshCw className="mr-2 h-4 w-4" /> Refresh</button></div>{prices.length ? <div className="mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs uppercase tracking-wider text-slate-400"><tr><th className="pb-3">Commodity</th><th className="pb-3">Market</th><th className="pb-3">Min</th><th className="pb-3">Modal</th><th className="pb-3">Max</th></tr></thead><tbody>{prices.map((item, index) => <tr key={`${item.commodity}-${item.market}-${index}`} className="border-t border-white/10"><td className="py-3 font-semibold">{item.commodity}</td><td className="py-3">{item.market}</td><td className="py-3">₹{item.minPrice}</td><td className="py-3 text-emerald-300">₹{item.modalPrice}</td><td className="py-3">₹{item.maxPrice}</td></tr>)}</tbody></table></div> : <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-black/10 p-6 text-sm text-slate-300">No prices are shown until a government API endpoint and key are configured. This dashboard does not use mock market values.</div>}</section>
        <section className="glass-card mt-6 border-white/15 bg-white/10"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Farmer supply request</p><h2 className="mt-2 text-2xl font-bold">Post a residue need</h2></div><button onClick={() => setShowNeedForm((value) => !value)} className="glass-btn"><Plus className="mr-2 h-4 w-4" /> New requirement</button></div>{needMessage && <p className="mt-4 rounded-xl bg-emerald-300/15 px-3 py-2 text-sm text-emerald-100">{needMessage}</p>}{showNeedForm && <form onSubmit={publishNeed} className="mt-5 grid gap-3 md:grid-cols-2"><select value={need.residueType} onChange={(event) => setNeed({ ...need, residueType: event.target.value })} className="rounded-xl border border-white/15 bg-slate-900/60 px-3 py-3 text-sm text-white"><option>Paddy straw</option><option>Wheat straw</option><option>Corn residue</option><option>Cotton stalk</option><option>Mixed biomass</option></select><input required type="number" min="0.1" step="0.1" value={need.quantityQuintals} onChange={(event) => setNeed({ ...need, quantityQuintals: event.target.value })} placeholder="Quantity in quintals" className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-slate-400" /><select value={need.qualityGrade} onChange={(event) => setNeed({ ...need, qualityGrade: event.target.value })} className="rounded-xl border border-white/15 bg-slate-900/60 px-3 py-3 text-sm text-white"><option>Standard</option><option>Premium</option><option>Industrial</option></select><input type="number" min="0" max="100" step="0.1" value={need.moisturePercent} onChange={(event) => setNeed({ ...need, moisturePercent: event.target.value })} placeholder="Maximum moisture %" className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-slate-400" /><input required value={need.pickupDistrict} onChange={(event) => setNeed({ ...need, pickupDistrict: event.target.value })} placeholder="Pickup district" className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-slate-400" /><input required type="number" min="1" value={need.priceInr} onChange={(event) => setNeed({ ...need, priceInr: event.target.value })} placeholder="Offer price per unit" className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-slate-400" /><textarea value={need.notes} onChange={(event) => setNeed({ ...need, notes: event.target.value })} placeholder="Pickup timing, packaging, contamination limits" className="min-h-24 rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-slate-400 md:col-span-2" /><button className="pill-dark md:col-span-2">Publish requirement to farmers</button></form>}</section>
        <section className="mt-6"><div className="mb-3"><p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Buyer logistics</p><h2 className="mt-2 text-2xl font-bold">Live Crop Position Tracking</h2><p className="mt-2 text-sm text-slate-300">View real farmer or driver coordinates when they explicitly share GPS through the live relay.</p></div><FarmMapCard lat={farm?.latitude} lon={farm?.longitude} mode="residue" title="Live Crop Position Tracking" /></section>
      </div>
      <SupportDock role="buyer" />
    </main>
  )
}
