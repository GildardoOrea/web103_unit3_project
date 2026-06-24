# Unit 3 Project - *UnityGrid Plaza*

Submitted by: **Gildardo Orea Amador**

This web app: **is a virtual community space for live music in Dallas. Users land on an interactive map of UnityGrid Plaza, click one of four venues (Echo Lounge, House of Blues, The Pavilion, or American Airlines Center), and see the events happening at that venue. Every event shows a live countdown to showtime, and past events are styled differently. There's also an Events page that lists everything with a filter by location. All of the data is served from an Express API backed by a Render PostgreSQL database.**

Time spent: **X** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `events` table**
  - [x] **The web app is connected to a Render PostgreSQL database**
  - [x] **The database contains an appropriately structured `events` table**
- [x] **Front page of the web app is functional and appropriately styled**
  - [x] **The web app displays a title**
  - [x] **The website includes a visual interface that allows users to select a location they would like to view** (a clickable SVG map of the four venues, not a list of links)
- [x] **Each location has a corresponding page**
  - [x] **Each location has a detail page with its own unique URL**
  - [x] **Clicking on a location navigates to its corresponding detail page and displays a list of all events from the `events` table associated with that location**

The following **optional** features are implemented:

- [x] The app includes an additional Events page
  - [x] An additional page shows all possible events
  - [x] Users can sort or filter events by location
- [x] Each `Event` includes a countdown to when the `Event` will occur
  - [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (label changes to "This event has already happened" and the card is visually dimmed)

The following **additional** features are implemented:

* Events data is normalized with a `location_id` foreign key into the `locations` table, and date/time are returned as clean strings from the API to avoid timezone bugs in the countdown.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ScreenToGif

## Notes

The biggest challenge was wiring the full stack together: building the database layer (schema + seed), the Express controllers and routes, and the React service layer so the frontend could actually pull events for each venue. The countdown also took some care — PostgreSQL was returning dates in a way that shifted them by a day in my timezone, so I had the API return the date and time as plain strings and rebuilt the date on the frontend, which fixed it.

## License

    Copyright 2026 Gildardo Orea Amador

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
