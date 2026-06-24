const BASE_URL = '/api/events'

const getAllEvents = async () => {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error('Failed to fetch events')
  return response.json()
}

const getEventsByLocationId = async (locationId) => {
  const response = await fetch(`${BASE_URL}/location/${locationId}`)
  if (!response.ok) throw new Error('Failed to fetch events for location')
  return response.json()
}

const getEventById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to fetch event')
  return response.json()
}

export default { getAllEvents, getEventsByLocationId, getEventById }
