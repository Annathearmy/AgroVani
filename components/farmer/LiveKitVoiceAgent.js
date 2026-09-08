'use client'

import { useState } from 'react'
import { LiveKitRoom, RoomAudioRenderer, StartAudio } from '@livekit/components-react'
import { Mic, Phone, PhoneOff } from 'lucide-react'

function LiveKitSession({ onEnd }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <RoomAudioRenderer />
      <StartAudio label="Enable speaker" />
      <button type="button" onClick={onEnd} className="glass-btn border-red-200 text-red-700">
        <PhoneOff className="mr-2 h-4 w-4" /> End live call
      </button>
    </div>
  )
}

export default function LiveKitVoiceAgent() {
  const [session, setSession] = useState(null)
  const [error, setError] = useState('')
  const [connecting, setConnecting] = useState(false)

  async function start() {
    setError('')
    setConnecting(true)
    try {
      const response = await fetch('/api/livekit/token', { method: 'POST' })
      const data = await response.json()
      if (!response.ok || !data.token || !data.url) throw new Error(data.error || 'LiveKit is not configured.')
      setSession(data)
    } catch (nextError) {
      setError(nextError.message || 'Unable to start the live voice agent.')
    } finally {
      setConnecting(false)
    }
  }

  if (session) {
    return (
      <LiveKitRoom
        token={session.token}
        serverUrl={session.url}
        connect
        audio
        video={false}
        onDisconnected={() => setSession(null)}
        className="mt-4"
      >
        <LiveKitSession onEnd={() => setSession(null)} />
      </LiveKitRoom>
    )
  }

  return (
    <div className="mt-4">
      <button type="button" onClick={start} disabled={connecting} className="pill-dark">
        {connecting ? <span>Connecting…</span> : <><Phone className="mr-2 h-4 w-4" /> Start live Gemini agent</>}
      </button>
      {error && <p role="alert" className="mt-2 text-xs font-medium text-amber-700">{error}</p>}
    </div>
  )
}
