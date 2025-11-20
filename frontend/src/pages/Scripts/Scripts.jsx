import React, { useEffect, useState } from 'react'
import styles from './Scripts.module.css'
import { apiFetch } from '../../utils/api'

export default function Scripts(){
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem('serise_token')
    apiFetch('/api/scripts', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r=>r.json()).then(d=>setItems(Array.isArray(d)?d:[])).catch(()=>{})
  }, [])

  const create = async ()=>{
    const token = localStorage.getItem('serise_token')
    const res = await apiFetch('/api/scripts', { method:'POST', headers:{...(token?{Authorization:`Bearer ${token}`}:{}), 'Content-Type':'application/json'}, body: JSON.stringify({ title, content }) })
    const data = await res.json();
    setItems(prev=>[data, ...prev]); setTitle(''); setContent('')
  }

  return (
    <div className={styles.page}>
      <h2>Script Builder</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e=>setContent(e.target.value)} rows={4} />
      <button onClick={create}>Create</button>
      <ul className={styles.list}>
        {items.map(it => (
          <li key={it._id || it.id}><strong>{it.title}</strong><div>{it.content}</div></li>
        ))}
      </ul>
    </div>
  )
}
