import React, { useEffect, useState } from 'react'
import styles from './MemoryVault.module.css'
import { apiFetch } from '../../utils/api'

export default function MemoryVault(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const token = localStorage.getItem('serise_token')
    apiFetch('/api/conversations', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r=>r.json()).then(data=>{ setItems(Array.isArray(data)?data:[]); setLoading(false) }).catch(()=>setLoading(false))
  }, [])

  return (
    <div className={styles.page}>
      <h2>Conversation Memory Vault</h2>
      {loading ? <p>Loading…</p> : (
        <ul className={styles.list}>
          {items.map(it => (
            <li key={it._id || it.id} className={styles.item}>
              <div className={styles.summary}>{it.summary}</div>
              <div className={styles.meta}>{new Date(it.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
