# Rogue Renegade Collaboration Server

The collaboration server is the real-time communication backend for [Rogue Renegade IDE](https://github.com/avantenaidoo/RogueRenegade).

It provides the server-side infrastructure that allows connected IDE clients to communicate and share collaboration-related updates. Built with Node.js, TypeScript, Express and Socket.IO, it manages client connections, collaboration rooms and real-time events.

## Overview

Rogue Renegade IDE integrates development tools and collaboration capabilities into a single desktop development environment.

The collaboration server supports the IDE's collaborative functionality by handling communication between connected clients. It operates as a separate backend service, allowing the desktop application to communicate with other connected users through Socket.IO.

## Features

The current implementation includes:

- **Real-time communication:** Socket.IO manages connections and communication between IDE clients.
- **Collaboration rooms:** Connected clients can join rooms to participate in shared collaboration sessions.
- **User presence:** Handles presence updates for connected users.
- **Cursor updates:** Supports sharing cursor movement and updates between clients.
- **File-change events:** Handles file-change communication between connected clients.
- **Connection management:** Handles client disconnections and room membership cleanup.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Server runtime |
| TypeScript | Server-side development |
| Express 5 | HTTP server framework |
| Socket.IO 4 | Real-time, bidirectional communication |

## Architecture

The collaboration server runs independently of the Rogue Renegade desktop application.

The IDE connects to the server using Socket.IO. The server manages client connections and collaboration rooms, facilitating real-time communication between users participating in the same room.

This separation keeps collaboration-related communication in a dedicated backend service while the IDE handles the desktop interface and development environment.

## Configuration

The server uses port `3001` by default.

Collaboration room membership is currently maintained in memory.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Clone the repository

```bash
git clone https://github.com/avantenaidoo/collab-server.git
```

### Navigate to the project

```bash
cd collab-server
```

### Install dependencies

```bash
npm install
```

Refer to the project's `package.json` for the available development and build scripts.

## Project Structure

The server is maintained separately from the Rogue Renegade IDE repository, with its own dependencies, TypeScript configuration and server implementation.

## Related Project

**Rogue Renegade IDE:**  
https://github.com/avantenaidoo/RogueRenegade

The collaboration server forms part of the backend infrastructure supporting Rogue Renegade's integrated development and collaboration environment.