import React, { useEffect, useState, useRef } from 'react'
import styles from './MemoryVault.module.css'
import { apiFetch } from '../../utils/api'

function EnergyMeter({value=60}){
  return (
    <div className={styles.energyMeter} aria-hidden>
      <div className={styles.energyFill} style={{width: `${value}%`}} />
      <div className={styles.energyLabel}>{value}%</div>
    </div>
  )
}

function QuickAddModal({open, onClose, onAdd}){
  const [summary, setSummary] = useState('')
  const [participants, setParticipants] = useState('')
  const [mood, setMood] = useState('calm')

  useEffect(()=>{ if(open) setSummary('') }, [open])

  if(!open) return null
  return (
    <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h3>Quick Add</h3>
          <button onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className={styles.modalBody}>
          <label>Participants<input value={participants} onChange={e=>setParticipants(e.target.value)} placeholder="e.g. Rahul" /></label>
          <label>One-line summary<input value={summary} onChange={e=>setSummary(e.target.value)} placeholder="What happened?" /></label>
          <label> Mood
            <select value={mood} onChange={e=>setMood(e.target.value)}>
              <option value="calm">Calm</option>
              <option value="nervous">Nervous</option>
              <option value="anxious">Anxious</option>
              <option value="confident">Confident</option>
            </select>
          </label>
        </div>
        <footer className={styles.modalFooter}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={()=>{ onAdd({participants, summary, mood, createdAt: new Date().toISOString()}); onClose() }}>Add</button>
        </footer>
      </div>
    </div>
  )
}

