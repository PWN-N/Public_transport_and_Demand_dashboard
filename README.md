# Public Transport and Demand Dashboard API

A Node.js and Express backend for storing and retrieving public transport routes and stops. It uses MongoDB through Mongoose and exposes JSON endpoints for route and stop records.

> This repository currently contains the API backend; it does not include a dashboard frontend.

## Features

- Health/status response at `GET /`
- Create and list transport routes
- Create and list transport stops
- Mongoose schemas with required fields, defaults, and validation
- CORS enabled and JSON request-body parsing

## Technology

- Node.js (CommonJS)
- Express 5
- MongoDB and Mongoose
- `dotenv` for environment configuration

## Requirements

- Node.js and npm
- A MongoDB instance, local or hosted

## Setup and start

From the repository root, install the dependencies:

```bash
npm install
```

Configure the environment before starting the API:

```text
MONGO_URI=<your MongoDB connection string>
PORT=5000
```

Set these variables in your shell or in a local `.env` file in the repository root. Do not commit credentials or other secrets. `PORT` is optional and defaults to `5000`.

Start the server:

```bash
node src/server.js
```

The server logs its port and MongoDB connection status. Once running, `GET http://localhost:5000/` returns a JSON status response.

## API

All request and response bodies use JSON. Successful list responses include `success`, `count`, and `data`; creation responses include `success`, `message`, and `data`.

### Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/routes` | List all routes |
| `POST` | `/api/routes` | Create a route |

Example route request:

```json
{
  "routeNumber": "42",
  "routeName": "Central Line",
  "source": "Central Station",
  "destination": "North Terminal",
  "transportMode": "bus",
  "capacity": 50,
  "active": true
}
```

`routeNumber`, `routeName`, `source`, `destination`, and `capacity` are required. Route numbers must be unique; `capacity` must be zero or greater. `transportMode` accepts `bus` or `metro` and defaults to `bus`; `active` defaults to `true`. Route records also receive Mongoose `createdAt` and `updatedAt` timestamps.

### Stops

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/stops` | List all stops |
| `POST` | `/api/stops` | Create a stop |

Example stop request:

```json
{
  "stopName": "Central Station",
  "latitude": 40.7128,
  "longitude": -74.006,
  "routeNumber": "42",
  "demandLevel": "medium"
}
```

`stopName`, `latitude`, `longitude`, and `routeNumber` are required. `demandLevel` accepts `low`, `medium`, or `high` and defaults to `low`. Stop records also receive `createdAt` and `updatedAt` timestamps.

## Project structure

```text
src/
  config/db.js          MongoDB connection
  models/Route.js       Route schema and model
  models/stops.js       Stop schema and model
  routes/routeRoutes.js Route list/create endpoints
  routes/stopRoutes.js  Stop list/create endpoints
  server.js             Express app and server startup
```

## Development notes

The API connects to MongoDB at startup using `MONGO_URI`. Database connection failure exits the process. The package manifest does not currently define a test script; the endpoints can be exercised with an HTTP client such as `curl` or Postman.
