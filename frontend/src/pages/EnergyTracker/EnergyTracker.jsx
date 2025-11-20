import React, { useEffect, useState } from 'react'
import styles from './EnergyTracker.module.css'
import { apiFetch } from '../../utils/api'

export default function EnergyTracker(){
  const [logs, setLogs] = useState([])
  const [level, setLevel] = useState(50)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const token = localStorage.getItem('serise_token')
    apiFetch('/api/energy', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r=>r.json()).then(data=>{ setLogs(Array.isArray(data)?data:[]); setLoading(false) }).catch(()=>setLoading(false))
  }, [])

  const save = async ()=>{
    const token = localStorage.getItem('serise_token')
    const res = await apiFetch('/api/energy', { method: 'POST', headers: {...(token?{Authorization:`Bearer ${token}`}:{}), 'Content-Type':'application/json'}, body: JSON.stringify({ level, note: '' }) })
    const data = await res.json();
    setLogs(prev=>[data, ...prev])
  }

  return (
    <div className={styles.page}>
      <h2>Social Energy Tracker</h2>
      <div className={styles.card}>
        <input type="range" min="0" max="100" value={level} onChange={(e)=>setLevel(Number(e.target.value))} />
        <div>Level: {level}</div>
        <button onClick={save}>Save</button>
      </div>
      <h3>Recent logs</h3>
      {loading ? <p>Loading…</p> : (
        <ul className={styles.list}>
          {logs.map(l => (
            <li key={l._id || l.id}>{new Date(l.createdAt).toLocaleString()} — {l.level}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
