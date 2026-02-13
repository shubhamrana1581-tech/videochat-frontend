import { io, Socket } from 'socket.io-client';

// Ensure this matches your backend URL
const SERVER_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const socket: Socket = io(SERVER_URL, {
  autoConnect: false, // We will connect manually when the user clicks "Start"
});