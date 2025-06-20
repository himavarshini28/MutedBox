# MutedBox Server

Anonymous feedback collection server built with Express, MongoDB, and TypeScript.

## Features

- Create anonymous feedback links with unique IDs
- Accept anonymous responses from users
- View all responses for a specific feedback link
- Activate/deactivate feedback links
- Admin dashboard to manage all feedback links

## Tech Stack

- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose
- JWT for authentication (future)
- CORS for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

### Environment Variables



### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Run the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

## API Endpoints

### Feedback

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/feedback/create` | Create a new feedback link |
| GET | `/api/feedback/:uniqueId` | Get a specific feedback by ID |
| POST | `/api/feedback/:uniqueId/respond` | Submit a response to a feedback |
| GET | `/api/feedback/:uniqueId/responses` | Get all responses for a feedback |
| PUT | `/api/feedback/:uniqueId/deactivate` | Deactivate a feedback link |
| GET | `/api/feedback` | Get all feedback links (admin) |

## Project Structure

```
server/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helper functions
│   └── index.ts         # Entry point
├── .env                 # Environment variables
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## License

MIT
