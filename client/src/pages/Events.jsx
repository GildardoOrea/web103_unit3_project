import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)

                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
            }
            catch (error) {
                console.error(error)
            }
        })()
    }, [])

    const visibleEvents = filter === 'all'
        ? events
        : events.filter((event) => event.location_id === Number(filter))

    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>All Events</h2>
                    <p>
                        Filter by location:{' '}
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value='all'>All locations</option>
                            {locations.map((location) =>
                                <option key={location.id} value={location.id}>{location.name}</option>
                            )}
                        </select>
                    </p>
                </div>
            </header>

            <main>
                {
                    visibleEvents && visibleEvents.length > 0 ? visibleEvents.map((event) =>
                        <Event key={event.id} event={event} />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events to show.'}</h2>
                }
            </main>
        </div>
    )
}

export default Events
