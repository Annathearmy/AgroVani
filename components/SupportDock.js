'use client'

import { useEffect, useState } from 'react'
import { Bot, Mic, Send, X } from 'lucide-react'
import { apiUrl } from '@/lib/api'

export default function SupportDock({ role = 'farmer', locale = 'en', context = {} }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'AgroSaathi is ready. Ask about crops, orders, mandi prices, or dispatch.' }])

  useEffect(() => {
    if (!open) return
    fetch(apiUrl('/api/messages')).then((response) => response.ok ? response.json() : []).then((items) => {
      if (Array.isArray(items) && items.length) setMessages((current) => [...current, ...items.slice(-12).map((item) => ({ role: 'network', text: `${item.senderId}: ${item.translatedText || item.text}` }))])
    }).catch(() => {})
  }, [open])

  async function sendMessage(event) {
    event?.preventDefault()
    const message = input.trim()
    if (!message || busy) return
    setInput('')
    setMessages((items) => [...items, { role: 'user', text: message }])
    fetch(apiUrl('/api/messages'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ senderId: role, recipientId: 'network', text: message, sourceLanguage: locale, targetLanguage: locale }) }).catch(() => {})
    setBusy(true)
    try {
      const response = await fetch(apiUrl('/api/assistant'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, locale, context: { role, ...context } }),
      })
      const data = await response.json()
      if (!response.ok || !data.reply) throw new Error(data.error || 'Support is temporarily unavailable.')
      setMessages((items) => [...items, { role: 'assistant', text: data.reply }])
    } catch (error) {
      setMessages((items) => [...items, { role: 'assistant', text: error.message }])
    } finally {
      setBusy(false)
    }
  }

  function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return setInput('Voice input is not supported in this browser.')
    const recognition = new SpeechRecognition()
    recognition.lang = locale === 'hi' ? 'hi-IN' : locale === 'pa' ? 'pa-IN' : 'en-IN'
    recognition.onresult = (event) => setInput(event.results[0][0].transcript)
    recognition.start()
  }

  return (
    <div className="fixed bottom-5 right-5 z-[80]">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-[24px] border border-white/20 bg-slate-950/90 text-white shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">AgroSaathi</p><p className="text-sm text-slate-300">{role} support</p></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close support"><X className="h-4 w-4" /></button>
          </div>
          <div className="flex max-h-64 flex-col gap-2 overflow-y-auto p-3">
            {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-5 ${message.role === 'user' ? 'ml-auto bg-emerald-500 text-slate-950' : 'bg-white/10 text-slate-100'}`}>{message.text}</div>)}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 border-t border-white/10 p-3">
            <button type="button" onClick={startVoice} aria-label="Use voice input" title="Use voice input" className="rounded-full border border-white/15 p-2 text-emerald-300 hover:bg-white/10"><Mic className="h-4 w-4" /></button>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask AgroSaathi" className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-3 text-sm text-white outline-none placeholder:text-slate-400" />
            <button type="submit" disabled={busy} aria-label="Send message" className="rounded-full bg-emerald-400 p-2 text-slate-950 disabled:opacity-50"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Open AgroSaathi support" title="AgroSaathi support" className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200/40 bg-emerald-400 text-slate-950 shadow-[0_12px_35px_rgba(52,211,153,0.35)] transition hover:scale-105"><Bot className="h-6 w-6" /></button>
    </div>
  )
}
