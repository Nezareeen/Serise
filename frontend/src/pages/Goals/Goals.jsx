import React, { useEffect, useState } from 'react'
import styles from './Goals.module.css'
import { apiFetch } from '../../utils/api'

export default function Goals(){
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [cadence, setCadence] = useState('weekly')

  useEffect(()=>{
    const token = localStorage.getItem('serise_token')
    apiFetch('/api/goals', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r=>r.json()).then(d=>setItems(Array.isArray(d)?d:[])).catch(()=>{})
  }, [])

  const create = async ()=>{
    const token = localStorage.getItem('serise_token')
    const res = await apiFetch('/api/goals', { method:'POST', headers:{...(token?{Authorization:`Bearer ${token}`}:{}), 'Content-Type':'application/json'}, body: JSON.stringify({ title, cadence }) })
    const data = await res.json();
    setItems(prev=>[data, ...prev]); setTitle('');
  }

  return (
    <div className={styles.page}>
      <h2>Social Goal Tracker</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Goal title" />
      <select value={cadence} onChange={e=>setCadence(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button onClick={create}>Create goal</button>
      <ul className={styles.list}>
        {items.map(it=> <li key={it._id || it.id}>{it.title} — {it.cadence} — {it.progress}%</li>)}
      </ul>
    </div>
  )
}
