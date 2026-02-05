import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

/* ========================
   Types
   ======================== */

type JoinRoomPayload = {
  username: string;
  roomId: string;
};

type CursorPosition = {
  tabPath: string;
  line: number;
  column: number;
};

type FileChangePayload = {
  tabPath: string;
  content: string;
};

interface CollabSocket extends Socket {
  username?: string;
  roomId?: string;
}

/* ========================
   Setup
   ======================== */

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

/* ========================
   In-memory state
   ======================== */

const rooms = new Map<string, Set<string>>();

/* ========================
   Socket logic
   ======================== */

io.on("connection", (socket: CollabSocket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("joinRoom", ({ username, roomId }: JoinRoomPayload) => {
    console.log(`👤 ${username} joined room ${roomId}`);

    socket.username = username;
    socket.roomId = roomId;

    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }

    rooms.get(roomId)!.add(username);

    io.to(roomId).emit(
      "presenceUpdate",
      Array.from(rooms.get(roomId)!)
    );
  });

  socket.on("cursorMove", (position: CursorPosition) => {
    if (!socket.roomId || !socket.username) return;

    socket.to(socket.roomId).emit("cursorUpdate", {
      user: socket.username,
      position,
    });
  });

  socket.on("fileChange", (data: FileChangePayload) => {
    if (!socket.roomId || !socket.username) return;

    socket.to(socket.roomId).emit("fileUpdate", {
      user: socket.username,
      ...data,
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);

    const { roomId, username } = socket;
    if (!roomId || !username) return;

    const room = rooms.get(roomId);
    if (!room) return;

    room.delete(username);

    if (room.size === 0) {
      rooms.delete(roomId);
    } else {
      io.to(roomId).emit(
        "presenceUpdate",
        Array.from(room)
      );
    }
  });
});

/* ========================
   Start server
   ======================== */

const PORT = Number(process.env.PORT ?? 3001);
const HOST = "localhost";

httpServer.listen(PORT, () => {
  console.log(`✅ Collab server running at http://${HOST}:${PORT}`);
});
