## API

Base: `http://localhost:8080`

Auth
- Route: POST `/api/v1/auth/signup`
- Payload: `{ "email", "password" }`
- Response: `{ "token", "user" }`

- Route: POST `/api/v1/auth/signin`
- Payload: `{ "email", "password", "role" }`
- Response: `{ "token", "user" }`

Reports
- Route: POST `/api/v1/reports`
- Payload: `{ "name", "location" | ("latitude","longitude"), "date", "mapArea", "leaderId", "photoUrl", "comment?" }`
- Response: `{ "report": { "id" } }`

- Route: GET `/api/v1/reports` (leader, Bearer token)
- Payload: none
- Response: `{ "reports": [...] }`

- Route: PATCH `/api/v1/reports/:id` (leader, Bearer token)
- Payload: `{ "status?": "awaiting|in_progress|resolved", "progress?": 0-100 }`
- Response: `{ "report": { "id", "status", "progress" } }`

Water Tests
- Route: POST `/api/v1/water-tests` (asha, Bearer token)
- Payload: `{ "waterbodyName", "waterbodyId?", "dateTime", "location" | ("latitude","longitude"), "photoUrl", "notes", "quality" }`
- Response: `{ "waterTest": { "id" } }`

Hotspots
- Route: GET `/api/v1/hotspots`
- Payload: none
- Response: `{ "hotspots": [...] }`

- Route: POST `/api/v1/hotspots` (admin/leader, Bearer token)
- Payload: `{ "name", "description?", "location" | ("latitude","longitude") }`
- Response: `{ "hotspot": { "id" } }`

Chat
- Route: POST `/api/v1/chat` (Bearer token)
- Payload: `{ "message", "context?" }`
- Response: `{ "reply", "echo" }`

Gamified
- Route: GET `/api/v1/gamified/playbooks`
- Payload: none
- Response: `{ "playbooks": [...] }`

- Route: POST `/api/v1/gamified/playbooks` (Bearer token)
- Payload: `{ "title", "content", "source?": "local|llm" }`
- Response: `{ "playbook": { "id" } }`

- Route: GET `/api/v1/gamified/stories`
- Payload: none
- Response: `{ "stories": [...] }`

- Route: POST `/api/v1/gamified/stories` (Bearer token)
- Payload: `{ "title", "content", "source?": "local|llm" }`
- Response: `{ "story": { "id" } }`

- Route: GET `/api/v1/gamified/testimonials`
- Payload: none
- Response: `{ "testimonials": [...] }`

- Route: POST `/api/v1/gamified/testimonials` (Bearer token)
- Payload: `{ "content", "authorName?" }`
- Response: `{ "testimonial": { "id" } }`

Admin
- Route: POST `/api/v1/admin/users` (admin)
- Payload: `{ "email", "password", "role", "name?" }`
- Response: `{ "user": { "id", "email", "role" } }`

- Route: GET `/api/v1/admin/reports` (admin)
- Payload: none
- Response: `{ "reports": [...] }`

- Route: GET `/api/v1/admin/water-tests` (admin)
- Payload: none
- Response: `{ "waterTests": [...] }`


