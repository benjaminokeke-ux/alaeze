// Socket.IO handlers for Party Watch and Live Streams

const partyRooms = new Map();

export function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Party Watch - Join
    socket.on('party:join', ({ partyId, userId, userName }) => {
      socket.join(partyId);

      if (!partyRooms.has(partyId)) {
        partyRooms.set(partyId, {
          participants: [],
          playbackState: { playing: false, currentTime: 0 },
        });
      }

      const room = partyRooms.get(partyId);
      room.participants.push({ socketId: socket.id, userId, userName });

      io.to(partyId).emit('party:user-joined', { userId, userName, participants: room.participants });
      socket.emit('party:state', room.playbackState);
    });

    // Party Watch - Sync playback
    socket.on('party:play', ({ partyId, currentTime }) => {
      const room = partyRooms.get(partyId);
      if (room) {
        room.playbackState = { playing: true, currentTime };
        socket.to(partyId).emit('party:sync', room.playbackState);
      }
    });

    socket.on('party:pause', ({ partyId, currentTime }) => {
      const room = partyRooms.get(partyId);
      if (room) {
        room.playbackState = { playing: false, currentTime };
        socket.to(partyId).emit('party:sync', room.playbackState);
      }
    });

    // Party Watch - Chat
    socket.on('party:message', ({ partyId, message, userName }) => {
      io.to(partyId).emit('party:new-message', {
        id: Date.now().toString(),
        user: userName,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    });

    // Live Stream
    socket.on('live:start', ({ streamId, creatorId }) => {
      socket.join(`live-${streamId}`);
      io.emit('live:new-stream', { streamId, creatorId });
    });

    socket.on('live:join', ({ streamId }) => {
      socket.join(`live-${streamId}`);
      const room = io.sockets.adapter.rooms.get(`live-${streamId}`);
      io.to(`live-${streamId}`).emit('live:viewer-count', { count: room?.size || 0 });
    });

    socket.on('live:chat', ({ streamId, message, userName }) => {
      io.to(`live-${streamId}`).emit('live:new-chat', {
        id: Date.now().toString(),
        user: userName,
        text: message,
      });
    });

    // Disconnect
    socket.on('disconnect', () => {
      // Clean up party rooms
      for (const [partyId, room] of partyRooms.entries()) {
        const idx = room.participants.findIndex((p) => p.socketId === socket.id);
        if (idx !== -1) {
          const user = room.participants[idx];
          room.participants.splice(idx, 1);
          io.to(partyId).emit('party:user-left', { userId: user.userId, userName: user.userName });

          if (room.participants.length === 0) {
            partyRooms.delete(partyId);
          }
        }
      }
    });
  });
}
