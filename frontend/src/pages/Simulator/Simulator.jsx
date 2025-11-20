import React, { useState } from 'react'
import styles from './Simulator.module.css'
import { apiFetch } from '../../utils/api'

export default function Simulator(){
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const run = async () => {
    setLoading(true)
    const token = localStorage.getItem('serise_token')
    const res = await apiFetch('/api/simulate', { method:'POST', headers: {...(token?{Authorization:`Bearer ${token}`}:{}), 'Content-Type':'application/json'}, body: JSON.stringify({ prompt, scenario: 'general' }) })
    const data = await res.json()
    setResponse(data.result || data)
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <h2>Conversation Simulator</h2>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={4} />
      <button onClick={run} disabled={loading}>{loading ? 'Running…' : 'Run Simulation'}</button>
      {response && <pre className={styles.result}>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  )
}
