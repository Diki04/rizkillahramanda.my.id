# API Reference

## Public Endpoints

### 1. `GET /api/github`
Returns public GitHub profile information and repositories for `@Diki04`.
- **Response**:
```json
{
  "user": { "login": "Diki04", "public_repos": 17, ... },
  "repos": [ ... ]
}
```

### 2. `GET /api/wakatime`
Returns coding activity and language breakdown.

### 3. `GET /api/chat`
Returns approved guestbook messages.

### 4. `POST /api/chat`
Submits a new guestbook message.
- **Body**: `{ "sender_name": "string", "content": "string" }`

### 5. `GET /api/rss`
Returns XML RSS feed of showcase projects.

## Protected Endpoints

### 1. `POST /api/admin/projects`
Headers: `x-admin-key: <ADMIN_SECRET_KEY>`
Creates a new project.

### 2. `POST /api/admin/achievements`
Headers: `x-admin-key: <ADMIN_SECRET_KEY>`
Creates a new certificate record.
