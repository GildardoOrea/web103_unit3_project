import 'dotenv/config'
import { pool } from './database.js'

// ─────────────────────────────────────────────────────────────────────────
// Seed data — 4 venues (must stay in this order so id 1..4 matches the
// routes in App.jsx: echolounge=1, houseofblues=2, pavilion=3, aac=4)
// ─────────────────────────────────────────────────────────────────────────
const locations = [
  {
    name: 'Echo Lounge & Music Hall',
    image: 'https://picsum.photos/seed/echolounge/800/500',
    address: '2000 S Lamar St',
    city: 'Dallas',
    state: 'TX',
    zip: '75215',
  },
  {
    name: 'House of Blues',
    image: 'https://picsum.photos/seed/houseofblues/800/500',
    address: '2200 N Lamar St',
    city: 'Dallas',
    state: 'TX',
    zip: '75202',
  },
  {
    name: 'The Pavilion at Toyota Music Factory',
    image: 'https://picsum.photos/seed/pavilion/800/500',
    address: '300 W Las Colinas Blvd',
    city: 'Irving',
    state: 'TX',
    zip: '75039',
  },
  {
    name: 'American Airlines Center',
    image: 'https://picsum.photos/seed/americanairlines/800/500',
    address: '2500 Victory Ave',
    city: 'Dallas',
    state: 'TX',
    zip: '75219',
  },
]

// location_id maps to the venue order above (1-indexed)
const events = [
  // Echo Lounge (1)
  { location_id: 1, title: 'Indie Night: The Wandering Lights', description: 'A night of dreamy indie rock from local favorites.', date: '2026-07-12', time: '20:00:00', image: 'https://picsum.photos/seed/event-indienight/600/400' },
  { location_id: 1, title: 'Vinyl Sundays: Soul & Funk', description: 'Spinning classic soul and funk on vinyl all evening.', date: '2026-06-28', time: '18:00:00', image: 'https://picsum.photos/seed/event-vinyl/600/400' },
  { location_id: 1, title: 'Open Mic Showcase', description: 'Up-and-coming songwriters take the stage.', date: '2026-06-10', time: '19:30:00', image: 'https://picsum.photos/seed/event-openmic/600/400' },

  // House of Blues (2)
  { location_id: 2, title: 'Gospel Brunch', description: 'Soul food and live gospel every Sunday morning.', date: '2026-07-05', time: '11:00:00', image: 'https://picsum.photos/seed/event-gospel/600/400' },
  { location_id: 2, title: 'Blues Legends Tribute', description: 'A celebration of the greats who built the blues.', date: '2026-08-15', time: '21:00:00', image: 'https://picsum.photos/seed/event-blues/600/400' },
  { location_id: 2, title: 'Acoustic Evenings', description: 'Stripped-down sets in an intimate setting.', date: '2026-06-15', time: '20:00:00', image: 'https://picsum.photos/seed/event-acoustic/600/400' },

  // The Pavilion (3)
  { location_id: 3, title: 'Summer Amphitheater Fest', description: 'An all-day outdoor festival under the Texas sun.', date: '2026-08-02', time: '17:00:00', image: 'https://picsum.photos/seed/event-summerfest/600/400' },
  { location_id: 3, title: 'Country Under the Stars', description: 'Headline country acts on the open-air stage.', date: '2026-09-20', time: '19:00:00', image: 'https://picsum.photos/seed/event-country/600/400' },
  { location_id: 3, title: 'EDM Sunset Sessions', description: 'Electronic beats as the sun goes down.', date: '2026-06-21', time: '16:00:00', image: 'https://picsum.photos/seed/event-edm/600/400' },

  // American Airlines Center (4)
  { location_id: 4, title: 'Arena Rock Spectacular', description: 'Stadium-sized rock with full production.', date: '2026-10-10', time: '20:00:00', image: 'https://picsum.photos/seed/event-arenarock/600/400' },
  { location_id: 4, title: 'Pop Superstar World Tour', description: 'The biggest pop tour of the year stops in Dallas.', date: '2026-11-22', time: '19:30:00', image: 'https://picsum.photos/seed/event-popstar/600/400' },
  { location_id: 4, title: 'Hometown Hip-Hop Festival', description: 'Celebrating the city\'s hip-hop scene.', date: '2026-06-05', time: '18:00:00', image: 'https://picsum.photos/seed/event-hiphop/600/400' },
]

const createTables = async () => {
  await pool.query(`
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE locations (
      id      SERIAL PRIMARY KEY,
      name    VARCHAR(255) NOT NULL,
      image   TEXT,
      address VARCHAR(255),
      city    VARCHAR(100),
      state   VARCHAR(50),
      zip     VARCHAR(20)
    );

    CREATE TABLE events (
      id          SERIAL PRIMARY KEY,
      location_id INTEGER REFERENCES locations(id),
      title       VARCHAR(255) NOT NULL,
      description TEXT,
      date        DATE,
      time        TIME,
      image       TEXT
    );
  `)
  console.log('🆗 Tables created')
}

const seedLocations = async () => {
  for (const loc of locations) {
    await pool.query(
      `INSERT INTO locations (name, image, address, city, state, zip)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [loc.name, loc.image, loc.address, loc.city, loc.state, loc.zip]
    )
    console.log(`   📍 Inserted location: ${loc.name}`)
  }
}

const seedEvents = async () => {
  for (const ev of events) {
    await pool.query(
      `INSERT INTO events (location_id, title, description, date, time, image)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [ev.location_id, ev.title, ev.description, ev.date, ev.time, ev.image]
    )
    console.log(`   🎵 Inserted event: ${ev.title}`)
  }
}

const reset = async () => {
  try {
    console.log('⏳ Resetting database...')
    await createTables()
    await seedLocations()
    await seedEvents()
    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Reset failed:', error.message)
  } finally {
    await pool.end()
  }
}

reset()
