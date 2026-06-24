import express from 'express'
import { getEvents, getEventsByLocationId, getEventById } from '../controllers/events.js'

const router = express.Router()

router.get('/', getEvents)
// keep the /location route before /:id so it isn't shadowed
router.get('/location/:locationId', getEventsByLocationId)
router.get('/:id', getEventById)

export default router
