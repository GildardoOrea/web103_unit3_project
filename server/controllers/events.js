import { pool } from '../config/database.js'

// Return date/time as plain strings so the frontend never hits timezone bugs.
const EVENT_COLUMNS = `
  id,
  location_id,
  title,
  description,
  TO_CHAR(date, 'YYYY-MM-DD') AS date,
  TO_CHAR(time, 'HH24:MI')    AS time,
  image
`

// GET /api/events  →  all events (used by the Events page)
export const getEvents = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT ${EVENT_COLUMNS} FROM events ORDER BY date ASC, time ASC`
    )
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/events/location/:locationId  →  all events at one location
export const getEventsByLocationId = async (req, res) => {
  try {
    const { locationId } = req.params
    const results = await pool.query(
      `SELECT ${EVENT_COLUMNS} FROM events WHERE location_id = $1 ORDER BY date ASC, time ASC`,
      [locationId]
    )
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/events/:id  →  one event
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params
    const results = await pool.query(
      `SELECT ${EVENT_COLUMNS} FROM events WHERE id = $1`,
      [id]
    )
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
