import React, { useState, useEffect } from 'react'
import '../css/Event.css'

// Build a local Date from the 'YYYY-MM-DD' date string and 'HH:MM' time string.
const toLocalDate = (dateStr, timeStr) => {
  if (!dateStr) return null
  const [y, m, d] = dateStr.split('-').map(Number)
  let hh = 0, mi = 0
  if (timeStr) {
    const [h, mn] = timeStr.split(':').map(Number)
    hh = h || 0
    mi = mn || 0
  }
  return new Date(y, m - 1, d, hh, mi)
}

const Event = ({ event }) => {
  const [remaining, setRemaining] = useState('')
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const target = toLocalDate(event.date, event.time)
    if (!target) return

    const tick = () => {
      const diff = target - new Date()
      if (diff <= 0) {
        setPassed(true)
        setRemaining('This event has already happened')
        return
      }
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      setRemaining(`${days}d ${hours}h ${minutes}m until showtime`)
    }

    tick()
    const interval = setInterval(tick, 60000) // update every minute
    return () => clearInterval(interval)
  }, [event.date, event.time])

  const prettyDate = event.date
    ? toLocalDate(event.date).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      })
    : ''

  const prettyTime = event.time
    ? toLocalDate('1970-01-01', event.time).toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit',
      })
    : ''

  return (
    <article className={`event-information ${passed ? 'event-passed' : ''}`}>
      <img src={event.image} alt={event.title} />

      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{event.title}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i> {prettyDate}
            <br /> {prettyTime}
          </p>
          <p id={`remaining-${event.id}`} className='remaining'>{remaining}</p>
        </div>
      </div>
    </article>
  )
}

export default Event
