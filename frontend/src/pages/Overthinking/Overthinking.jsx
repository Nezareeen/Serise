import React, { useState, useEffect } from 'react'
import styles from './Overthinking.module.css'
import { apiFetch } from '../../utils/api'

export default function Overthinking(){
  const [thought, setThought] = useState('')
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem('serise_token')
    apiFetch('/api/overthinking', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r=>r.json()).then(d=>setEntries(Array.isArray(d)?d:[])).catch(()=>{})
  }, [])

  const submit = async ()=>{
    setLoading(true)
    const token = localStorage.getItem('serise_token')
    const res = await apiFetch('/api/overthinking', { method:'POST', headers: {...(token?{Authorization:`Bearer ${token}`}:{}), 'Content-Type':'application/json'}, body: JSON.stringify({ thought }) })
    const data = await res.json();
    setEntries(prev=>[data, ...prev])
    setThought('')
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <h2>Anti-Overthinking</h2>
      <textarea value={thought} onChange={(e)=>setThought(e.target.value)} placeholder="Enter the anxious thought" rows={4} />
      <button onClick={submit} disabled={loading}>{loading? 'Analyzing…' : 'Analyze'}</button>
      <div className={styles.entries}>
        {entries.map(e=> (
          <div key={e._id || e.id} className={styles.entry}>
            <div className={styles.thought}>{e.thought}</div>
            <pre className={styles.ai}>{e.aiResponse}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}