export default function MemoryVault(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [aiInsights, setAiInsights] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [quickOpen, setQuickOpen] = useState(false)
  const [showDetailMobile, setShowDetailMobile] = useState(false)
  const listRef = useRef(null)

  useEffect(()=>{
    const token = localStorage.getItem('serise_token')
    apiFetch('/api/conversations', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r=>r.json()).then(data=>{ setItems(Array.isArray(data)?data:[]); setLoading(false) }).catch(()=>setLoading(false))
  }, [])

  // fetch AI insights when selection changes
  useEffect(()=>{
    if(!selected) { setAiInsights(null); return }
    const id = selected._id || selected.id || selected.createdAt
    if(!id) return
    setAiLoading(true)
    const token = localStorage.getItem('serise_token')
    apiFetch(`/api/conversations/${id}/analyze`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r=>r.json()).then(data=>{ setAiInsights(data); setAiLoading(false) }).catch(()=>{ setAiInsights(null); setAiLoading(false) })
  }, [selected])

  // keyboard shortcuts
  useEffect(()=>{
    function onKey(e){
      if(e.key.toLowerCase() === 'n') setQuickOpen(true)
      if(e.key.toLowerCase() === 's') { const el = document.querySelector('#mv-search'); if(el){ el.focus(); e.preventDefault() } }
      if(e.key === 'ArrowDown' && listRef.current){ const first = listRef.current.querySelector('li'); if(first) first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [])

  function handleAdd(newItem){
    setItems(prev => [newItem, ...prev])
    setSelected(newItem)
    setShowDetailMobile(true)
  }

  const filtered = items.filter(it => !query || (it.summary||'').toLowerCase().includes(query.toLowerCase()))

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Conversation Vault</h1>
          <div className={styles.stats}>
            <div><strong>{items.length}</strong> logs</div>
            <div><strong>0</strong> unread follow-ups</div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className="btn" onClick={()=>setQuickOpen(true)}>+ Quick Add</button>
        </div>
      </div>

      <div className={styles.topStrip}>
        <EnergyMeter value={62} />
        <div className={styles.suggested}>Suggested follow-ups: <strong>2</strong> — <a href="#">Snooze</a> / <a href="#">View</a></div>
        <div className={styles.search}><span aria-hidden>🔍</span><input id="mv-search" placeholder="Search by person, tag or keyword" value={query} onChange={e=>setQuery(e.target.value)} /></div>
      </div>

      <main className={styles.main}>
        <aside className={styles.listCol} aria-label="Conversation list">
          <div className={styles.toolbar}>
            <div>Sort: <select><option>Date</option><option>Mood</option></select></div>
            <div>Filters</div>
          </div>
          {loading ? <div className={styles.loading}>Loading…</div> : (
            <ul className={styles.list} ref={listRef}>
              {filtered.map(it=> (
                <li key={it._id || it.id || it.createdAt} tabIndex={0} className={styles.card} onClick={()=>{ setSelected(it); setShowDetailMobile(true) }} aria-label={`Conversation ${it.participants||''} ${it.mood||''} ${it.createdAt?new Date(it.createdAt).toLocaleDateString():''}`}>
                  <div className={styles.cardHead}>
                    <div className={styles.title}>{it.title || (it.participants ? `Chat with ${it.participants}` : (it.summary || 'Untitled'))}</div>
                    <div className={styles.when}>{it.createdAt ? new Date(it.createdAt).toLocaleString() : ''}</div>
                  </div>
                  <div className={styles.excerpt}>{(it.summary || '').slice(0,80)}</div>
                  <div className={styles.cardFoot}>
                    <div className={`${styles.mood} ${styles[it.mood||'calm']}`}>{(it.mood||'calm')}</div>
                    <div className={styles.actions}>⭐ 🔖 ⋯</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section className={`${styles.detailCol} ${showDetailMobile ? styles.openMobile : ''}`} aria-live="polite">
          {selected ? (
            <div className={styles.detailInner}>
              <div className={styles.detailHeader}>
                <div>
                  <h2>{selected.title || 'Conversation'}</h2>
                  <div className={styles.metaSmall}>{selected.participants || ''} • {selected.createdAt ? new Date(selected.createdAt).toLocaleString() : ''}</div>
                </div>
                <div className={styles.detailActions}>
                  <button className="btn">Simulate</button>
                  <button className="btn">Export</button>
                </div>
              </div>

              <div className={styles.detailBody}>
                <div className={styles.summaryArea}>
                  <h3>Summary</h3>
                  <p>{selected.summary || 'No summary yet.'}</p>
                  <h4>Action items</h4>
                  <ul>{(selected.actionItems||[]).map((a,i)=>(<li key={i}><input type="checkbox"/> {a}</li>))}</ul>
                </div>

                <aside className={styles.aiPanel}>
                  {aiLoading ? <div>Analyzing…</div> : aiInsights ? (
                    <>
                      <div className={styles.insight}><strong>Tone:</strong> {aiInsights.tone || 'Neutral'} <small>({aiInsights.confidence||0}%)</small></div>
                      <div className={styles.insight}><strong>Confidence:</strong> {aiInsights.confidence || 0}/100</div>
                      <div className={styles.insight}><strong>Key points:</strong>
                        <ul>{(aiInsights.keyPoints||[]).slice(0,5).map((k,i)=>(<li key={i}>{k}</li>))}</ul>
                      </div>
                      <div className={styles.suggestedReplies}>
                        <h4>Suggested replies</h4>
                        {(aiInsights.suggestedReplies||aiInsights.suggestions||[]).slice(0,3).map((s,i)=>(
                          <div key={i} style={{marginBottom:8}}>
                            <button className="btn" onClick={()=>navigator.clipboard && navigator.clipboard.writeText(s)}>{s.length>30 ? s.slice(0,30)+'…' : s}</button>
                          </div>
                        ))}
                        {(!(aiInsights.suggestedReplies||aiInsights.suggestions||[]).length) && <div className={styles.muted}>No suggestions</div>}
                      </div>
                      <div className={styles.insight}><strong>Reassurance:</strong><div style={{marginTop:6}}>{aiInsights.reassurance}</div></div>
                    </>
                  ) : (
                    <div className={styles.muted}>No AI insights yet. Select a conversation or click "Analyze".</div>
                  )}
                </aside>
              </div>
            </div>
          ) : (
            <div className={styles.emptyDetail}>Select a conversation to see details</div>
          )}
        </section>
      </main>

      <QuickAddModal open={quickOpen} onClose={()=>setQuickOpen(false)} onAdd={handleAdd} />
    </div>
  )
}
