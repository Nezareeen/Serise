import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { apiFetch } from '../../utils/api'

export default function Profile(){
  const [profile, setProfile] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem('serise_token')
    apiFetch('/api/profile', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r=>r.json()).then(d=>setProfile(d)).catch(()=>{})
  }, [])

  if(!profile) return <div className={styles.page}><p>Loading profile…</p></div>

  return (
    <div className={styles.page}>
      <h2>{profile.name || 'Your Profile'}</h2>
      <p><strong>Email:</strong> {profile.email || '—'}</p>
      <p><strong>Bio:</strong> {profile.bio || 'No bio yet.'}</p>
      <div className={styles.meta}>
        <div><strong>Goals:</strong> {profile.goals?.length || 0}</div>
        <div><strong>Conversations:</strong> {profile.conversations?.length || 0}</div>
      </div>
    </div>
  )
}
