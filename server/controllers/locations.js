import { pool } from '../config/database.js'

// GET /api/locations  →  all locations (used to label the map buttons)
export const getLocations = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/locations/:id  →  one location (used on the detail page header)
export const getLocationById = async (req, res) => {
  try {
    const { id } = req.params
    const results = await pool.query('SELECT * FROM locations WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
